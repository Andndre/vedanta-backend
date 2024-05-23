import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		like: boolean;
	};
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}
	const { like } = body;
	if (like) {
		try {
			await prismaClient.$transaction(async (prisma) => {
				await prisma.userLikedDiscussion.create({
					data: {
						discussionId: +evt.params.id,
						userId: user.id
					}
				});
				await prisma.discussion.update({
					where: {
						id: +evt.params.id
					},
					data: {
						likesCount: {
							increment: 1
						}
					}
				});
			});
		} catch (err) {
			console.log(err);
			return error(400, 'That discussion has already been liked');
		}
	} else {
		try {
			await prismaClient.$transaction(async (prisma) => {
				await prisma.userLikedDiscussion.delete({
					where: {
						likedDiscussion: {
							userId: user.id,
							discussionId: +evt.params.id
						}
					}
				});
				await prisma.discussion.update({
					where: {
						id: +evt.params.id
					},
					data: {
						likesCount: {
							decrement: 1
						}
					}
				});
			});
		} catch (err) {
			console.log(err);
			return error(400, 'That discussion has already been disliked');
		}
	}
	return json({
		error: false,
		like
	});
};
