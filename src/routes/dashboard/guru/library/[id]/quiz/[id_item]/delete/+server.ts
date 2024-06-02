import { prismaClient } from '@/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	await prismaClient.quizEntry.delete({
		where: {
			id: +evt.params.id_item
		}
	});

	throw redirect(302, `/dashboard/guru/library/${evt.params.id}/`);
};
