import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		answer: string;
	};

	const quizEntry = await prismaClient.quizEntry.findUnique({
		where: {
			id: +evt.params.id_entry
		},
		select: {
			questionModel: true
		}
	});

	if (!quizEntry) {
		return error(404, 'Quiz Entry not found');
	}

	const { answer } = body;
	const {
		questionModel: { correct }
	} = quizEntry as { questionModel: { correct: string } };

	return json({ correct: correct === answer });
};
