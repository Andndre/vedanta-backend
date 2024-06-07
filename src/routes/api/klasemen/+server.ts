import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const klasemen = await prismaClient.user.findMany({
		orderBy: {
			points: 'desc'
		},
		select: {
			name: true,
			profilePicture: true,
			points: true,
			id: true
		}
	});

	const withCDNpicture = klasemen.map((klasemen) => {
		if (klasemen.profilePicture) {
			klasemen.profilePicture = `https://cdn.hmjtiundiksha.com/${klasemen.profilePicture}`;
		}
		return klasemen;
	});

	const currentUserIndex = withCDNpicture.findIndex(
		(klasemen) => klasemen.id === evt.locals.apiUser?.id
	);

	return json({ klasemen: withCDNpicture, currentUserIndex });
};
