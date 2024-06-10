import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const tugas = await prismaClient.homeWorkDoa.findUnique({
		where: {
			id: +evt.params.id_tugas
		},
		select: {
			doa: {
				select: {
					title: true
				}
			},
			usersHomework: {
				select: {
					user: {
						select: {
							name: true,
							profilePicture: true
						}
					},
					createdAt: true,
					id: true,
					grade: true,
				},
				orderBy: {
					createdAt: 'desc'
				}
			}
		}
	});

	if (!tugas) {
		throw error(404, 'Tugas not found');
	}

	return {
		tugas,
		kelasId: evt.params.id,
		tugasId: evt.params.id_tugas
	};
};
