import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const detail = await prismaClient.userHomeworkDoa.findUnique({
		where: {
			id: +evt.params.id_pengumpulan
		},
		select: {
			user: {
				select: {
					name: true,
					profilePicture: true
				}
			},
			documentationImage: true,
			fileRecorded: true,
			grade: true
		}
	});

	if (!detail) {
		throw error(404, 'Detail not found');
	}

	return {
		detail
	};
};

export const actions: Actions = {
	async grade(evt) {
		const user = evt.locals.webUser;
		if (!user) {
			return error(401, 'Unauthorized');
		}
		const body = Object.fromEntries(await evt.request.formData());

		try {
			await prismaClient.userHomeworkDoa.update({
				where: {
					id: +evt.params.id_pengumpulan
				},
				data: {
					grade: +body.grade as number
				}
			});
		} catch (err) {
			return error(500, 'Failed to update alarm: ' + err);
		}

		throw redirect(
			303,
			`/dashboard/guru/classes/${evt.params.id}/doa/${evt.params.id_tugas}/detail/${+evt.params.id_pengumpulan}`
		);
	}
};
