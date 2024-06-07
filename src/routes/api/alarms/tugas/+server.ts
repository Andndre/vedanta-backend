import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const alarms = await prismaClient.alarmDoa.findMany({
		where: {
			userId: evt.locals.apiUser!.id,
			tugasId: {
				not: null
			}
		},
		select: {
			jam: true,
			active: true,
			id: true,
			ulangiDoa: true,
			doa: {
				select: {
					title: true,
					id: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const withTitle = alarms.map((a) => ({
		...a,
		title: a.doa!.title,
		doaId: a.doa!.id
	}));

	const response = withTitle.map((a) => {
		const { doa, ...rest } = a;
		return rest;
	});

	return json({
		alarms: response,
		error: false
	});
};
