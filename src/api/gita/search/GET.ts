import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	gitas: z.array(
		z.object({
			id: z.number({ description: 'Doa ID' }),
			number: z.number({ description: 'Sloka number' }),
			numberBab: z.number({ description: 'Bab number' }),
			content: z.string({ description: 'Sloka content' }),
			translationIndo: z.string({ description: 'Translation' })
		})
	),
	error: z.boolean({ description: 'true if error' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Search Sloka';
	r.description = 'Cari sloka berdasarkan kata kunci';
	r.parameters = [
		{
			name: 'q',
			in: 'query',
			description: 'Kata kunci pencarian',
			required: true,
			schema: {
				type: 'string'
			}
		}
	];
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
