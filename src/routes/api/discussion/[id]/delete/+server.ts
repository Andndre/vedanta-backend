import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser!;

	const discussion = await prismaClient.discussion.findUnique({
		where: {
			id: +evt.params.id,
			creatorId: user.id
		}
	});

	if (!discussion) {
		return json({
			error: true,
			message: 'Discussion not found'
		});
	}

	await prismaClient.discussion.delete({
		where: {
			id: +evt.params.id
		}
	});

	return json({
		error: false,
		message: 'Discussion deleted'
	});
};
