import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const permintaan = await prismaClient.userBuyGift.findMany({
		include: {
			gift: true,
			user: true
		}
	});

	return { permintaan };
};
