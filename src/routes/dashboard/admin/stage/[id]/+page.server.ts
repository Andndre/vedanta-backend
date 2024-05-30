import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const user = evt.locals.webUser;

	const stageInfo = await prismaClient.stage.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			id: true,
			materi: {
				select: {
					title: true,
					description: true,
					id: true,
					videoLink: true
				}
			},
			description: true,
			image_path: true,
			title: true,
			Quiz: {
				select: {
					id: true
				}
			}
		}
	});

	if (!stageInfo) {
		throw error(404, 'Stage not found');
	}

	return {
		stageInfo
	};
};

export const actions: Actions = {
	async update(evt) {
		const data = Object.fromEntries(await evt.request.formData()) as {
			title: string;
			description: string;
		};

		const stage = await prismaClient.stage.update({
			where: {
				id: +evt.params.id
			},
			data: {
				title: data.title,
				description: data.description
			}
		});

		throw redirect(303, `/dashboard/admin/stage/${stage.id}`);
	}
};
