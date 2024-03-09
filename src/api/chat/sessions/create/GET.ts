import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	sessionId: z.string()
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Chat'];
	r.summary = 'Create Chat Session';
	r.description = 'Buat percakapan baru (dapatkan session id)';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
