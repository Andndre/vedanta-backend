import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/custom/auth-layout/loginSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { securePath } from '$lib/utils';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';
import { findOne } from '@/models/UserModel.js';
import { prismaClient } from '@/db.js';
import { v4 } from 'uuid';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.webUser) {
		if (locals.webUser.isAdmin) {
			throw redirect(302, securePath('/dashboard/admin'));
		}
		throw redirect(302, securePath('/dashboard/guru'));
	}
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions = {
	login: async ({ request, cookies, locals, url }) => {
		const form = await superValidate(request, zod(formSchema));
		if (!form.valid) return { form };

		const { email, password } = form.data;
		const user = await findOne(email);

		if (!user) {
			form.errors.email = ['User not found'];
			return fail(400, {
				form
			});
		}

		if (!(await bcrypt.compare(password, user.password))) {
			form.errors.password = ['Incorrect password'];
			return fail(400, {
				form
			});
		}

		locals.webUser = user;

		const newRefreshSession = v4();

		await prismaClient.user.update({
			where: {
				id: user.id
			},
			data: {
				lastActiveAt: new Date(),
				refreshSession: newRefreshSession
			}
		});

		cookies.set('refresh_session', newRefreshSession, {
			path: '/',
			httpOnly: true,
			secure: import.meta.env.PROD,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
		});

		console.log(url.searchParams.get('redirect'));

		if (locals.webUser.isAdmin) {
			throw redirect(302, securePath(url.searchParams.get('redirect') || '/dashboard/admin'));
		}

		throw redirect(302, securePath(url.searchParams.get('redirect') || '/dashboard/guru'));
	}
};
