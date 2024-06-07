import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	let missions = await prismaClient.mission.findMany({
		select: {
			id: true,
			maxProgress: true,
			missionType: {
				select: {
					name: true,
					id: true
				}
			}
		},
		orderBy: {
			maxProgress: 'asc'
		}
	});

	let userMissions = await prismaClient.userMission.findMany({
		where: {
			userId: evt.locals.apiUser!.id
		},
		select: {
			progress: true,
			missionId: true
		}
	});

	// create user mission if not exist for each mission
	for (const mission of missions) {
		const userMission = userMissions.find((um) => um.missionId === mission.id);
		if (!userMission) {
			const newMission = await prismaClient.userMission.create({
				data: {
					userId: evt.locals.apiUser!.id,
					missionId: mission.id,
					progress: 0
				},
				select: {
					progress: true,
					missionId: true
				}
			});

			userMissions.push(newMission);
		}
	}

	// merge progress
	const userMissionsWithProgress = missions.map((um) => {
		const mission = userMissions.find((m) => m.missionId === um.id);
		const { missionType, ...rest } = um;
		return {
			...rest,
			progress: mission ? mission.progress : 0,
			displayName: um.missionType.name.replaceAll('{x}', `${um.maxProgress}`)
		};
	});

	const user = await prismaClient.user.findUnique({
		where: {
			id: evt.locals.apiUser!.id
		},
		select: {
			activeStreak: true,
			lastActiveAt: true
		}
	});

	const lastActiveDate = new Date(user!.lastActiveAt);
	const today = new Date();
	const diffTime = today.getTime() - lastActiveDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

	console.log(diffDays);

	let presenseAvailable = diffDays >= 1;

	if (!presenseAvailable) {
		await prismaClient.user.update({
			where: {
				id: evt.locals.apiUser!.id
			},
			data: {
				lastActiveAt: new Date(),
				activeStreak: 0
			}
		});
		if (diffDays > 1) {
			user?.activeStreak && (user.activeStreak = 0);
		}
	}

	return json({
		mission: userMissionsWithProgress,
		presenseAvailable,
		activeStreak: user!.activeStreak
	});
};
