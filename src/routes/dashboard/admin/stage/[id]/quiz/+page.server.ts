import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const stage = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			id: true,
			title: true,
			Quiz: {
				select: {
					title: true,
					id: true
				}
			}
		}
	});

	if (!stage) {
		throw error(404, 'Stage not found');
	}

	return {
		stage
	};
};
