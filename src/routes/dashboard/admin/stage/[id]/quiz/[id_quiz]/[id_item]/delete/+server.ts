import { prismaClient } from '@/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	const quiz = await prismaClient.quizEntry.delete({
		where: {
			id: +evt.params.id_item
		}
	});

	throw redirect(302, `/dashboard/admin/stage/${evt.params.id}/quiz/${evt.params.id_quiz}`);
};
