import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const stage = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			materi: {
				select: {
					title: true,
					description: true,
					videoLink: true
				}
			}
		}
	});

	if (!stage) {
		return error(404, 'Stage not found');
	}

	return json(stage.materi);
};
