import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prismaClient } from '@/db';
import { uploadFile } from '@/services/CDNService';

export const load: PageServerLoad = async (evt) => {
	const user = evt.locals.webUser;

	if (!user) {
		throw redirect(302, '/login');
	}

	const findUser = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			name: true,
			email: true,
			profilePicture: true
		}
	});

	return { user: findUser! };
};

export const actions: Actions = {
	save: async (evt) => {
		const data = await evt.request.formData();
		const name = data.get('name') as string;

		await prismaClient.user.update({
			where: {
				id: evt.locals.webUser!.id
			},
			data: {
				name
			}
		});

		throw redirect(302, '/settings/profile');
	},

	saveProfilePicture: async (evt) => {
		const data = await evt.request.formData();
		const profilePicture = data.get('profilePicture') as Blob;

		const url = await uploadFile(profilePicture, 'vedanta/profile-picture');

		if (!url) {
			throw redirect(302, '/settings/profile');
		}

		await prismaClient.user.update({
			where: {
				id: evt.locals.webUser!.id
			},
			data: {
				profilePicture: url
			}
		});

		throw redirect(302, '/settings/profile');
	}
};
