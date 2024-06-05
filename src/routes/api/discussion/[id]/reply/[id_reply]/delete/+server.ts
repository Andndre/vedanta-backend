import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const DELETE = async (evt) => {
	const user = evt.locals.apiUser!;

	const discussion = await prismaClient.discussionReply.findUnique({
		where: {
			id: +evt.params.id_reply,
			creatorId: user.id
		}
	});

	if (!discussion) {
		return json({
			error: true,
			message: 'Discussion not found'
		});
	}

	await prismaClient.discussionReply.delete({
		where: {
			id: +evt.params.id_reply
		}
	});

	await prismaClient.discussion.update({
		where: {
			id: +evt.params.id
		},
		data: {
			repliesCount: {
				decrement: 1
			}
		}
	});

	return json({
		error: false,
		message: 'Discussion reply deleted'
	});
};
