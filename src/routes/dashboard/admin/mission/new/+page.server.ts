import { uploadFile } from '@/services/CDNService';
import type { Actions, PageServerLoad } from './$types';
import { prismaClient } from '@/db';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const missionTypes = await prismaClient.missionType.findMany({});

	return {
		missionTypes
	};
};

export const actions: Actions = {
	async create({ request, locals }) {
		const data = await request.formData();
		const maxProgress = data.get('maxProgress') as string;
		const rewardStars = data.get('rewardStars') as string;
		const missionTypeId = data.get('missionTypeId') as string;

		await prismaClient.mission.create({
			data: {
				maxProgress: +maxProgress,
				rewardStars: +rewardStars,
				missionTypeId: +missionTypeId
			}
		});

		throw redirect(302, '/dashboard/admin/mission');
	}
};
