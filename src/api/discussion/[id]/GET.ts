import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	discussion: z.object({
		isLiked: z.boolean({ description: 'True if user liked' }),
		title: z.string({ description: 'Diskusi title' }),
		body: z.string({ description: 'Diskusi body' }),
		likesCount: z.number({ description: 'Diskusi likes count' }),
		repliesCount: z.number({ description: 'Diskusi replies count' }),
		creator: z.object({
			name: z.string({ description: 'User name' })
		}),
		createdAt: z.string({ description: 'Diskusi created at' }),
		replies: z.array(
			z.object({
				isLiked: z.boolean({ description: 'True if user liked' }),
				reply: z.string({ description: 'Diskusi reply' }),
				likesCount: z.number({ description: 'Diskusi reply likes count' }),
				createdAt: z.string({ description: 'Diskusi reply created at' }),
				creator: z.object({
					name: z.string({ description: 'User name' })
				}),
				id: z.number({ description: 'Diskusi reply ID' }),
				replies: z.array(
					z.object({
						id: z.number({ description: 'Diskusi reply ID' }),
						likesCount: z.number({ description: 'Diskusi reply likes count' }),
						reply: z.string({ description: 'Diskusi reply' }),
						createdAt: z.string({ description: 'Diskusi reply created at' }),
						creator: z.object({
							name: z.string({ description: 'User name' })
						})
					})
				)
			})
		)
	}),
	error: z.boolean()
});

export const Param = z.object({
	id: z.number()
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Informasi diskusi';
	r.description = 'Dapatkan informasi diskusi berdasarkan id';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error, Param }).handle(async () => {
	return new Response();
});
