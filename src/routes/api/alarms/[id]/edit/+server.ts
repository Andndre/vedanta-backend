import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const body = await evt.request.json();
	try {
		await prismaClient.alarmDoa.update({
			where: {
				id: +evt.params.id
			},
			data: {
				ulangiDoa: body.ulangiDoa,
				jam: new Date(body.jam),
				label: body.label
			}
		});
		return json({
			error: false,
			message: 'success'
		});
	} catch (error) {
		return json({
			error: true,
			message: error
		});
	}
};
