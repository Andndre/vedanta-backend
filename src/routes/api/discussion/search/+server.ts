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
				body: {
					search: searchQuery
				},
				title: {
					search: searchQuery
				}
			}
		});
		return json({ discussions, error: false });
	} catch (err) {
		return json({ discussions: [], error: true });
	}
};
