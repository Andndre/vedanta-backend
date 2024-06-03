import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const kelas = await prismaClient.kelas.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			id: true,
			name: true,
			classCode: true,
			siswa: {
				select: {
					user: {
						select: {
							name: true,
							profilePicture: true,
							id: true
						}
					}
				}
			}
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
	async remove(evt) {
		const user = evt.locals.webUser;

		if (!user) {
			throw error(401, 'Unauthorized');
		}

		const body = Object.fromEntries(await evt.request.formData());
		const idSiswa = body.id;
		const idKelas = evt.params.id;

		await prismaClient.userKelas.delete({
			where: {
				userId_kelasId: {
					userId: idSiswa as string,
					kelasId: +idKelas
				}
			}
		});

		return { success: true };
	}
};
