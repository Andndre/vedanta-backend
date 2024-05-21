import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({
	user: z.object({
		id: z.string({ description: 'ID pengguna yang mendaftar' }),
		email: z.string({ description: 'Email pengguna yang mendaftar' }),
		name: z.string({ description: 'Nama pengguna yang mendaftar' }),
		points: z.number({ description: 'Poin pengguna yang mendaftar' }),
		activeStreak: z.number({ description: 'Streak pengguna yang mendaftar' }),
		lastActiveAt: z.date({ description: 'Waktu terakhir aktifitas pengguna' }),
		isAdmin: z.boolean({ description: 'True jika admin' })
	}),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {
	401: error(401, 'Unauthorized')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['User'];
	r.summary = 'Info User';
	r.description = 'Mendaftarkan informasi pengguna';
	return r;
};

// @ts-ignore
export default new Endpoint({ Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
