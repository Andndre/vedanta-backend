import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const discussion = await prismaClient.discussion.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			title: true,
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
					name: true,
					profilePicture: true
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
							name: true,
							profilePicture: true
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
									name: true,
									profilePicture: true
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

	const URL_CDN = 'https://cdn.hmjtiundiksha.com/';

	const isLiked = discussion.userLikes.some((u) => u.userId === evt.locals.apiUser?.id);
	const { userLikes, ...rest } = discussion;
	rest.creator.profilePicture = URL_CDN + discussion.creator.profilePicture;
	const withIsLiked = { isLiked, ...rest };
	const repliesWithIsLiked = discussion.replies.map((r) => {
		const isLikedNested = r.usersLiked.some((u) => u.userId === evt.locals.apiUser?.id);
		const { usersLiked, ...restNested } = r;
		restNested.creator.profilePicture = URL_CDN + r.creator.profilePicture;
		restNested.replies = r.replies.map((r) => {
			r.creator.profilePicture = URL_CDN + r.creator.profilePicture;
			return { isLiked, ...r };
		});
		return { isLiked: isLikedNested, ...restNested };
	});
	const withIsLikedAndReplies = { ...withIsLiked, replies: repliesWithIsLiked };

	return json({
		discussion: withIsLikedAndReplies,
		error: false
	});
};
