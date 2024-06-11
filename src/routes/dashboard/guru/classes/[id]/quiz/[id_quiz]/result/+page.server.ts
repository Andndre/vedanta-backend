import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz,
			kelasId: +evt.params.id
		},
		select: {
			kelas: {
				select: {
					id: true
				}
			},
			userQuizResult: {
				select: {
					correctCount: true,
					quiz: {
						select: {
							title: true,
							entries: {
								select: {
									id: true
								}
							}
						}
					},
					user: {
						select: {
							name: true,
							profilePicture: true,
							id: true
						}
					}
				}
			},
			title: true,
			id: true
		}
	});

	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	if (quiz.kelas == null) {
		throw error(404, 'Quiz not found');
	}

	const withGrade = quiz.userQuizResult.map((result) => {
		const correctCount = result.correctCount;
		const totalQuestion = result.quiz.entries.length;
		const grade = Math.round((correctCount / totalQuestion) * 100);
		return {
			...result,
			grade
		};
	});

	const quizWithGrade = {
		...quiz,
		userQuizResult: withGrade
	};

	return {
		quiz: quizWithGrade
	};
};
