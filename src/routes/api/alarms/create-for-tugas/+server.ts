import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';
import { connect } from 'http2';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		doaId: number;
		tugasId: number;
		ulangiDoa: number;
		jam: string;
	};

	console.log(body);

	const alarm = await prismaClient.alarmDoa.create({
		data: {
			userId: evt.locals.apiUser!.id,
			doaId: body.doaId,
			ulangiDoa: body.ulangiDoa,
			jam: body.jam,
			tugasId: body.tugasId
		}
	});

	return json({ alarm });
};
