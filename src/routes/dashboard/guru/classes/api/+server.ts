import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.webUser;
	const classes = await prismaClient.kelas.findMany({
		where: {
			pengajarId: user!.id
		}
	});
	// cache for 5 minutes
	evt.setHeaders({
		'Cache-Control': 'public, max-age=300'
	});
	return json({ classes });
};
