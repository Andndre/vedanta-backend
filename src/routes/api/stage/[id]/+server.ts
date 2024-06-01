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
							userId: evt.locals.apiUser.id
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
