import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const searchQuery = evt.url.searchParams.get('q');
	if (!searchQuery) {
		return json({
			doas: [],
			error: false
		});
	}

	const doas = await prismaClient.doa.findMany({
		where: {
			title: {
				contains: searchQuery
			}
		},
		take: 10
	});

	const doasWithLiked = await Promise.all(
		doas.map(async (doa) => {
			const liked = await prismaClient.userLikedDoa.findFirst({
				where: {
					userId: evt.locals.apiUser!.id,
					doaId: doa.id
				}
			});
			return {
				...doa,
				liked: !!liked
			};
		})
	);

	return json({
		doas: doasWithLiked,
		error: false
	});
};
