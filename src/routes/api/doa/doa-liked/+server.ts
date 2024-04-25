import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const doas = await prismaClient.userLikedDoa.findMany({
		where: {
			userId: evt.locals.apiUser!.id
		},
		select: {
			doa: {
				select: {
					id: true,
					title: true
				}
			}
		}
	});

	return json({
		doas,
		error: false
	});
};
