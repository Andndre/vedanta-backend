import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	return {
		id: evt.params.id
	};
};
