import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import type { Prisma } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import { uploadFile } from '@/services/CDNService';

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
		let quiz: any;
		switch (data.type) {
			case 'isian':
				quiz = {
					title: data.title as string,
					correct: data.correct as string,
					type: 'isian'
				};
				break;
			case 'pilgan':
				quiz = {
					title: data.title as string,
					correct: data.correct as string,
					optionOne: data.optionOne as string,
					optionTwo: data.optionTwo as string,
					optionThree: data.optionThree as string,
					optionFour: data.optionFour as string,
					type: 'pilgan'
				};
				break;
			case 'simakaudio':
				const file = body.get('audio') as Blob;
				const url = await uploadFile(file, 'vedanta/quiz/simak-audio');
				if (!url) {
					console.log('failed to upload audio');
					return fail(500, {
						message: 'Failed to upload audio'
					});
				}
				quiz = {
					title: data.title as string,
					audio: url,
					correct: data.correct as string,
					optionOne: data.optionOne as string,
					optionTwo: data.optionTwo as string,
					optionThree: data.optionThree as string,
					optionFour: data.optionFour as string,
					type: 'simakaudio'
				};
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
					console.log('failed to upload image');
					return fail(500, {
						message: 'Failed to upload image'
					});
				}
				quiz = {
					title: data.title as string,
					correct: data.correct as string,
					optionOne: urlPertama,
					optionTwo: urlKedua,
					optionThree: urlKetiga,
					optionFour: urlKeempat,
					type: 'cocokgambar'
				};
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
