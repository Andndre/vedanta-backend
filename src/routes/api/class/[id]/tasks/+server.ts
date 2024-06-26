import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
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
			// allHomeworkDoa: {
			// 	select: {
			// 		id: true,
			// 		doa: {
			// 			select: {
			// 				title: true,
			// 				id: true
			// 			}
			// 		},
			// 		deadline: true,
			// 		usersHomework: {
			// 			where: {
			// 				userId: evt.locals.apiUser?.id
			// 			},
			// 			select: {
			// 				id: true,
			// 				fileRecorded: true,
			// 				alarmDoa: {
			// 					select: {
			// 						id: true
			// 					}
			// 				},
			// 				homework: {
			// 					select: {
			// 						doaId: true
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			allHomeworkDoa: {
				select: {
					alarmDoas: {
						select: {
							id: true
						},
						where: {
							userId: evt.locals.apiUser?.id
						}
					},
					doa: {
						select: {
							id: true,
							title: true
						}
					},
					deadline: true,
					id: true,
					usersHomework: {
						where: {
							userId: evt.locals.apiUser?.id
						},
						select: {
							id: true
						}
					}
				}
			}
		}
	});

	if (!kelas) {
		return error(404, 'Kelas not found');
	}

	const homeworkNormalized = kelas.allHomeworkDoa.map((homework) => {
		return {
			id: homework.id,
			title: homework.doa.title,
			deadline: homework.deadline,
			completed: homework.usersHomework.length > 0,
			alarmDoa: homework.alarmDoas.length > 0,
			doaId: homework.doa.id
		};
	});

	const result = {
		...kelas,
		allHomeworkDoa: homeworkNormalized
	};

	return json(result);
};
