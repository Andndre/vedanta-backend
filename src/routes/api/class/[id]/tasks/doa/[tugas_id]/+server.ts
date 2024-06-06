import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const { id, tugas_id } = evt.params;

	const tugas = await prismaClient.homeWorkDoa.findUnique({
		where: {
			id: +tugas_id,
			kelasId: +id
		},
		select: {
			doa: {
				select: {
					id: true,
					title: true,
					makna: true,
					body: true,
					pelafalanFile: true
				}
			},
			deadline: true,
			usersHomework: {
				where: {
					userId: evt.locals.apiUser?.id
				},
				select: {
					id: true,
					createdAt: true,
					fileRecorded: true,
					documentationImage: true,
					grade: true
				}
			}
		}
	});

	if (!tugas) {
		return error(404, 'Tugas not found');
	}

	return json(tugas);
};
