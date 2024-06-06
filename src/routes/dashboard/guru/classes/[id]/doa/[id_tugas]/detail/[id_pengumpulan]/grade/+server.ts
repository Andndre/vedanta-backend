import { prismaClient } from '@/db';
import { error } from '@/response';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}
	const body = (await evt.request.json()) as {
		grade: number;
	};

	if (!body.grade) {
		return error(400, 'Bad request');
	}

	try {
		await prismaClient.userHomeworkDoa.update({
			where: {
				id: +evt.params.id_tugas
			},
			data: {
				grade: body.grade
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
