import { prismaClient } from '@/db.js';
import { error, json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.webUser!;

	const userFind = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			quizzesCreated: {
				where: {
					kelasId: null
				},
				select: {
					id: true,
					title: true,
					createdAt: true
				}
			}
		}
	});

	if (!userFind) {
		error(404, 'User not found');
	}

	// cache for 5 minutes
	evt.setHeaders({
		'Cache-Control': 'public, max-age=300'
	});

	return json({ userFind });
};
