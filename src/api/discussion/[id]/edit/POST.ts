import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	title: z.string(),
	body: z.string()
});

export const Param = z.object({
	id: z.number()
});

export const Output = z.object({
	message: z.string({ description: 'Pesan respons' }),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Edit Discussion';
	r.description = 'Mengedit diskusi berdasarkan id';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier, Param }).handle(async (body) => {
	return new Response();
});
