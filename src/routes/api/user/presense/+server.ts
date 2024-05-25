import { getPointReward } from '$lib/utils.js';
import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}

	const res = await prismaClient.$transaction(async (prisma) => {
		const userFind = (await prisma.user.findUnique({
			where: {
				id: user.id
			}
		}))!;

		const lastActiveAt = new Date(userFind.lastActiveAt);
		const today = new Date();

		// Clear the time part for both dates
		const lastActiveDate = new Date(
			lastActiveAt.getFullYear(),
			lastActiveAt.getMonth(),
			lastActiveAt.getDate()
		);
		const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

		// Calculate the difference in days
		const diffTime = todayDate.getTime() - lastActiveDate.getTime();
		const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

		// Check if the difference is exactly 1 day
		if (diffDays === 1) {
			const pointReward = getPointReward(userFind.activeStreak + 1);
			await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					lastActiveAt: today,
					activeStreak: {
						increment: 1
					},
					points: {
						increment: pointReward
					}
				}
			});
			return {
				sameDay: false,
				isStreak: true,
				day: userFind.activeStreak % 7 || 7,
				currentStreakTotal: userFind.activeStreak + 1,
				pointReward
			};
		} else if (diffDays > 1) {
			const pointReward = getPointReward(1);
			await prisma.user.update({
				where: {
					id: user.id
				},
				data: {
					lastActiveAt: today,
					activeStreak: 1,
					points: {
						increment: pointReward
					}
				}
			});
			return {
				sameDay: false,
				isStreak: false,
				day: 1,
				currentStreakTotal: 1,
				pointReward
			};
		} else {
			return {
				sameDay: true,
				isStreak: false,
				day: userFind.activeStreak % 7,
				currentStreakTotal: userFind.activeStreak,
				pointReward: 0
			};
		}
	});

	return json({
		error: false,
		data: res
	});
};
