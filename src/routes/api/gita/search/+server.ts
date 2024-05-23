import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const searchQuery = evt.url.searchParams.get('q');
	if (!searchQuery) {
		return json({
			gitas: [],
			error: false
		});
	}

	const gitas = await prismaClient.gitaSloka.findMany({
		where: {
			translationIndo: {
				search: searchQuery
			},
			content: {
				search: searchQuery
			}
		},
		take: 10,
		select: {
			id: true,
			content: true,
			translationIndo: true,
			number: true,
			numberBab: true
		}
	});
	return json({
		gitas,
		error: false
	});
};
