import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	// join class for user with classCode
	const user = evt.locals.apiUser;
	const body = (await evt.request.json()) as { classCode: string };

	if (!user) {
		return error(401, 'Unauthorized');
	}

	const kelas = await prismaClient.kelas.findFirst({
		where: {
			classCode: body.classCode
		},
		select: {
			id: true
		}
	});

	if (!kelas) {
		return error(404, 'Class not found');
	}

	try {
		await prismaClient.userKelas.create({
			data: {
				kelasId: kelas.id,
				userId: user.id
			}
		});
	} catch (err) {
		console.log(err);
		return error(500, 'Failed to join class');
	}

	return json({
		error: false,
		message: 'Successfully joined class'
	});
};
