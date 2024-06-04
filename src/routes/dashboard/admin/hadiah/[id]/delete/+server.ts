import { prismaClient } from '@/db.js';
import { deleteFile } from '@/services/CDNService.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	try {
		const deleted = await prismaClient.gift.delete({
			where: {
				id: +evt.params.id
			}
		});

		if (deleted) {
			await deleteFile(deleted.thumbnail);
		}
	} catch (e) {
		console.error(e);
	}

	throw redirect(302, '/dashboard/admin/hadiah');
};
