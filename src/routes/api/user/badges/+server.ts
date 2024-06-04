import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = await prismaClient.user.findUnique({
		where: {
			id: evt.locals.apiUser!.id
		},
		select: {
			badges: {
				select: {
					badge: {
						select: {
							parameter: true,
							name: true,
							type: {
								select: {
									name: true,
									description: true,
									color: true
								}
							},
							thumbnail: true
						}
					}
				}
			}
		}
	});

	const badges = user!.badges.map((badge) => {
		return {
			name: badge.badge.name,
			description: badge.badge.type.description.replace('{x}', badge.badge.parameter.toString()),
			color: badge.badge.type.color,
			image: badge.badge.thumbnail
		};
	});

	return json({ badges });
};
