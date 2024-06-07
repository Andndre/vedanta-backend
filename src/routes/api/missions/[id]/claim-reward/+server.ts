import { prismaClient } from '@/db';
import { MissionType } from '@/mission';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const userApi = evt.locals.apiUser;
	let missions = await prismaClient.mission.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			id: true,
			maxProgress: true,
			rewardStars: true,
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
		}
	});
	if (!missions) {
		return error(404, 'Mission not found');
	}
	if (missions.users.length > 0) {
		return error(400, 'Mission already claimed');
	}
	const user = await prismaClient.user.findUnique({
		where: {
			id: userApi!.id
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

	let missionProgress = 0;
	switch (missions.missionType.id) {
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

	if (missionProgress < missions.maxProgress) {
		return error(400, 'Mission not yet completed');
	}

	await prismaClient.mission.update({
		where: {
			id: +evt.params.id
		},
		data: {
			users: {
				create: {
					userId: userApi!.id
				}
			}
		}
	});

	await prismaClient.user.update({
		where: {
			id: userApi!.id
		},
		data: {
			points: {
				increment: missions.rewardStars
			}
		}
	});

	return json({
		error: false,
		message: 'Mission claimed'
	});
};
