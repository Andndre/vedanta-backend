import { JWT_SECRET } from '$env/static/private';
import { securePath } from '$lib/utils';
import { getAuthUser } from '@/models/UserModel';
import { error } from '@/response';
import { redirect, type Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const verifyJWT = (bearer: string) => {
	return jwt.verify(bearer, JWT_SECRET) as { email: string; id: string } | undefined;
};

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	if (pathname.startsWith('/api')) {
		if (
			pathname !== '/api/user/register' &&
			pathname !== '/api/user/login' &&
			pathname !== '/api-json'
		) {
			const authorization = event.request.headers.get('Authorization');
			const bearer = authorization?.replace('Bearer ', '');
			if (!bearer) {
				return error(401, 'No Bearer token provided');
			}
			try {
				const payload = verifyJWT(bearer);
				if (!payload) {
					return error(401, 'Invalid token');
				}
				event.locals.apiUser = {
					...payload
				};
			} catch (err) {
				return error(401, 'Invalid token');
			}
		}
	} else {
		// Set the authenticated user in the event's locals
		event.locals.webUser = (await getAuthUser(event.cookies)) || null;

		if (!event.locals.webUser) {
			throw redirect(302, '/login?redirect=' + securePath(pathname));
		}
	}
	const response = await resolve(event);
	return response;
};
