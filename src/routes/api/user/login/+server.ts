import { findOne } from '@/models/UserModel.js';
import { Input, Output } from '$api/user/login/POST';
import { error } from '@/response.js';
import type { z } from 'sveltekit-api';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

type Body = z.infer<typeof Input>;
type Output = z.infer<typeof Output>;

export const POST = async (evt): Promise<Response> => {
	const body = Object.fromEntries(await evt.request.formData()) as Body;
	const user = await findOne(body.email);
	if (!user) {
		return error(400, 'Invalid credentials');
	}
	if (!(await bcrypt.compare(body.password, user.password))) {
		return error(400, 'Invalid credentials');
	}
	const token = jwt.sign(
		{
			id: user.id,
			email: user.email
		},
		JWT_SECRET,
		{
			expiresIn: '30d'
		}
	);
	return json({
		error: false,
		token
	} satisfies Output);
};
