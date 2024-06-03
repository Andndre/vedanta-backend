import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const { id, quiz_id } = evt.params;
	const quiz = await prismaClient.userQuizResult.findUnique({
		where: {
			userId_quizId: {
				quizId: +quiz_id,
				userId: evt.locals.apiUser!.id
			}
		},
		select: {
			correctCount: true,
			entries: {
				select: {
					quizEntry: {
						select: {
							questionModel: true,
							usersAnsweredQuiz: {
								select: {
									answer: true
								},
								where: {
									userId: evt.locals.apiUser!.id
								}
							}
						}
					}
				}
			}
		}
	});

	if (!quiz) {
		return error(404, 'Quiz not found');
	}

	// simplified response
	const correctCount = quiz.correctCount;
	const entries = quiz.entries.map((q) => ({
		model: q.quizEntry.questionModel,
		answer: q.quizEntry.usersAnsweredQuiz[0].answer
	}));

	const quizz = {
		correctCount,
		entries
	};

	return json({ ...quizz });
};
