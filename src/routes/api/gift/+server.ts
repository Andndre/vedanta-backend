import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const gifts = await prismaClient.gift.findMany({});
	return json({
		gifts
	});
};
