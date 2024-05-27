import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const user = evt.locals.webUser!;

	const userFind = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			quizzesCreated: {
				select: {
					id: true,
					title: true,
					createdAt: true,
					kelasId: true,
					kelas: {
						select: {
							name: true
						}
					}
				}
			}
		}
	});

	if (!userFind) {
		error(404, 'User not found');
	}

	// cache for 5 minutes
	evt.setHeaders({
		'Cache-Control': 'public, max-age=300'
	});

	return {
		userFind
	};
};
