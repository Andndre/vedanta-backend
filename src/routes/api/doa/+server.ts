import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const page = evt.url.searchParams.get('page') || 1;
	const doas = await prismaClient.doa.findMany({
		take: 10,
		skip: (Number(page) - 1) * 10,
		select: {
			id: true,
			title: true,
			usersLiked: {
				where: {
					userId: evt.locals.apiUser?.id
				},
				select: {
					userId: true
				}
			}
		}
	});

	const response = doas.map((d) => {
		const isLiked = d.usersLiked.length > 0;
		const { usersLiked, ...rest } = d;
		const result = { ...rest, isLiked };
		return result;
	});

	return json({
		error: false,
		doas: response
	});
};
