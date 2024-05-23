import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	title: z.string(),
	body: z.string()
});

export const Output = z.object({
	message: z.string({ description: 'Pesan respons' }),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Create Discussion';
	r.description = 'Membuat diskusi baru';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
