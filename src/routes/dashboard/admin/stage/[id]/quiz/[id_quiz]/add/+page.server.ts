import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import type { Prisma } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import { uploadFile } from '@/services/CDNService';
import {
	CocokGambar,
	IsianSingkat,
	PilihanGanda,
	Quiz,
	QuizType,
	SimakAudio
} from '$lib/types/quiz';

export const load: PageServerLoad = async (evt) => {
	const type = evt.url.searchParams.get('type');

	return {
		type
	};
};

export const actions = {
	save: async (evt) => {
		const body = await evt.request.formData();
		const data = Object.fromEntries(body);
		if (data.correct == 'undefined') {
			console.log('correct answer is required');
			return fail(400, {
				message: 'Correct answer is required'
			});
		}
		let quiz: Quiz = new Quiz(data.title as string, QuizType.IsianSingkat);
		switch (data.type) {
			case 'isian':
				quiz = new IsianSingkat(data.title as string, data.correct as string);
			case 'pilgan':
				quiz = new PilihanGanda(
					data.title as string,
					data.correct as string,
					data.optionOne as string,
					data.optionTwo as string,
					data.optionThree as string,
					data.optionFour as string
				);
				break;
			case 'simakaudio':
				const file = body.get('audio') as Blob;
				const url = await uploadFile(file, 'vedanta/quiz/simak-audio');
				if (!url) {
					console.log('Failed to upload audio');
					return fail(500, {
						message: 'Failed to upload audio'
					});
				}
				quiz = new SimakAudio(
					data.title as string,
					data.correct as string,
					url,
					data.optionOne as string,
					data.optionTwo as string,
					data.optionThree as string,
					data.optionFour as string
				);
				break;
			case 'cocokgambar':
				const opsiPertama = body.get('optionOne') as Blob;
				const opsiKedua = body.get('optionTwo') as Blob;
				const opsiKetiga = body.get('optionThree') as Blob;
				const opsiKeempat = body.get('optionFour') as Blob;
				const urlPertama = await uploadFile(opsiPertama, 'vedanta/quiz/cocok-gambar');
				const urlKedua = await uploadFile(opsiKedua, 'vedanta/quiz/cocok-gambar');
				const urlKetiga = await uploadFile(opsiKetiga, 'vedanta/quiz/cocok-gambar');
				const urlKeempat = await uploadFile(opsiKeempat, 'vedanta/quiz/cocok-gambar');
				if (!urlPertama || !urlKedua || !urlKetiga || !urlKeempat) {
					console.log('Failed to upload image');
					return fail(500, {
						message: 'Failed to upload image'
					});
				}
				quiz = new CocokGambar(
					data.title as string,
					data.correct as string,
					urlPertama,
					urlKedua,
					urlKetiga,
					urlKeempat
				);
				break;
		}
		const object = JSON.parse(JSON.stringify(quiz));
		await prismaClient.quizEntry.create({
			data: {
				questionModel: object as Prisma.JsonObject,
				scoreCorrect: 5,
				quizId: +evt.params.id_quiz
			}
		});

		throw redirect(303, `/dashboard/admin/stage/${evt.params.id}/quiz/${evt.params.id_quiz}`);
	}
};
