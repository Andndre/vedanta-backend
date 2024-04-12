import { one } from '@/models/SlokaModel';
import { Endpoint, z, type RouteModifier, error } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string(),
	sloka_number: z.string()
});

export const Output = z.object({
	id: z.number(),
	number: z.number(),
	numberBab: z.number(),
	content: z.string(),
	translationIndo: z.string(),
	makna: z.string().nullable()
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'One Sloka';
	r.description = 'Dapatkan satu sloka dari number bab dan number sloka yang diberikan';
	return r;
};

export const Error = {
	404: error(404, 'Sloka tidak ditemukan')
};

export default new Endpoint({ Output, Modifier, Param, Error }).handle(
	async ({ bab_number, sloka_number }) => {
		const sloka = await one(+bab_number, +sloka_number);
		if (!sloka) {
			throw Error[404];
		}
		return sloka;
	}
);
