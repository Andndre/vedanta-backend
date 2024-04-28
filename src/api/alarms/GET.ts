import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	alarms: z.array(
		z.object({
			id: z.number({ description: 'Alarm ID' }),
			ulangiDoa: z.number({
				description:
					'Ulangi Doa. 7 Bit biner: 0000000: tidak diulangi, 1001001: ulangi setiap hari hari senin, kamis, dan minggu'
			}),
			doaId: z.number({ description: 'Doa ID' }),
			userId: z.string({ description: 'User ID' }),
			active: z.boolean({ description: 'Alarm active' }),
			jam: z.date({ description: 'Alarm time' })
		})
	)
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Alarm'];
	r.summary = 'All Alarms';
	r.description = 'Dapatkan semua alarm pada User';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
