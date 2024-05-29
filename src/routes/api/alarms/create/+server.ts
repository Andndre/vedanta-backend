import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		doaId: number;
		ulangiDoa: number;
		jam: string;
	};

	const alarm = await prismaClient.alarmDoa.create({
		data: {
			userId: evt.locals.apiUser!.id,
			doaId: body.doaId,
			ulangiDoa: body.ulangiDoa,
			jam: body.jam
		}
	});

	return json({
		alarm,
		error: false
	});
};
