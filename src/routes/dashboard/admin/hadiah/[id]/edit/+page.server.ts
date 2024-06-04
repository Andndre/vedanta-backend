import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { deleteFile, uploadFile } from '@/services/CDNService';

export const load: PageServerLoad = async (evt) => {
	const id = evt.params.id;

	const hadiah = await prismaClient.gift.findUnique({
		where: {
			id: +id
		}
	});

	if (!hadiah) {
		throw error(404, 'Hadiah not found');
	}

	return {
		hadiah
	};
};

export const actions: Actions = {
	async update({ request, params }) {
		const id = params.id;
		const data = await request.formData();

		const prevDataThumbnail = await prismaClient.gift.findUnique({
			where: {
				id: +id
			},
			select: {
				thumbnail: true
			}
		});

		const containsThumbnail = (data.get('thumbnail') as Blob).size !== 0;
		console.log(containsThumbnail);
		if (containsThumbnail) {
			await deleteFile(prevDataThumbnail!.thumbnail);
		}
		const name = data.get('name') as string;
		const price = data.get('prize') as string;

		if (containsThumbnail) {
			const path = await uploadFile(data.get('thumbnail') as Blob, 'vedanta/hadiah-thumbnail');
			if (!path) {
				return error(500, "Couldn't upload thumbnail. Please try again later.");
			}
			await prismaClient.gift.update({
				where: {
					id: +id
				},
				data: {
					name,
					prize: +price,
					thumbnail: path
				}
			});
		} else {
			await prismaClient.gift.update({
				where: {
					id: +id
				},
				data: {
					name,
					prize: +price
				}
			});
		}

		throw redirect(302, '/dashboard/admin/hadiah');
	}
};
