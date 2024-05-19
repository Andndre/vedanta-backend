import { JWT_SECRET } from '$env/static/private';
import { getAuthUser } from '@/models/UserModel';
import { error } from '@/response';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const verifyJWT = (bearer: string) => {
	return jwt.verify(bearer, JWT_SECRET) as { email: string; id: string } | undefined;
};

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	if (
		pathname.startsWith('/api') &&
		!pathname.startsWith('/api/user') &&
		pathname !== '/api-json'
	) {
		const authorization = event.request.headers.get('Authorization');
		const bearer = authorization?.replace('Bearer ', '');
		if (!bearer) {
			return error(401, 'No Bearer token provided');
		}
		const payload = verifyJWT(bearer);
		if (!payload) {
			return error(401, 'Invalid token');
		}
		event.locals.apiUser = {
			...payload
		};
	} else {
		// Set the authenticated user in the event's locals
		event.locals.webUser = (await getAuthUser(event.cookies)) || null;
	}
	const response = await resolve(event);
	return response;
};
