import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.webUser;
	const classes = await prismaClient.kelas.findMany({
		where: {
			pengajarId: user!.id
		}
	});
	return json({ classes });
};
