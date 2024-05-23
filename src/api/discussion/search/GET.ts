import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	discussions: z.array(
		z.object({
			id: z.number({ description: 'ID Diskusi' }),
			title: z.string({ description: 'Judul diskusi' }),
			creatorName: z.string({ description: 'Nama pembuat diskusi' }),
			body: z.string({ description: 'Body diskusi' })
		})
	),
	error: z.boolean({ description: 'true if error' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Search Diskusi';
	r.description = 'Cari diskusi berdasarkan kata kunci';
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
