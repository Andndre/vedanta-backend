import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
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

	const body = (await evt.request.json()) as {
		title: string;
		body: string;
	};

	await prismaClient.discussion.update({
		where: {
			id: +evt.params.id
		},
		data: {
			title: body.title,
			body: body.body
		}
	});

	return json({
		error: false,
		message: 'Discussion updated'
	});
};
