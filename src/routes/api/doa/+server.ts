import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const doas = await prismaClient.doa.findMany({
		take: 10
	});
	return json({
		error: false,
		doas
	});
};
