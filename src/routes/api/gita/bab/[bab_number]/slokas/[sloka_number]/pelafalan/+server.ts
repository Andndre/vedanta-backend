import { AudioAssetDownloader } from '@/models/SlokaModel.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	const { bab_number, sloka_number } = evt.params;
	const url = await AudioAssetDownloader.getPelafalanFromCDN(+bab_number, +sloka_number);
	throw redirect(302, url);
};
