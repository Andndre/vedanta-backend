import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		title: string;
		body: string;
	};
	const user = evt.locals.apiUser!;
	const discussion = await prismaClient.discussion.create({
		data: {
			title: body.title,
			creatorId: user.id,
			body: body.body
		}
	});
	return json({
		error: false,
		discussion
	});
};
