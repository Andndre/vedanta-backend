// get quiz information

import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const quizEntry = await prismaClient.quizEntry.findUnique({
		where: {
			id: +evt.params.id_entry
		}
	});

	return json(quizEntry);
};
