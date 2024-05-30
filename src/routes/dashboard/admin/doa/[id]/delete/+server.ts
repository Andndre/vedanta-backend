import { prismaClient } from '@/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.webUser!;

	const deleted = await prismaClient.doa.delete({
		where: {
			id: +evt.params.id
		}
	});

	// TODO: delete pelafalan file from CDN

	throw redirect(302, '/dashboard/admin/doa');
};
