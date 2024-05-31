import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const stage = await prismaClient.stage.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			image_path: true,
			Quiz: {
				select: {
					userQuizResult: {
						where: {
							userId: evt.locals.apiUser!.id
						}
					}
				}
			}
		}
	});

	if (!stage) {
		return error(404, 'Stage not found');
	}

	const withQuizCount = stage.map((s) => {
		return {
			...s,
			quizCount: s.Quiz.length,
			finished: s.Quiz.reduce((curr, q) => curr + q.userQuizResult.length, 0),
			image_path: s.image_path ? 'https://cdn.hmjtiundiksha.com/' + s.image_path : null,
			id: s.id
		};
	});

	const withOutQuiz = withQuizCount.map((s) => {
		const { Quiz, ...rest } = s;
		return rest;
	});

	return json({
		stage: withOutQuiz,
		error: false
	});
};
