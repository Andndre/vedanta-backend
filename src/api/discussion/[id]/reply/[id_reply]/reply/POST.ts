import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	reply: z.string()
});

export const Param = z.object({
	id: z.number(),
	id_reply: z.number()
});

export const Output = z.object({
	message: z.string({ description: 'Pesan respons' }),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Balas Balasan dalam Discussion';
	r.description = 'Memberikan balasan diskusi berdasarkan id';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier, Param }).handle(async (body) => {
	return new Response();
});
