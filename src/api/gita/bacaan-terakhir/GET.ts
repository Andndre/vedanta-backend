import { Endpoint, z, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	babs: z.nullable(
		z.object({
			slokaNumber: z.number(),
			babNumber: z.number(),
			babTitle: z.string()
		})
	)
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Bacaan Terakhir';
	r.description = 'Dapatkan bacaan terakhir dalam bhagavad gita';
	return r;
};

// @ts-ignore
export default new Endpoint({ Output, Modifier }).handle(async () => {
	return new Response();
});
