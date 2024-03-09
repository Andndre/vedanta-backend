import { redirect } from '@sveltejs/kit'

export const GET = (_evt) => {
	redirect(302, '/docs');
}
