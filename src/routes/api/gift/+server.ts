import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	console.log(evt.locals.apiUser!.id)
	const gifts = await prismaClient.gift.findMany({
		include: {
			userBuyGift: {
				where: {
					userId: evt.locals.apiUser!.id
				}
			}
		}
	});

	const normalized = gifts.map((gift) => {
		const withStatus = {
			...gift,
			status: gift.userBuyGift.length > 0 ? gift.userBuyGift[0].status : null
		};
		const { userBuyGift, ...rest } = withStatus;

		return rest;
	});

	return json({
		gifts: normalized
	});
};
