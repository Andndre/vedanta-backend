import { prismaClient } from '@/db.js';
import { error } from '@/response';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}
	const body = (await evt.request.json()) as {
		audioPath: string;
		imagePath: string;
	};

	if (!body.audioPath || !body.imagePath) {
		return error(400, 'Bad request');
	}

	try {
		await prismaClient.userHomeworkDoa.create({
			data: {
				fileRecorded: body.audioPath,
				documentationImage: body.imagePath,
				userId: user.id,
				homeWorkDoaId: +evt.params.tugas_id
			}
		});
	} catch (err) {
		return error(500, 'Failed to update alarm: ' + err);
	}

	return json({
		error: false,
		message: 'success'
	});
};
