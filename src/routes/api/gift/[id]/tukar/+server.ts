import { prismaClient } from '@/db';
import { error } from '@/response';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const gift = await prismaClient.gift.findUnique({
		where: {
			id: +evt.params.id
		},
		select: {
			prize: true
		}
	});

	const user = await prismaClient.user.findUnique({
		where: {
			id: evt.locals.apiUser!.id
		},
		select: {
			points: true
		}
	});

	if (!gift) {
		return error(404, 'Hadiah not found');
	}

	if (!user) {
		return error(404, 'User not found');
	}

	if (user.points < gift.prize) {
		return error(400, 'Insufficient points');
	}

	const pembelian = await prismaClient.userBuyGift.create({
		data: {
			userId: evt.locals.apiUser!.id,
			giftId: +evt.params.id,
			status: 'PENDING'
		}
	});

	return json({ pembelian });
};
