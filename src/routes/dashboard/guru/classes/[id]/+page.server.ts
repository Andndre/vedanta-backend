import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const idKelas = evt.params.id;
	const kelas = await prismaClient.kelas.findUnique({
		where: {
			id: +idKelas
		},
		select: {
			name: true,
			quizzes: {
				select: {
					title: true,
					createdAt: true,
					id: true,
					isDraft: true
				}
			},
			siswa: {
				select: {
					id: true
				}
			},
			id: true
		}
	});
	if (!kelas) {
		throw error(404, 'Kelas not found');
	}
	return {
		kelas
	};
};
