import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const { id } = evt.params;
	const kelas = await prismaClient.kelas.findUnique({
		where: {
			id: +id
		},
		select: {
			quizzes: {
				where: {
					isDraft: false
				},
				select: {
					title: true,
					dueDate: true,
					id: true,
					createdAt: true,
					userQuizResult: {
						where: {
							userId: evt.locals.apiUser?.id,
							completed: true
						},
						select: {
							id: true
						}
					}
				}
			},
			allHomeworkDoa: {
				select: {
					id: true,
					doa: {
						select: {
							title: true,
							id: true
						}
					},
					deadline: true
				}
			}
		}
	});
	return json(kelas);
};
