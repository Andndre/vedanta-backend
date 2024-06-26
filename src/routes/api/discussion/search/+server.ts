import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const searchQuery = evt.url.searchParams.get('q');
	if (!searchQuery) {
		return json({ discussions: [], error: false });
	}
	try {
		const discussions = await prismaClient.discussion.findMany({
			where: {
				title: {
					search: searchQuery
				}
			},
			select: {
				title: true,
				creator: {
					select: {
						name: true
					}
				},
				id: true,
				likesCount: true,
				repliesCount: true
			},
			take: 10,
			orderBy: {
				createdAt: 'desc'
			}
		});
		return json({
			discussions: discussions.map((e) => ({
				title: e.title,
				creatorName: e.creator.name,
				id: e.id
			})),
			error: false
		});
	} catch (err) {
		return json({ discussions: [], error: true });
	}
};
