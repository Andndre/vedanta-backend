import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	id: z.string()
});

export const Output = z.object({
	response: z.string(),
	error: z.boolean()
});

export const Error = {
	500: error(500, 'Something went wrong'),
	404: error(404, 'Session not found')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Chat'];
	r.summary = 'Get Chat Title';
	r.description = 'Dapatkan informasi judul dari chat session dengan id tertentu';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error, Param }).handle(async () => {
	return new Response();
});
