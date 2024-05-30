import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const stage = await prismaClient.stage.findMany({
		select: {
			id: true,
			title: true,
			description: true
		}
	});

	if (!stage) {
		return error(404, 'Stage not found');
	}

	return json({
		stage,
		error: false
	});
};
