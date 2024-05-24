import { isExists, create } from '@/models/UserModel.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';
import type { z } from 'sveltekit-api';

export const POST = async (evt) => {
	const body = (await evt.request.json()) as {
		email: string;
		password: string;
		name: string;
	};
	if (await isExists(body.email)) {
		return error(409, 'User already exists');
	}
	const user = await create(body.email, body.password, body.name);
	return json({
		message: 'Successfully created user',
		error: false,
		user
	});
};
