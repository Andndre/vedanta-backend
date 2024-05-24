import { prismaClient } from '@/db.js';
import { error } from '@/response.js';
import { json } from '@sveltejs/kit';
import { deleteFile, uploadFile } from '@/services/CDNService.js';

export const POST = async (evt) => {
	const user = evt.locals.apiUser!;
	if (!user) {
		return error(401, 'Unauthorized');
	}

	const prevData = await prismaClient.user.findUnique({
		where: {
			id: user.id
		},
		select: {
			profilePicture: true
		}
	});

	if (prevData?.profilePicture) {
		await deleteFile(prevData.profilePicture);
	}

	const body = await evt.request.formData();
	const file = body.get('fileToUpload') as Blob;

	const url = await uploadFile(file, 'vedanta/profile-picture');

	if (!url) {
		return error(500, "Couldn't upload profile picture. Please try again later.");
	}

	await prismaClient.user.update({
		where: {
			id: user.id
		},
		data: {
			profilePicture: url
		}
	});

	return json({
		error: false,
		message: 'Profile picture updated'
	});
};
