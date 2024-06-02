import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	if (!evt.locals.apiUser) {
		return error(401, 'Unauthorized');
	}

	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz
		},
		select: {
			entries: {
				select: {
					id: true,
					usersAnsweredQuiz: {
						where: {
							userId: evt.locals.apiUser.id
						},
						select: {
							id: true
						}
					}
				}
			}
		}
	});

	console.log(quiz);

	if (!quiz) {
		return error(404, 'Quiz not found');
	}

	const firstQuizThatUserDidNotAnswer = quiz.entries.map((q) => {
		if (q.usersAnsweredQuiz.length === 0) {
			return q.id;
		}

		return null;
	});

	let index = 0;

	const withFirstQuizThatUserDidNotAnswer = {
		...quiz,
		nextId: firstQuizThatUserDidNotAnswer.find((q) => {
			index += 1;
			return q !== null;
		})
	};

	const { entries, ...rest } = withFirstQuizThatUserDidNotAnswer;

	if (!rest.nextId) {
		const d = await prismaClient.userQuizResult.findUnique({
			where: {
				userId_quizId: {
					quizId: +evt.params.id_quiz,
					userId: evt.locals.apiUser.id
				}
			}
		});

		if (!d) {
			return json({ type: 'NOOO WAYY' });
		}

		if (d.completed) {
			return json({ type: 'COMPLETED' });
		}

		const stage = await prismaClient.quiz.findUnique({
			where: {
				id: +evt.params.id_quiz
			},
			select: {
				stage: {
					select: {
						points_reward_per_quiz: true
					}
				}
			}
		});

		if (!stage?.stage) {
			const kelas = await prismaClient.quiz.findUnique({
				where: {
					id: +evt.params.id_quiz
				},
				select: {
					kelas: {
						select: {
							id: true
						}
					}
				}
			});

			// TODO: customize reward in class (by the teacher)

			if (!kelas?.kelas) {
				return json({ type: 'NOOO WAYY 2' });
			}

			const updated = await prismaClient.userQuizResult.update({
				where: {
					id: d.id
				},
				data: {
					completed: true
				}
			});

			return json({
				id: +evt.params.id_quiz,
				type: 'COMPLETING',
				reward: 50,
				correctCount: updated.correctCount,
				countQuiz: withFirstQuizThatUserDidNotAnswer.entries.length
			});
		}

		const updated = await prismaClient.userQuizResult.update({
			where: {
				id: d.id
			},
			data: {
				completed: true
			}
		});

		return json({
			id: +evt.params.id_quiz,
			type: 'COMPLETING',
			reward: stage.stage.points_reward_per_quiz,
			correctCount: updated.correctCount,
			countQuiz: withFirstQuizThatUserDidNotAnswer.entries.length
		});
	}

	const quizEntry = await prismaClient.quizEntry.findUnique({
		where: {
			id: rest.nextId
		}
	});

	return json({
		quizEntry: { ...quizEntry, number: index, entryCount: firstQuizThatUserDidNotAnswer.length },
		type: 'entry'
	});
};
