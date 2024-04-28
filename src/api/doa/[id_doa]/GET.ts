// import { prismaClient } from '@/db.js';
// import { json } from '@sveltejs/kit';

// export const GET = async (evt) => {
// 	const doa = await prismaClient.doa.findUnique({
// 		where: {
// 			id: +evt.params.id_doa
// 		}
// 	});

// 	if (!doa) {
// 		return json({
// 			error: true,
// 			message: 'Doa not found'
// 		});
// 	}

// 	return json({
// 		doa,
// 		error: false
// 	});
// };

// id: number;
// title: string;
// body: string;
// pelafalanFile: string | null;

import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	doa: z.object({
		id: z.number({ description: 'Doa ID' }),
		title: z.string({ description: 'Doa title' }),
		body: z.string({ description: 'Doa body' }),
		pelafalanFile: z.string({ description: 'Doa pelafalan file' }).nullable()
	})
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Doa'];
	r.summary = 'Get One Doa';
	r.description = 'Dapatkan doa berdasarkan id';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
