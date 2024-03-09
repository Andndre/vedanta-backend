import { JWT_SECRET } from '$env/static/private';
import { error } from '@/response';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const API_EXCEPTIONS = ['/api/docs', '/api/user', '/api-json'];

function isAPIException(pathname: string) {
	return API_EXCEPTIONS.some((exception) => pathname.startsWith(exception));
}

const verifyJWT = (bearer: string) => {
	return jwt.verify(bearer, JWT_SECRET);
};

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	if (pathname.startsWith('/api') && !isAPIException(pathname)) {
		const authorization = event.request.headers.get('Authorization');
		const bearer = authorization?.replace('Bearer ', '');
		if (!bearer) {
			return error(401, 'No Bearer token provided');
		}
		const payload = verifyJWT(bearer) as { email: string; id: string } | undefined;
		if (!payload) {
			return error(401, 'Invalid token');
		}
		event.locals.apiUser = {
			...payload
		};
	} else if (pathname.startsWith('/admin')) {
		// TODO: do something (middleware)
	}
	const response = await resolve(event);
	return response;
};
