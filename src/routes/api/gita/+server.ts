import { allBab } from '@/models/BabModel.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const babs = await allBab();
	return json({ babs });
};
