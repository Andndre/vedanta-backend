import { prismaClient } from '@/db';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const alarm = await prismaClient.alarmDoa.findUnique({
		where: {
			id: +evt.params.id
		}
	});
	return json(alarm);
};
