import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	like: z.boolean()
});

export const Output = z.object({
	like: z.boolean(),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {
	409: error(409, 'User already exists')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Like Sloka';
	r.description = 'Atur status like dari sloka';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
