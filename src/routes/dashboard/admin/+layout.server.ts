import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prismaClient } from '@/db';

export const load: LayoutServerLoad = async (evt) => {
	const webUser = evt.locals.webUser;

	if (!webUser) {
		throw redirect(302, '/login');
	}

	if (!webUser.isAdmin) {
		throw redirect(302, '/dashboard/guru');
	}

	const user = await prismaClient.user.findUnique({
		where: {
			id: webUser.id
		},
		select: {
			profilePicture: true
		}
	});

	if (!user) {
		throw redirect(302, '/login');
	}

	return {
		profile: user.profilePicture,
		user: webUser
	};
};
