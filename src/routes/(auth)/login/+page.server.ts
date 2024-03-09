import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/custom/auth-layout/loginSchema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};
