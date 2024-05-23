import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	classCode: z.string({ description: 'Kode kelas' })
});

export const Output = z.object({
	message: z.string({ description: 'Pesan respons' }),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {
	400: error(400, 'Invalid credentials')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Kelas'];
	r.summary = 'Join Kelas';
	r.description = 'Join Kelas menggunakan kode kelas';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	new Response();
});
