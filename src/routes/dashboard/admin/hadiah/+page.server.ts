import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const gifts = await prismaClient.gift.findMany({});
	const penukaran = await prismaClient.userBuyGift.findMany({
		select: {
			id: true
		},
		where: {
			status: 'PENDING'
		}
	});

	const anyPenukaran = penukaran.length > 0;

	return { gifts, anyPenukaran };
};
