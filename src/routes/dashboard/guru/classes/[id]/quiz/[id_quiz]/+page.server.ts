import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz
		},
		include: {
			entries: {
				select: {
					id: true,
					scoreIncorrect: true,
					questionModel: true,
					scoreCorrect: true
				}
			}
		}
	});

	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	return {
		quiz
	};
};

export const actions: Actions = {
	async save(evt) {
		const body = Object.fromEntries(await evt.request.formData()) as {
			title: string;
			dueDate: string; // come from input date
			isDraft: string; // come from checkbox
		};

		await prismaClient.quiz.update({
			where: {
				id: +evt.params.id_quiz
			},
			data: {
				title: body.title,
				dueDate: new Date(body.dueDate),
				isDraft: body.isDraft === 'on'
			}
		});

		throw redirect(302, `/dashboard/guru/classes/${evt.params.id}`);
	}
};
