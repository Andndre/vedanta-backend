import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.webUser) {
		redirect(302, '/login');
	}

	return {
		user: locals.webUser
	};
};
