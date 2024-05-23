import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		return json({
			error: true,
			message: 'Unauthorized'
		});
	}

	const body = (await evt.request.json()) as { like: boolean };

	const like = body.like;

	const sloka = await prismaClient.gitaSloka.findUnique({
		where: {
			number_numberBab: {
				numberBab: Number(evt.params.bab_number),
				number: Number(evt.params.sloka_number)
			}
		}
	});

	if (!sloka) {
		return json({
			error: true,
			message: 'Sloka not found'
		});
	}

	if (like) {
		try {
			await prismaClient.userLikedGitaSloka.create({
				data: {
					slokaId: sloka.id,
					userId: user.id
				}
			});
		} catch (error) {
			console.log(error);
			console.log('already liked that sloka');
		}
	} else {
		try {
			await prismaClient.userLikedGitaSloka.delete({
				where: {
					likedSloka: {
						slokaId: sloka.id,
						userId: user.id
					}
				}
			});
		} catch (error) {
			console.log('already unliked that sloka');
		}
	}

	return json({
		error: false,
		like
	});
};
