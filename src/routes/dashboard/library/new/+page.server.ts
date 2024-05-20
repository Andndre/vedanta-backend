import { securePath } from '$lib/utils.js';
import { prismaClient } from '@/db.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
        const newQuiz = await prismaClient.quiz.create({
            data: {
                title: data.title as string,
                userId: locals.webUser!.id
            }
        })

        throw redirect(302, securePath(`/dashboard/library/${newQuiz.id}`))
	}
};
