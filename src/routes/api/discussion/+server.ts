import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const page = evt.url.searchParams.get('page') || 1;
	const discussions = await prismaClient.discussion.findMany({
		take: 10,
		skip: (Number(page) - 1) * 10,
		where: {
			kelasId: null
		},
		select: {
			title: true,
			createdAt: true,
			likesCount: true,
			repliesCount: true,
			id: true,
			creator: {
				select: {
					name: true,
					id: true
				}
			},
			userLikes: {
				select: {
					userId: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const response = discussions.map((d) => {
		const { userLikes, ...rest } = d;
		return {
			...rest,
			isLiked: d.userLikes.some((u) => u.userId === evt.locals.apiUser?.id)
		};
	});

	const withShowDelete = response.map((d) => {
		return { ...d, showDelete: d.creator.id === evt.locals.apiUser?.id };
	});

	return json({
		error: false,
		discussions: withShowDelete
	});
};
