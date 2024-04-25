import { prismaClient } from '@/db.js';

export const POST = async (evt) => {
	const body = await evt.request.json();

	const alarm = await prismaClient.alarmDoa.update({
		where: {
			id: body.id
		},
		data: {
			ulangiDoa: body.ulangiDoa,
			jam: body.jam
		}
	});
	return new Response();
};
