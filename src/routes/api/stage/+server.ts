import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	if (!evt.locals.apiUser) {
		return error(401, 'Unauthorized');
	}

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
							userId: evt.locals.apiUser.id,
							completed: true
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

	// tambahkan variable status lock untuk quiz pertama yang belum diselesaikan (1 setelah yang seharusnya dikerjakan)
	let lock = false;
	let lastUnlockedIndex = 0;
	const withLock = withOutQuiz.map((s, i) => {
		if (!lock) {
			if (s.finished < s.quizCount) {
				lock = true;
				lastUnlockedIndex = i;
				return { ...s, locked: false };
			} else {
				lastUnlockedIndex = i;
				return { ...s, locked: false };
			}
		} else {
			return { ...s, locked: true };
		}
	});

	return json({
		stage: withLock,
		lastUnlockedIndex,
		error: false
	});
};
