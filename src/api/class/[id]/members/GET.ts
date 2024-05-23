import { Endpoint, error, z, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	id: z.number()
});

export const Output = z.object({
	members: z.array(
		z.object({
			name: z.string()
		})
	),
	error: z.boolean()
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Kelas'];
	r.summary = 'Member Kelas';
	r.description = 'Member Kelas dengan id kelas yang diberikan';
	return r;
};

export const Error = {
	404: error(404, 'Kelas tidak ditemukan')
};

// @ts-ignore
export default new Endpoint({ Output, Error, Modifier, Param }).handle(() => {
	return new Response();
});
