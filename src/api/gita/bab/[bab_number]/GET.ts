import { one } from '@/models/BabModel';
import { Endpoint, error, z, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string()
});

export const Output = z.object({
	number: z.number(),
	title: z.string(),
	titleHindi: z.string(),
	summary: z.string(),
	translationIndo: z.string()
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Find One';
	r.description = 'Dapatkan satu bab dari number bab yang diberikan';
	return r;
};

export const Error = {
	404: error(404, 'Bab tidak ditemukan')
};

export default new Endpoint({ Output, Error, Modifier, Param }).handle(async ({ bab_number }) => {
	const bab = await one(+bab_number);
	if (!bab) {
		throw Error[404];
	}
	return bab;
});
