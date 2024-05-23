import { one } from '@/models/SlokaModel.js';
import { error, json } from '@sveltejs/kit';
import { prismaClient } from '@/db.js';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		throw error(401, 'Unauthorized');
	}
	const sloka = await one(+evt.params.bab_number, +evt.params.sloka_number, user.id);
	if (!sloka) {
		throw error(404, 'sloka not found');
	}
	await prismaClient.user.update({
		where: {
			id: user.id
		},
		data: {
			bacaanSlokaTerakhirId: sloka.id
		}
	});

	return json(sloka);
};
