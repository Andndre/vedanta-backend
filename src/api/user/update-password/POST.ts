import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6, 'Password minimal terdiri dari 8 karakter'),
	newPassword: z.string().min(6, 'Password minimal terdiri dari 8 karakter'),
	newPasswordConfirm: z.string().min(6, 'Password minimal terdiri dari 8 karakter')
});

export const Output = z.object({
	message: z.boolean({ description: 'True jika error' })
});

export const Error = {
	500: error(500, 'Internal server error'),
	400: error(400, 'Invalid password')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['User'];
	r.summary = 'Change Password User';
	r.description = 'Mengubah password';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
