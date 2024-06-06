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
		const path = await uploadFile(data.get('pelafalan') as Blob, 'vedanta/pelafalan-doa');
		const maxProgress = data.get('maxProgress') as string;
		const starReward = data.get('starReward') as string;
		const makna = data.get('makna') as string;

		if (!path) {
			return fail(500, {
				message: 'Error uploading file'
			});
		}

		// await prismaClient.mission.create({
		// 	data: {
		// 		maxProgress: +maxProgress,
		// 		rewardStars: +starReward
		// 	}
		// });

		throw redirect(302, '/dashboard/admin/doa');
	}
};
