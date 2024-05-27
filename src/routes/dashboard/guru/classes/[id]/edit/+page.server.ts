import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { securePath } from '$lib/utils';

export const load: PageServerLoad = async (evt) => {
	const id = evt.params.id;

	const findKelas = await prismaClient.kelas.findUnique({
		where: {
			id: +id,
			pengajarId: evt.locals.webUser!.id
		}
	});

	if (!findKelas) {
		throw error(404, 'Kelas not found');
	}

	return {
		kelas: findKelas
	};
};

export const actions: Actions = {
	async update(evt) {
		const idKelas = evt.params.id;

		const body = Object.fromEntries(await evt.request.formData()) as {
			name: string;
		};

		await prismaClient.kelas.update({
			where: {
				id: +idKelas
			},
			data: {
				name: body.name
			}
		});

		throw redirect(302, securePath(`/dashboard/guru/classes/${idKelas}`));
	}
};
