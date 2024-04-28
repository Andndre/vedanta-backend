// import { prismaClient } from '@/db.js';
// import { json } from '@sveltejs/kit';

// export const GET = async (evt) => {
// 	const searchQuery = evt.url.searchParams.get('q');
// 	if (!searchQuery) {
// 		return json({
// 			doas: [],
// 			error: false
// 		});
// 	}

// 	const doas = await prismaClient.doa.findMany({
// 		where: {
// 			title: {
// 				contains: searchQuery
// 			}
// 		},
// 		take: 10
// 	});

// 	const doasWithLiked = await Promise.all(
// 		doas.map(async (doa) => {
// 			const liked = await prismaClient.userLikedDoa.findFirst({
// 				where: {
// 					userId: evt.locals.apiUser!.id,
// 					doaId: doa.id
// 				}
// 			});
// 			return {
// 				...doa,
// 				liked: !!liked
// 			};
// 		})
// 	);

// 	return json({
// 		doas: doasWithLiked,
// 		error: false
// 	});
// };

// id: number;
// title: string;
// body: string;
// pelafalanFile: string | null;

import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	doas: z.array(
		z.object({
			id: z.number({ description: 'Doa ID' }),
			title: z.string({ description: 'Doa title' }),
			body: z.string({ description: 'Doa body' }),
			pelafalanFile: z.string({ description: 'Doa pelafalan file' }).nullable(),
			liked: z.boolean({ description: 'Doa liked' })
		})
	),
	error: z.boolean({ description: 'true if error' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Doa'];
	r.summary = 'Search Doa';
	r.description = 'Cari Doa Berdasarkan Kata Kunci';
	r.parameters = [
		{
			name: 'q',
			in: 'query',
			required: true,
			description: 'Kata kunci pencarian'
		}
	];
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
