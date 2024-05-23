import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	message: z.string({ description: 'Pesan respons' }),
	error: z.boolean()
});

export const Param = z.object({
	id: z.number()
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Diskusi'];
	r.summary = 'Delete Discussion';
	r.description = 'Hapus diskusi berdasarkan id';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error, Param }).handle(async () => {
	return new Response();
});
