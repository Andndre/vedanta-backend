import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = Object.fromEntries(await evt.request.formData()) as { doaId: number, ulangiDoa: number, jam: Date, label: string };

	const alarm = await prismaClient.alarmDoa.create({
		data: {
			userId: evt.locals.apiUser!.id,
			doaId: body.doaId,
			ulangiDoa: body.ulangiDoa,
			jam: body.jam,
			label: body.label
		}
	});
	return json({
		alarmCreated: alarm,
		error: false
	});
};
