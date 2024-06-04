import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prismaClient } from '@/db';

export const load: LayoutServerLoad = async (evt) => {
	const webUser = evt.locals.webUser;

	if (!webUser) {
		throw redirect(302, '/login?redirect=' + evt.url.pathname);
	}

	if (webUser.isAdmin) {
		throw redirect(302, '/dashboard/admin');
	}

	const user = await prismaClient.user.findUnique({
		where: {
			id: webUser.id
		},
		select: {
			profilePicture: true,
			name: true
		}
	});

	if (!user) {
		throw redirect(302, '/login?redirect=' + evt.url.pathname);
	}

	return {
		user: user
	};
};
