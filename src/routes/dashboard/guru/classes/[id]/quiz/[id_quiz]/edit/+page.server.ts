import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { securePath } from '$lib/utils';

export const load: PageServerLoad = async (evt) => {
	const id = evt.params.id;

	const findQuiz = await prismaClient.quiz.findUnique({
		where: {
			id: +id,
			userId: evt.locals.webUser!.id
		}
	});

	if (!findQuiz) {
		throw error(404, 'Quiz not found');
	}

	return {
		quiz: findQuiz
	};
};

export const actions: Actions = {
	async update(evt) {
		const idQuiz = evt.params.id_quiz;
		const idKelas = evt.params.id;

		const body = Object.fromEntries(await evt.request.formData()) as {
			title: string;
			isDraft: string;
		};

		const draft = !!body.isDraft;

		await prismaClient.quiz.update({
			where: {
				id: +idQuiz
			},
			data: {
				title: body.title,
				isDraft: draft
			}
		});

		throw redirect(302, securePath(`/dashboard/guru/classes/${idKelas}`));
	}
};
