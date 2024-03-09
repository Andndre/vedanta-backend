import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	id: z.string()
});

export const Input = z.object({
	message: z.string()
});

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	response: z.string({ description: 'response message' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Chat'];
	r.summary = 'Send Message';
	r.description =
		'Kirim pesan ke session yang diberikan dan dapatkan respon dari lanjutan percakapan sebelumnya pada session tersebut';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error, Input, Param }).handle(async () => {
	return new Response();
});
