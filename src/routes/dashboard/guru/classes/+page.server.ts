import type { PageServerLoad } from './$types';
import { prismaClient } from '@/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, setHeaders }) => {
	const user = locals.webUser!;

	const userFind = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			kelasDibuat: {
				select: {
					id: true,
					name: true,
					siswa: {
						select: {
							id: true
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
	setHeaders({
		'Cache-Control': 'public, max-age=300'
	});

	return {
		userFind,
		user
	};
};
