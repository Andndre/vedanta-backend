import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		title: string;
	};
	const user = evt.locals.apiUser!;
	await prismaClient.discussion.create({
		data: {
			title: body.title,
			creatorId: user.id
		}
	});
	return json({
		error: false,
		message: 'discussion created'
	});
};
