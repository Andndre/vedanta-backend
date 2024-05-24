import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const { like } = await evt.request.json();

	const doa = await prismaClient.doa.findUnique({
		where: {
			id: +evt.params.id_doa
		}
	});

	if (!doa) {
		return error(404, 'Doa not found');
	}

	try {
		if (like) {
			await prismaClient.userLikedDoa.create({
				data: {
					doaId: doa.id,
					userId: evt.locals.apiUser!.id
				}
			});
			return json({
				error: false,
				message: 'Doa liked'
			});
		} else {
			await prismaClient.userLikedDoa.delete({
				where: {
					likedDoa: {
						doaId: doa.id,
						userId: evt.locals.apiUser!.id
					}
				}
			});
			return json({
				error: false,
				message: 'Doa disliked'
			});
		}
	} catch (err) {
		return json({
			error: false,
			message: 'skip'
		});
	}
};
