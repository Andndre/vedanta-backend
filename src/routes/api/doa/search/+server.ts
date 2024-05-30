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

	console.log(doas);

	return json({
		doas,
		error: false
	});
};
