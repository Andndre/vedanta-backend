import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
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
		throw error(404, 'Stage not found');
	}

	return {
		stage
	};
};

export const actions: Actions = {
	async update(evt) {
		const data = Object.fromEntries(await evt.request.formData()) as {
			title: string;
			description: string;
			videoLink: string;
		};

		const stage = await prismaClient.stage.update({
			where: {
				id: +evt.params.id
			},
			data: {
				materi: {
					upsert: {
						create: data,
						update: data
					}
				}
			}
		});

		throw redirect(303, `/dashboard/admin/stage/${stage.id}`);
	}
};
