import { Output } from '$api/user/GET';
import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';
import type { z } from 'sveltekit-api';

type Output = z.infer<typeof Output>;

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
			id: true
		}
	});
	if (!user) {
		return error(404, 'User not found');
	}
	return json({
		error: false,
		user
	} satisfies Output);
};
