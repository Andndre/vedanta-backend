import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (evt) => {
	const webUser = evt.locals.webUser;

	if (!webUser) {
		throw redirect(302, '/login');
	}

	return {};
};
