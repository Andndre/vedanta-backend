import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	if (!evt.locals.apiUser) {
		return error(401, 'Unauthorized');
	}

	const stage = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			id: true,
			title: true,
			materi: {
				select: {
					id: true,
					videoLink: true
				}
			},
			Quiz: {
				select: {
					id: true,
					userQuizResult: {
						where: {
							userId: evt.locals.apiUser.id,
							completed: true
						}
					}
				}
			},
			points_reward_finished: true
		}
	});

	if (!stage) {
		return error(404, 'Stage not found');
	}

	const quiz = stage.Quiz.map((q) => {
		return {
			id: q.id,
			completed: q.userQuizResult.length > 0
		};
	});

	const firstNotCompletedIndex = quiz.findIndex((q) => !q.completed);

	const withQuizCount = {
		...stage,
		Quiz: quiz,
		quizCount: stage.Quiz.length,
		finished: stage.Quiz.reduce((curr, q) => curr + q.userQuizResult.length, 0),
		firstNotCompletedIndex
	};

	const claimed = await prismaClient.userClaimsHadiahStage.findUnique({
		where: {
			userId_stageId: {
				userId: evt.locals.apiUser.id,
				stageId: +evt.params.id
			}
		}
	});

	const rewardClaimed = !!claimed;

	return json({ ...withQuizCount, rewardClaimed });
};
