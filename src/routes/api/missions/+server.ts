import { prismaClient } from '@/db.js';
import { MissionType } from '@/mission.js';
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
			},
			users: {
				where: {
					userId: evt.locals.apiUser!.id
				}
			}
		},
		orderBy: {
			maxProgress: 'asc'
		}
	});

	const user = await prismaClient.user.findUnique({
		where: {
			id: evt.locals.apiUser!.id
		},
		select: {
			activeStreak: true,
			lastActiveAt: true,
			quizCompleted: true,
			quizEntriesAnswered: true,
			stagesCompleted: true,
			discussionsAsked: true,
			ganeshBotMessages: true
		}
	});

	// merge progress
	const userMissionsWithProgress = missions.map((um) => {
		let missionProgress = 0;
		switch (um.missionType.id) {
			case MissionType.HADIR_BERTURUT_TURUT:
				missionProgress = user?.activeStreak || 0;
				break;
			case MissionType.BERTANYA_DISKUSI:
				missionProgress = user?.discussionsAsked || 0;
				break;
			case MissionType.MENGIRIM_PESAN_GANESH_BOT:
				missionProgress = user?.ganeshBotMessages || 0;
				break;
			case MissionType.SELESAIKAN_QUIZ:
				missionProgress = user?.quizCompleted || 0;
				break;
		}

		const { missionType, ...rest } = um;
		const alreadyClaimed = um.users.length > 0;
		return {
			...rest,
			alreadyClaimed,
			progress: Math.min(missionProgress, um.maxProgress),
			displayName: um.missionType.name.replaceAll('{x}', `${um.maxProgress}`)
		};
	});

	// remove completed missions
	userMissionsWithProgress.forEach((m) => {
		if (m.progress >= m.maxProgress) {
			userMissionsWithProgress.splice(userMissionsWithProgress.indexOf(m), 1);
		}
	});

	const lastActiveDate = new Date(user!.lastActiveAt);
	const today = new Date();
	const diffTime = today.getTime() - lastActiveDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

	let presenseAvailable = diffDays >= 1;

	if (!presenseAvailable) {
		await prismaClient.user.update({
			where: {
				id: evt.locals.apiUser!.id
			},
			data: {
				lastActiveAt: new Date()
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
