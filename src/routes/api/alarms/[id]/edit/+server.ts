import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		ulangiDoa: number;
		jam: string;
		doaId: number;
	};
	try {
		await prismaClient.alarmDoa.update({
			where: {
				id: +evt.params.id,
				userId: evt.locals.apiUser!.id
			},
			data: {
				ulangiDoa: body.ulangiDoa,
				jam: body.jam,
				doaId: body.doaId
			}
		});
		return json({
			error: false,
			message: 'success'
		});
	} catch (err) {
		return error(500, 'Failed to update alarm: ' + err);
	}
};
