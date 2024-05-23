import bcrypt from 'bcryptjs';
import { prismaClient } from '@/db';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const POST = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		throw error(401, 'Unauthorized');
	}
	const body = (await evt.request.json()) as {
		username: string;
		email: string;
		password: string;
		newPassword: string;
		newPasswordConfirm: string;
	};
	const findUser = await prismaClient.user.findUnique({
		where: {
			email: user.email
		},
		select: {
			password: true
		}
	});
	const isSame = await bcrypt.compare(body.password, findUser!.password);
	if (!isSame) {
		throw error(400, 'Invalid password');
	}
	if (body.newPassword !== body.newPasswordConfirm) {
		throw error(400, 'Passwords do not match');
	}
	const hashed = await bcrypt.hash(body.newPassword, 10);
	try {
		await prismaClient.user.update({
			where: {
				email: user.email
			},
			data: {
				password: hashed
			}
		});
	} catch (err) {
		throw error(500, 'Failed to update password');
	}

	return json({
		message: 'Password updated successfully'
	});
};
