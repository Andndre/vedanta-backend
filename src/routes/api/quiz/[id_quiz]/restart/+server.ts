import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;

	if (!user) {
		return error(401, 'Unauthorized');
	}

	try {
		await prismaClient.userQuizResult.delete({
			where: {
				userId_quizId: {
					quizId: +evt.params.id_quiz,
					userId: user.id
				}
			}
		});
	} catch (err) {
		return error(500, 'Internal Server Error');
	}

	return json({ error: false });
};
