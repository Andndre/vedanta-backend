import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Output = z.object({});

export const Error = {
	404: error(404, 'Profile picture not found'),
	401: error(401, 'Unauthorized')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['User'];
	r.summary = 'Profile Picture User';
	r.description = 'Mendapatkan file gambar profil';
	return r;
};

// @ts-ignore
export default new Endpoint({ Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
