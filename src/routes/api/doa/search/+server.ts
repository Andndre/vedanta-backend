import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const searchQuery = evt.url.searchParams.get('q');
	if (!searchQuery) {
		const doas = await prismaClient.doa.findMany({
			take: 10
		});
		return json({
			doas,
			error: false
		});
	}

	const doas = await prismaClient.doa.findMany({
		where: {
			OR: [
				{
					title: {
						contains: searchQuery
					}
				},
				{
					body: {
						contains: searchQuery
					}
				}
			]
		},
		take: 10
	});

	return json({
		doas,
		error: false
	});
};
