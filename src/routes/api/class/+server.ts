import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	// get all classes for this user
	const user = evt.locals.apiUser;
	if (!user) {
		console.log('Unauthorized');
		return error(401, 'Unauthorized');
	}
	const classes = await prismaClient.userKelas.findMany({
		where: {
			userId: user.id
		},
		select: {
			kelas: {
				select: {
					id: true,
					name: true,
					pengajar: {
						select: {
							name: true
						}
					}
				}
			}
		}
	});

	const response = classes.map((c) => ({
		className: c.kelas.name,
		teacherName: c.kelas.pengajar.name,
		id: c.kelas.id
	}));

	return json({ classes: response, error: false });
};
