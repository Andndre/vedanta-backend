import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}

	const userFind = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			profilePicture: true
		}
	});

	if (userFind?.profilePicture) {
		throw redirect(302, `https://cdn.hmjtiundiksha.com/${userFind.profilePicture}`);
	}

	return error(404, "Profile picture not found, or the user doesn't have a profile picture");
};
