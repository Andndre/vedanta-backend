import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz
		},
		select: {
			entries: {
				select: {
					id: true
				}
			}
		}
	});

	return json(quiz);
};
