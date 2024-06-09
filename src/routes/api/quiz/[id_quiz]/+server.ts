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

		const updated = await prismaClient.userQuizResult.update({
			where: {
				id: d.id
			},
			data: {
				completed: true
			}
		});

		const claim = await prismaClient.userClaimsHadiahQuiz.findUnique({
			where: {
				userId_quizId: {
					userId: evt.locals.apiUser.id,
					quizId: +evt.params.id_quiz
				}
			},
			select: {
				claimedPoints: true
			}
		});

		let reward = 0;
		let stars = 0;

		const quizCount = withFirstQuizThatUserDidNotAnswer.entries.length;
		const correct = updated.correctCount;
		const rate = correct / quizCount;
		const previousStars = claim?.claimedPoints || 0;

		if (rate == 0) {
			stars = 0;
		} else if (rate < 0.5) {
			stars = 1;
		} else if (rate < 0.7) {
			stars = 2;
		} else {
			stars = 3;
		}

		if (!claim) {
			await prismaClient.userClaimsHadiahQuiz.create({
				data: {
					userId: evt.locals.apiUser.id,
					quizId: +evt.params.id_quiz
				}
			});
			reward = stars;
		} else {
			if (previousStars < stars) {
				reward = Math.max(0, stars - previousStars);
				await prismaClient.userClaimsHadiahQuiz.update({
					where: {
						userId_quizId: {
							userId: evt.locals.apiUser.id,
							quizId: +evt.params.id_quiz
						}
					},
					data: {
						claimedPoints: stars
					}
				});
			}
		}

		await prismaClient.user.update({
			where: {
				id: evt.locals.apiUser.id
			},
			data: {
				quizCompleted: {
					increment: 1
				},
				points: {
					increment: reward
				}
			}
		});

		const result = {
			id: +evt.params.id_quiz,
			type: 'COMPLETING',
			reward,
			correctCount: updated.correctCount,
			countQuiz: withFirstQuizThatUserDidNotAnswer.entries.length,
			previousStars,
			stars
		};

		console.log(result);

		return json(result);
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
