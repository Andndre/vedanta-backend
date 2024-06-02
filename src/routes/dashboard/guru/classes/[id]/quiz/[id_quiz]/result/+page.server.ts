import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const quiz = await prismaClient.quiz.findUnique({
		where: {
			id: +evt.params.id_quiz
		},
		select: {
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
							profilePicture: true
						}
					}
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
