import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const stage = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			materi: {
				select: {
					id: true
				}
			},
			Quiz: {
				select: {
					id: true,
					entries: {
						select: {
							usersAnsweredQuiz: {
								where: {
									userId: evt.locals.apiUser!.id
								},
								select: {
									id: true
								}
							},
							id: true
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

	let sumEntryAnswered = 0;

	for (let i = 0; i < stage.Quiz.length; i++) {
		for (let j = 0; j < stage.Quiz[i].entries.length; j++) {
			sumEntryAnswered += stage.Quiz[i].entries[j].usersAnsweredQuiz.length;
		}
	}

	const expected = {
		stage: {
			points_reward_finish: stage.points_reward_finished,
			entry_count: stage.Quiz.entries.length,
			entry_answered: sumEntryAnswered,
			materi_id: stage.materi ? stage.materi.id : null
		}
	};

	return json({
		...expected
	});
};
