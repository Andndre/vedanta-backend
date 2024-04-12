import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/custom/auth-layout/loginSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { prismaClient } from '@/db.js';
import { securePath } from '$lib/utils';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.webUser) {
		console.log(locals.webUser);
		throw redirect(302, securePath('/dashboard'));
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
		const user = await prismaClient.user.findUnique({
			where: {
				email
			}
		});

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

		cookies.set('refresh_session', locals.webUser?.refreshSession, {
			path: '/',
			httpOnly: true,
			secure: import.meta.env.PROD,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
		});

		throw redirect(302, securePath(url.searchParams.get('redirect') || '/dashboard'));
	}
};
