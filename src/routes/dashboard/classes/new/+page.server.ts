import { securePath } from '$lib/utils.js';
import { prismaClient } from '@/db.js';
import { redirect } from '@sveltejs/kit';

function createRandomString(length: number) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

export const actions = {
	create: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const newQuiz = await prismaClient.kelas.create({
			data: {
				name: data.name as string,
				classCode: createRandomString(6),
				pengajarId: locals.webUser!.id
			}
		});

		throw redirect(302, securePath(`/dashboard/classes/${newQuiz.id}`));
	}
};
