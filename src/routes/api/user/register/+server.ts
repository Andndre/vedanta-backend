import { Input, Output } from '$api/user/register/POST';
import UserModel from '@/models/UserModel.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';
import type { z } from 'sveltekit-api';

type Body = z.infer<typeof Input>;
type Output = z.infer<typeof Output>;

export const POST = async (evt) => {
	const body = (await evt.request.json()) as Body;
	if (await UserModel.isExists(body.email)) {
		return error(409, 'User already exists');
	}
	const user = await UserModel.create(body.email, body.password, body.name);
	return json({
		message: 'Successfully created user',
		error: false,
		user
	} satisfies Output);
};
