import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/custom/auth-layout/registerSchema';
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
	register: async ({ request, cookies, locals, url }) => {
		const form = await superValidate(request, zod(formSchema));
		if (!form.valid) return { form };

		const { email, password } = form.data;
		const user = await findOne(email);

		if (user) {
			form.errors.email = ['Pengguna Sudah Ada'];
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			form.errors.passwordConfirm = ['Password tidak sama'];
			return fail(400, {
				form
			});
		}

		const newRefreshSession = v4();

		await prismaClient.user.create({
			data: {
				lastActiveAt: new Date(),
				refreshSession: newRefreshSession,
				email: form.data.email,
				name: form.data.name,
				password: await bcrypt.hash(form.data.password, 10)
			}
		});

		throw redirect(302, securePath(url.searchParams.get('redirect') || '/login'));
	}
};
