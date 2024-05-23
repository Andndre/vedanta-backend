import { prismaClient } from '@/db.js';
import { error } from '@/response.js';

export const POST = async (evt) => {
	// join class for user with classCode
	const user = evt.locals.apiUser;
	const body = await evt.request.json();

	if (!user) {
		return error(401, 'Unauthorized');
	}

	try {
		await prismaClient.userKelas.create({
			data: {
				userId: user.id,
				kelasId: body.classId
			}
		});
	} catch (err) {
		return error(500, 'Failed to join class');
	}
};
