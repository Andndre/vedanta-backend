import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6, 'Password minimal terdiri dari 6 karakter')
});

export const Output = z.object({
	message: z.string({ description: 'Pesan dari output' }),
	user: z.object({
		id: z.string({ description: 'ID pengguna yang mendaftar' }),
		email: z.string({ description: 'Email pengguna yang mendaftar' }),
		name: z.string({ description: 'Nama pengguna yang mendaftar' })
	}),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {
	409: error(409, 'User already exists')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['User'];
	r.summary = 'Register User';
	r.description = 'Mendaftarkan user baru';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
