import { prismaClient } from '@/db.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	await prismaClient.userBuyGift.update({
		where: {
			id: +evt.params.id
		},
		data: {
			status: 'SUCCESS'
		}
	});

	throw redirect(302, '/dashboard/admin/hadiah');
};
