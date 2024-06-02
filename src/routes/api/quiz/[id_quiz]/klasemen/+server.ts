import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz
		},
		select: {
			id: true,
			kelasId: true,
			stageId: true
		}
	});

	if (quiz?.kelasId) {
		const result = await prismaClient.kelas.findUnique({
			where: {
				id: quiz.kelasId
			},
			select: {
				id: true,
				quizzes: {
					select: {
						userQuizResult: {
							select: {
								correctCount: true
							}
						}
					}
				}
			}
		});
	} else if (quiz?.stageId) {
	}

	return json(quiz);
};
