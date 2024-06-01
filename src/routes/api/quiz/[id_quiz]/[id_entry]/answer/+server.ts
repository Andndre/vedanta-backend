import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}

	const body = (await evt.request.json()) as {
		answer: string;
	};

	const quizEntry = await prismaClient.quizEntry.findUnique({
		where: {
			id: +evt.params.id_entry
		},
		select: {
			questionModel: true,
			scoreCorrect: true
		}
	});

	if (!quizEntry) {
		return error(404, 'Quiz Entry not found');
	}

	const { answer } = body;
	const {
		questionModel: { correct },
		scoreCorrect
	} = quizEntry as { questionModel: { correct: string }; scoreCorrect: number };

	const result = await prismaClient.$transaction(async (prisma) => {
		let result = await prisma.userQuizResult.findUnique({
			where: {
				userId_quizId: {
					quizId: +evt.params.id_quiz,
					userId: user.id
				}
			}
		});

		if (!result) {
			result = await prisma.userQuizResult.create({
				data: {
					completed: false,
					userId: user.id,
					quizId: +evt.params.id_quiz
				}
			});
		}

		// const correctAnswer = await prisma.userAnswerQuizEntry.upsert({
		// 	create: {
		// 		answer,
		// 		quizId: +evt.params.id_quiz,
		// 		userId: user.id,
		// 		point: correct === answer ? scoreCorrect : 0,
		// 		quizResultId: result.id
		// 	},
		// 	update: {
		// 		answer,
		// 		point: correct === answer ? scoreCorrect : 0
		// 	},
		// 	where: {
		// 		userId_quizId: {
		// 			quizId: +evt.params.id_quiz,
		// 			userId: user.id
		// 		}
		// 	}
		// });

		let findAnswer = await prisma.userAnswerQuizEntry.findUnique({
			where: {
				userId_quizEntryId: {
					quizEntryId: +evt.params.id_entry,
					userId: user.id
				}
			},
			select: {
				id: true,
				answer: true,
				point: true
			}
		});
		if (findAnswer) {
			findAnswer = await prisma.userAnswerQuizEntry.update({
				where: {
					id: findAnswer.id
				},
				data: {
					answer,
					point: correct === answer ? scoreCorrect : 0
				}
			});
		} else {
			findAnswer = await prisma.userAnswerQuizEntry.create({
				data: {
					answer,
					point: correct === answer ? scoreCorrect : 0,
					quizEntryId: +evt.params.id_entry,
					userId: user.id,
					quizResultId: result.id
				}
			});
		}

		return {
			correct: correct === answer,
			answer: findAnswer.answer,
			point: findAnswer.point
		};
	});

	return json(result);
};
