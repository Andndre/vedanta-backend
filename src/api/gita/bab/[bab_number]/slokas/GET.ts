import SlokaModel from '@/models/SlokaModel';
import { Endpoint, z, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string()
});

export const Output = z.object({
	slokas: z.array(
		z.object({
			number: z.number(),
			id: z.number(),
			translationIndo: z.string(),
			content: z.string()
		})
	)
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'All Sloka in BAB';
	r.description = 'Dapatkan semua sloka dari number bab yang diberikan';
	return r;
};

export default new Endpoint({ Output, Modifier, Param }).handle(async ({ bab_number }) => {
	return { slokas: await SlokaModel.allInBab(+bab_number) };
});
