import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const user = evt.locals.apiUser!;
	if (!user) {
		return error(401, 'Unauthorized');
	}

	const body = (await evt.request.json()) as {
		reply: string;
	};

	await prismaClient.$transaction(async (prisma) => {
		const discussionReply = await prisma.discussionReply.create({
			data: {
				reply: body.reply,
				creatorId: user.id,
				discussionId: +evt.params.id
			}
		});

		await prisma.discussion.update({
			where: {
				id: +evt.params.id
			},
			data: {
				repliesCount: {
					increment: 1
				}
			}
		});
	});

	return json({
		error: false,
		message: 'Reply created'
	});
};
