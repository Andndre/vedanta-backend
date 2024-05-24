import { allInBab } from '@/models/SlokaModel.js';
import { error, json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const sloka = await allInBab(+evt.params.bab_number, evt.locals.apiUser!.id);
	if (!sloka) {
		throw error(404, 'sloka not found');
	}
	return json({ slokas: sloka });
};
