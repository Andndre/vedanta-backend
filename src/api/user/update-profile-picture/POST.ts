import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	fileToUpload: z.string({
		description: 'File yang ingin diupload, input type file bukan string'
	})
});

export const Output = z.object({
	message: z.boolean({ description: 'Pesan respons' }),
	error: z.boolean({ description: 'True jika error' })
});

export const Error = {
	500: error(500, 'Internal server error')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['User'];
	r.summary = 'Update Profile Picture';
	r.description = 'Mengubah gambar profil';
	return r;
};

// @ts-ignore
export default new Endpoint({ Input, Output, Error, Modifier }).handle(async (body) => {
	return new Response();
});
