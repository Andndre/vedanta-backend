import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const id = evt.params.id;
	const user = evt.locals.apiUser;

	if (!user) {
		return error(401, 'Unauthorized');
	}

	const stage = await prismaClient.userClaimsHadiahStage.findUnique({
		where: {
			userId_stageId: {
				stageId: +id,
				userId: user.id
			}
		}
	});

	if (stage) {
		return error(400, 'Already claimed');
	}

	return await prismaClient.$transaction(async (prisma) => {
		await prisma.userClaimsHadiahStage.create({
			data: {
				userId: user.id,
				stageId: +id
			}
		});

		const reward = await prisma.stage.findUnique({
			where: {
				id: +id
			},
			select: {
				points_reward_finished: true
			}
		});

		if (!reward) {
			return error(404, 'Stage not found');
		}

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				points: {
					increment: reward.points_reward_finished
				}
			}
		});

		return json({ reward: reward.points_reward_finished });
	});
};
