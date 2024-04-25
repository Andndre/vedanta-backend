import { getCreatedQuizzes } from '@/models/UserModel';
import type { PageServerLoad } from './$types';
import { prismaClient } from '@/db';
import { error } from '@sveltejs/kit';
import TimeAgo from 'javascript-time-ago';
import idID from 'javascript-time-ago/locale/id';

TimeAgo.addDefaultLocale(idID);

type Library = {
	id: number;
	title: string;
	createdAt: Date;
	type: 'QUIZ' | 'DOA';
};

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.webUser!;

	const userFind = await prismaClient.user.findUnique({
		where: {
			email: user.email
		},
		select: {
			quizzesCreated: {
				where: {
					kelasId: null
				},
				select: {
					id: true,
					title: true,
					createdAt: true
				}
			}
		}
	});

	if (!userFind) {
		error(404, 'User not found');
	}

	const timeAgo = new TimeAgo('id-ID');

	const quizzes = userFind.quizzesCreated.map((e) => ({
		...e,
		type: 'QUIZ',
		createdAt: timeAgo.format(e.createdAt)
	}));

	return {
		quizzes
	};
};
