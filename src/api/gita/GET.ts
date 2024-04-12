import { allBab } from '@/models/BabModel';
import { Endpoint, z, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	babs: z.array(
		z.object({
			number: z.number(),
			title: z.string(),
			titleHindi: z.string(),
			summary: z.string(),
			translationIndo: z.string()
		})
	)
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Find All';
	r.description = 'Dapatkan semua bab dalam bhagavad gita';
	return r;
};

export default new Endpoint({ Output, Modifier }).handle(async () => {
	const babs = await allBab();
	return { babs };
});
