import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	// get all classes for this user
	const user = evt.locals.apiUser;
	if (!user) {
		return error(401, 'Unauthorized');
	}
	const classes = await prismaClient.userKelas.findMany({
		where: {
			userId: user.id
		}
	});
	// cache for 5 minutes
	evt.setHeaders({
		'Cache-Control': 'public, max-age=300'
	});
	return json({ classes, error: false });
};
