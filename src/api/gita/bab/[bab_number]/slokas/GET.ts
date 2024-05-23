import { Endpoint, z, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string()
});

export const Output = z.object({
	slokas: z.array(
		z.object({
			number: z.number(),
			id: z.number(),
			translationIndo: z.string(),
			content: z.string(),
			isLiked: z.boolean()
		})
	)
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'All Sloka in BAB';
	r.description = 'Dapatkan semua sloka dari number bab yang diberikan';
	return r;
};

// @ts-ignore
export default new Endpoint({ Output, Error, Modifier, Param }).handle(async (body) => {
	return new Response();
});
