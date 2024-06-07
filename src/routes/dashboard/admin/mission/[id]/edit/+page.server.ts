import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const id = evt.params.id;

	const mission = await prismaClient.mission.findUnique({
		where: {
			id: +id
		},
		include: {
			missionType: true
		}
	});

	if (!mission) {
		throw error(404, 'Doa not found');
	}

	return {
		mission
	};
};

export const actions: Actions = {
	async update({ request, params }) {
		const id = params.id;
		const data = await request.formData();

		const maxProgress = data.get('maxProgress') as string;
		const rewardStars = data.get('rewardStars') as string;

		await prismaClient.mission.update({
			where: {
				id: +id
			},
			data: {
				maxProgress: +maxProgress,
				rewardStars: +rewardStars
			}
		});

		throw redirect(302, '/dashboard/admin/missions');
	}
};
