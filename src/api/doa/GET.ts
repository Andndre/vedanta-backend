// import { prismaClient } from '@/db.js';
// import { json } from '@sveltejs/kit';

// export const GET = async (evt) => {
// 	const doas = await prismaClient.doa.findMany({
// 		take: 10
// 	});
// 	return json({
// 		error: false,
// 		doas
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
			pelafalanFile: z.string({ description: 'Doa pelafalan file' }).nullable()
		})
	),
	error: z.boolean()
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Doa'];
	r.summary = 'Semua Doa (10 sampel)';
	r.description = 'Dapatkan doa pada user';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
