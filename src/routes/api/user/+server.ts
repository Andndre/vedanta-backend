import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	if (!evt.locals.apiUser) {
		return error(401, 'Unauthorized');
	}
	const user = await prismaClient.user.findUnique({
		where: {
			id: evt.locals.apiUser.id
		},
		select: {
			email: true,
			activeStreak: true,
			isAdmin: true,
			name: true,
			points: true,
			lastActiveAt: true,
			id: true,
			profilePicture: true,
			badges: {
				select: {
					badge: {
						select: {
							id: true
						}
					}
				}
			}
		}
	});
	if (!user) {
		return error(404, 'User not found');
	}
	const response = {
		...user,
		profilePicture: user.profilePicture
			? `https://cdn.hmjtiundiksha.com/${user.profilePicture}`
			: null,
		badges: user.badges.length
	};

	return json({
		error: false,
		user: response
	});
};
