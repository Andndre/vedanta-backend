import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const { id_quiz, id_siswa } = evt.params;
	const quiz = await prismaClient.userQuizResult.findUnique({
		where: {
			userId_quizId: {
				quizId: +id_quiz,
				userId: id_siswa
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
									userId: id_siswa
								}
							}
						}
					}
				}
			}
		}
	});

	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	// simplified response
	const correctCount = quiz.correctCount;
	const entries = quiz.entries.map((q) => ({
		model: q.quizEntry.questionModel as any,
		answer: q.quizEntry.usersAnsweredQuiz[0].answer
	}));

	const quizz = {
		correctCount,
		entries
	};

	return { quizz };
};
