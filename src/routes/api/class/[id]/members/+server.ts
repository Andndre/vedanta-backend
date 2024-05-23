import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}

	const classId = +evt.params.id;

	const inClass = await prismaClient.userKelas.findMany({
		where: {
			userId: user.id,
			kelasId: classId
		},
		select: {
			kelas: {
				select: {
					id: true
				}
			}
		}
	});

	if (inClass.length === 0) {
		return error(401, 'You are not in this class');
	}

	const members = await prismaClient.kelas.findUnique({
		where: {
			id: classId
		},
		select: {
			siswa: {
				select: {
					user: {
						select: {
							name: true
						}
					}
				}
			}
		}
	});

	if (!members) {
		return error(404, 'Class not found');
	}

	const response = members.siswa.map((m) => ({
		name: m.user.name
	}));

	return json({ members: response, error: false });
};
