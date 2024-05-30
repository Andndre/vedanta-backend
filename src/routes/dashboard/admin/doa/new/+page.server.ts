import { uploadFile } from '@/services/CDNService';
import type { Actions } from './$types';
import { prismaClient } from '@/db';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	async create({ request, locals }) {
		const data = await request.formData();
		const path = await uploadFile(data.get('pelafalan') as Blob, 'vedanta/pelafalan-doa');
		const title = data.get('title') as string;
		const body = data.get('body') as string;
		const makna = data.get('makna') as string;

		if (!path) {
			return fail(500, {
				message: 'Error uploading file'
			});
		}

		await prismaClient.doa.create({
			data: {
				title,
				body,
				pelafalanFile: path,
				makna
			}
		});

		throw redirect(302, '/dashboard/admin/doa');
	}
};
