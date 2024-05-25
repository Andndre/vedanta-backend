import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const user = evt.locals.webUser!;

	return {
		user
	};
};
