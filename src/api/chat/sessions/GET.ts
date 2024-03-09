import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	text: z.string({ description: 'response message' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Chat'];
	r.summary = 'Sessions';
	r.description = 'Dapatkan semua session pada User';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error }).handle(async () => {
	return new Response();
});
