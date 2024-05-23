import { Endpoint, z, type RouteModifier, error } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string(),
	sloka_number: z.string()
});

export const Output = z.object({
	id: z.number(),
	number: z.number(),
	numberBab: z.number(),
	content: z.string(),
	translationIndo: z.string(),
	makna: z.string(),
	isLiked: z.boolean()
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'One Sloka';
	r.description = 'Dapatkan satu sloka dari number bab dan number sloka yang diberikan';
	return r;
};

export const Error = {
	404: error(404, 'Sloka tidak ditemukan')
};

// @ts-ignore
export default new Endpoint({ Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
