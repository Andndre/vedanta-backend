import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const kelas = await prismaClient.kelas.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			id: true,
			name: true
		}
	});

	if (!kelas) {
		throw error(404, 'Kelas not found');
	}

	return {
		kelas
	};
};

export const actions: Actions = {
	async save(evt) {
		const body = Object.fromEntries(await evt.request.formData()) as {
			doaId: string;
			dueDate: string;
		};

		await prismaClient.homeWorkDoa.create({
			data: {
				deadline: new Date(body.dueDate),
				doaId: +body.doaId,
				kelasId: +evt.params.id
			}
		});

		throw redirect(302, `/dashboard/guru/classes/${evt.params.id}`);
	}
};
