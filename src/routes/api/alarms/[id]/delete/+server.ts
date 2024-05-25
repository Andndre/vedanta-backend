import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const DELETE = async (evt) => {
	const alarm = await prismaClient.alarmDoa.delete({
		where: {
			id: +evt.params.id,
			userId: evt.locals.apiUser!.id
		}
	});

	return json({
		error: false,
		message: 'success'
	});
};
