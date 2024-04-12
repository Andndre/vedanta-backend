import { redirect } from '@sveltejs/kit';

export const GET = ({ cookies }) => {
	cookies.delete('session', {
		path: '/'
	});
	cookies.delete('refresh_session', {
		path: '/'
	});
	redirect(302, '/login');
};
