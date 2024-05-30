import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const user = evt.locals.webUser;

	const stageInfo = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			materi: {
				select: {
					title: true,
					description: true,
					id: true
				}
			},
			description: true,
			image_path: true,
			title: true,
			Quiz: {
				select: {
					_count: true
				}
			}
		}
	});

	console.log(stageInfo);

	if (!stageInfo) {
		throw error(404, 'Stage not found');
	}

	return {
		stageInfo
	};
};
