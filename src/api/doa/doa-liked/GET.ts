// import { prismaClient } from '@/db.js';
// import { json } from '@sveltejs/kit';

// export const GET = async (evt) => {
// 	const doas = await prismaClient.userLikedDoa.findMany({
// 		where: {
// 			userId: evt.locals.apiUser!.id
// 		},
// 		select: {
// 			doa: {
// 				select: {
// 					id: true,
// 					title: true
// 				}
// 			}
// 		}
// 	});

// 	return json({
// 		doas,
// 		error: false
// 	});
// };

import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	doas: z.array(
		z.object({
			id: z.number({ description: 'Doa ID' }),
			title: z.string({ description: 'Doa title' })
		})
	)
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Doa'];
	r.summary = 'Get All Liked Doa';
	r.description = 'Dapatkan semua doa yang disukai oleh user';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
