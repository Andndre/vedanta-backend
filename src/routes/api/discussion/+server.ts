import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const discussions = await prismaClient.discussion.findMany({
		take: 10,
		where: {
			kelasId: null
		},
		select: {
			title: true,
			createdAt: true,
			id: true,
			creator: {
				select: {
					name: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
	return json({
		error: false,
		discussions
	});
};
