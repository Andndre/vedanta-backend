import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser!;

	const favorites = await prismaClient.userLikedGitaSloka.findMany({
		where: {
			userId: user.id
		},
		select: {
			sloka: {
				select: {
					number: true,
					id: true,
					numberBab: true,
					content: true,
					translationIndo: true,
					usersLiked: {
						where: {
							userId: user.id
						},
						select: {
							id: true
						}
					}
				}
			}
		}
	});

	// Check if usersLiked contains any items and set isLiked accordingly
	const withIsLiked = favorites.map((sloka) => {
		// Destructure usersLiked and create a new object without it
		const res = { ...sloka, isLiked: sloka.sloka.usersLiked.length > 0 };
		return {
			id: res.sloka.id,
			isLiked: res.isLiked,
			number: res.sloka.number,
			content: res.sloka.content,
			translationIndo: res.sloka.translationIndo,
			numberBab: res.sloka.numberBab
		};
	});

	return json({ slokas: withIsLiked });
};
