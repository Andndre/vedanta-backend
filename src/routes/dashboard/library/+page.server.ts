import type { PageServerLoad } from './$types';
import { prismaClient } from '@/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.webUser!;

	const userFind = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			quizzesCreated: {
				where: {
					kelasId: null
				},
				select: {
					id: true,
					title: true,
					createdAt: true
				}
			}
		}
	});

	if (!userFind) {
		error(404, 'User not found');
	}

	return {
		userFind,
		user
	};
};
