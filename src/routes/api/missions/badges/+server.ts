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
							thumbnail: true,
							id: true
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

	const allBadges = await prismaClient.badge.findMany({
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
			thumbnail: true,
			id: true
		}
	});

	const allBadgesWithHas = allBadges.map((badge) => {
		if (!badges.find((b) => b.name === badge.name)) {
			return { ...badge, has: false };
		}

		return { ...badge, has: true };
	});

	const normalisasi = allBadgesWithHas.map((badge) => {
		return {
			name: badge.name,
			description: badge.type.description.replace('{x}', badge.parameter.toString()),
			color: badge.type.color,
			image: badge.thumbnail,
			has: badge.has
		};
	});

	// sort by has
	normalisasi.sort((a, b) => {
		if (a.has < b.has) {
			return 1;
		}
		if (a.has > b.has) {
			return -1;
		}
		return 0;
	});

	return json({ badges: normalisasi });
};
