import { prismaClient } from '@/db';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export const load: PageServerLoad = async (evt) => {
	const idQuiz = evt.params.id_quiz;

	const findQuiz = await prismaClient.quiz.findUnique({
		where: {
			id: +idQuiz
		},
		select: {
			title: true
		}
	});

	if (!findQuiz) {
		throw error(404, 'Quiz not found');
	}

	return {
		quiz: findQuiz!
	};
};

export const actions: Actions = {
	async create(evt) {
		const idQuiz = evt.params.id_quiz;
		const idKelas = evt.params.id;

		const user = evt.locals.webUser!;

		const body = Object.fromEntries(await evt.request.formData());
		const judul = body.title;

		const templateQuizes = await prismaClient.quiz.findUnique({
			where: {
				userId: user.id,
				id: +idQuiz
			},
			select: {
				id: true,
				entries: {
					select: {
						questionModel: true,
						scoreIncorrect: true,
						scoreCorrect: true
					}
				}
			}
		});

		if (!templateQuizes) {
			throw error(404, 'Quiz not found');
		}

		const newID = await prismaClient.$transaction(async (prisma) => {
			const { id } = await prisma.quiz.create({
				data: {
					title: judul as string,
					userId: user.id,
					fromTemplateId: +idQuiz,
					kelasId: +idKelas
				}
			});

			const withId = templateQuizes.entries.map((entry) => {
				return {
					...entry,
					quizId: id,
					questionModel: entry.questionModel as Prisma.InputJsonValue
				};
			});

			await prisma.quizEntry.createMany({
				data: withId
			});

			return id;
		});

		throw redirect(303, `/dashboard/guru/classes/${idKelas}/quiz/${newID}`);
	}
};
