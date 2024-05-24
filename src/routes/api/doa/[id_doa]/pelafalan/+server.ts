import { prismaClient } from '@/db.js';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	const { id_doa } = evt.params;
	const findDoa = await prismaClient.doa.findUnique({
		where: {
			id: +id_doa
		},
		select: {
			pelafalanFile: true
		}
	});
	if (!findDoa) {
		throw error(404, 'Doa not found');
	}
	throw redirect(302, `https://cdn.hmjtiundiksha.com/${findDoa.pelafalanFile}`);
};
