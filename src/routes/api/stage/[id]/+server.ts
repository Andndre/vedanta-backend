import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const stage = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			title: true,
			materi: {
				select: {
					id: true
				}
			},
			Quiz: {
				select: {
					id: true,
					userQuizResult: {
						where: {
							userId: evt.locals.apiUser!.id
						}
					}
				}
			},
			points_reward_finished: true
		}
	});

	if (!stage) {
		return json({
			error: true
		});
	}

	const withQuizCount = {
		...stage,
		quizCount: stage.Quiz.length,
		finished: stage.Quiz.reduce((curr, q) => curr + q.userQuizResult.length, 0)
	};

	return json(withQuizCount);
};
