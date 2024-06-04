import { uploadFile } from '@/services/CDNService';
import type { Actions } from './$types';
import { prismaClient } from '@/db';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	async create({ request, locals }) {
		const data = await request.formData();
		const path = await uploadFile(data.get('thumbnail') as Blob, 'vedanta/hadiah-thumbnail');
		const name = data.get('name') as string;
		const prize = data.get('prize') as string;

		if (!path) {
			return fail(500, {
				message: 'Error uploading file'
			});
		}

		await prismaClient.gift.create({
			data: {
				name,
				prize: +prize,
				thumbnail: path
			}
		});

		throw redirect(302, '/dashboard/admin/hadiah');
	}
};
