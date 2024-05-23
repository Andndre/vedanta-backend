import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return json(
			{
				error: true,
				message: 'Unauthorized'
			},
			{
				status: 401
			}
		);
	}

	const findUser = (await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			bacaanSlokaTerakhir: {
				select: {
					number: true,
					bab: {
						select: {
							number: true,
							title: true
						}
					}
				}
			}
		}
	}))!;

	const bacaan = findUser.bacaanSlokaTerakhir
		? {
				slokaNumber: findUser.bacaanSlokaTerakhir.number,
				babNumber: findUser.bacaanSlokaTerakhir.bab.number,
				babTitle: findUser.bacaanSlokaTerakhir.bab.title
			}
		: null;

	return json({
		error: false,
		bacaan
	});
};
