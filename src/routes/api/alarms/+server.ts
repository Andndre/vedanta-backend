import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = (evt) => {
	const alarms = prismaClient.alarmDoa.findMany({
		where: {
			userId: evt.locals.apiUser!.id
		}
	});

	return json({
		alarms,
		error: false
	});
};
