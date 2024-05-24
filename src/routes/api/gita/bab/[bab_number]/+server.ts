import { one } from '@/models/BabModel.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const { bab_number } = evt.params;
	const bab = await one(+bab_number);
	if (!bab) {
		throw error(404, 'bab not found');
	}
	// cache
	evt.setHeaders({
		'Cache-Control': 'public, max-age=86400, s-maxage=86400' // 1 day
	});
	return json({ bab });
};
