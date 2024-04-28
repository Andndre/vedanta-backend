import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const alarms = await prismaClient.alarmDoa.findMany({
		where: {
			userId: evt.locals.apiUser!.id
		}
	});

	return json({
		alarms,
		error: false
	});
};
