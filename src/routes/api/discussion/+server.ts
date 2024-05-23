import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const discussions = await prismaClient.discussion.findMany({
		take: 10,
		where: {
			kelasId: null
		}
	});
	return json({
		error: false,
		discussions
	});
};
