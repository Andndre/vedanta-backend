import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	discussions: z.array(
		z.object({
			id: z.number({ description: 'ID Diskusi' }),
			title: z.string({ description: 'Diskusi title' }),
			creator: z.object({
				name: z.string({ description: 'User name' })
			}),
			createdAt: z.string({ description: 'Diskusi created at' }),
			isLiked: z.boolean({ description: 'True if user liked' })
		})
	),
	error: z.boolean()
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Diskusi terbaru';
	r.description = 'Dapatkan diskusi terbaru';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
