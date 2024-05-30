import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { deleteFile, uploadFile } from '@/services/CDNService';

export const load: PageServerLoad = async (evt) => {
	const id = evt.params.id;

	const doa = await prismaClient.doa.findUnique({
		where: {
			id: +id
		}
	});

	if (!doa) {
		throw error(404, 'Doa not found');
	}

	return {
		doa
	};
};

export const actions: Actions = {
	async update({ request, params }) {
		const id = params.id;
		const data = await request.formData();

		const prevDataPelafalan = await prismaClient.doa.findUnique({
			where: {
				id: +id
			},
			select: {
				pelafalanFile: true
			}
		});

		const containsPelafalan = (data.get('pelafalan') as Blob).size !== 0;
		console.log(containsPelafalan);
		if (containsPelafalan) {
			await deleteFile(prevDataPelafalan!.pelafalanFile);
		}
		const title = data.get('title') as string;
		const body = data.get('body') as string;
		const makna = data.get('makna') as string;

		if (containsPelafalan) {
			const path = await uploadFile(data.get('pelafalan') as Blob, 'vedanta/pelafalan-doa');
			if (!path) {
				return error(500, "Couldn't upload pelafalan. Please try again later.");
			}
			await prismaClient.doa.update({
				where: {
					id: +id
				},
				data: {
					title,
					body,
					pelafalanFile: path,
					makna
				}
			});
		} else {
			await prismaClient.doa.update({
				where: {
					id: +id
				},
				data: {
					title,
					body,
					makna
				}
			});
		}

		throw redirect(302, '/dashboard/admin/doa');
	}
};
