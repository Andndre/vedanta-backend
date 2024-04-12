import { redirect } from '@sveltejs/kit'

export const GET = ({ locals }) => {
	if (locals.webUser) {
		redirect(32, '/dashboard');
	}
	redirect(302, '/docs');
};
