import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const missions = await prismaClient.mission.findMany({
		include: {
			missionType: true
		},
		orderBy: {
			maxProgress: 'asc'
		}
	});

	return { missions };
};
