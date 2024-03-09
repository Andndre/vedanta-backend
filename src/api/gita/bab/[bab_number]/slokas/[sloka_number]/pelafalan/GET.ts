import SlokaModel from '@/models/SlokaModel';
import { redirect } from '@sveltejs/kit';
import { Endpoint, z, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string(),
	sloka_number: z.string()
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Sloka Pronounciation';
	r.description = 'Dapatkan file Mp3 pelafalan dari sloka';
	return r;
};

export default new Endpoint({ Modifier, Param }).handle(async ({ bab_number, sloka_number }) => {
	const path = SlokaModel.searchPelafalanFilePath(+bab_number, +sloka_number);
	throw redirect(303, path);
});
