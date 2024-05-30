import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz,
			stageId: +evt.params.id
		},
		select: {
			entries: {
				select: {
					id: true,
					scoreIncorrect: true,
					questionModel: true,
					scoreCorrect: true
				}
			},
			title: true,
			createdAt: true,
			id: true
		}
	});

	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	return {
		quiz,
		idStage: evt.params.id
	};
};
