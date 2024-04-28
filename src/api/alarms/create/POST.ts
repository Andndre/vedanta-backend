import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	alarmCreated: z.object({
		id: z.number({ description: 'Alarm ID' }),
		ulangiDoa: z.number({
			description:
				'Ulangi Doa. 7 Bit biner: 0000000: tidak diulangi, 0000001: ulangi setiap hari hari senin, kamis, dan minggu'
		}),
		doaId: z.number({ description: 'Doa ID' }),
		userId: z.string({ description: 'User ID' }),
		active: z.boolean({ description: 'Alarm active' }),
		jam: z.date({ description: 'Alarm time' })
	})
});

export const Input = z.object({
	doaId: z.number({ description: 'Doa ID' }),
	ulangiDoa: z.number({
		description:
			'Ulangi Doa. 7 Bit biner: 0000000: tidak diulangi, 1001001: ulangi setiap hari hari senin, kamis, dan minggu'
	}),
	jam: z.date({ description: 'Alarm time' }),
	label: z.string({ description: 'Alarm label' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Alarm'];
	r.summary = 'Create Alarm';
	r.description = 'Dapatkan semua session pada User';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error, Input }).handle(async () => {
	return new Response();
});
