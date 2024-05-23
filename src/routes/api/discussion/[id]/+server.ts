import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const discussion = await prismaClient.discussion.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			title: true,
			body: true,
			likesCount: true,
			repliesCount: true,
			createdAt: true,
			userLikes: {
				where: {
					userId: evt.locals.apiUser!.id
				},
				select: {
					userId: true
				}
			},
			creator: {
				select: {
					name: true
				}
			},
			replies: {
				orderBy: {
					createdAt: 'asc'
				},
				where: {
					discussionReplyId: null // top level
				},
				select: {
					usersLiked: {
						where: {
							userId: evt.locals.apiUser!.id
						},
						select: {
							userId: true
						}
					},
					id: true,
					reply: true,
					creator: {
						select: {
							name: true
						}
					},
					likesCount: true,
					createdAt: true,
					replies: {
						orderBy: {
							createdAt: 'asc'
						},
						select: {
							id: true,
							likesCount: true,
							reply: true,
							createdAt: true,
							creator: {
								select: {
									name: true
								}
							}
						}
					}
				}
			}
		}
	});

	if (!discussion) {
		return json({
			error: true,
			message: 'Discussion not found'
		});
	}

	const isLiked = discussion.userLikes.some((u) => u.userId === evt.locals.apiUser?.id);
	const { userLikes, ...rest } = discussion;
	const withIsLiked = { isLiked, ...rest };
	const repliesWithIsLiked = discussion.replies.map((r) => {
		const isLiked = r.usersLiked.some((u) => u.userId === evt.locals.apiUser?.id);
		const { usersLiked, ...rest } = r;
		return { isLiked, ...rest };
	});
	const withIsLikedAndReplies = { ...withIsLiked, replies: repliesWithIsLiked };

	return json({
		discussion: withIsLikedAndReplies,
		error: false
	});
};
