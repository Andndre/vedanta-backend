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

	const response = doas.map((d) => ({ ...d.doa, isLiked: true }));

	return json({
		doas: response,
		error: false
	});
};
