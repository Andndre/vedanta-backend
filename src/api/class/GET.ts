import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	classes: z.array(
		z.object({
			id: z.number({ description: 'Kelas ID' }),
			className: z.string({ description: 'Nama kelas' }),
			teacherName: z.string({ description: 'Nama guru' })
		})
	),
	error: z.boolean()
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Kelas'];
	r.summary = 'Semua Kelas';
	r.description = 'Dapatkan semua kelas pada user';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
