import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	email: z.string().email(),
	password: z.string().min(6, 'Password minimal terdiri dari 6 karakter')
});

export const Output = z.object({
	token: z.string({ description: 'Akses token' }),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {
	400: error(400, 'Invalid credentials')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['User'];
	r.summary = 'Login';
	r.description = 'Login User';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	new Response();
});
