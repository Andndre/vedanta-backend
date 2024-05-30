import { prismaClient } from '@/db';
import type { Actions } from './$types';
import { uploadFile } from '@/services/CDNService';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	async create(evt) {
		const formData = await evt.request.formData();
		const { title, description } = Object.fromEntries(formData) as {
			title: string;
			description: string;
		};

		const image = formData.get('image') as Blob;
		const image_path = await uploadFile(image, 'vedanta/stage-image');

		if (!image_path) {
			console.log('why');
			return fail(500, {
				message: 'Failed to upload image'
			});
		}

		await prismaClient.stage.create({
			data: {
				title,
				description,
				image_path
			}
		});

		throw redirect(302, '/dashboard/admin/stage');
	}
};
