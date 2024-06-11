import { prismaClient } from '@/db.js';
import { deleteFile } from '@/services/CDNService.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	try {
		await prismaClient.userBuyGift.delete({
			where: {
				id: +evt.params.id
			}
		});
	} catch (e) {
		console.error(e);
	}

	throw redirect(302, '/dashboard/admin/hadiah');
};
