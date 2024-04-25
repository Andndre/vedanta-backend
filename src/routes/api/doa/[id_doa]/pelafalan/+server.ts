import { prismaClient } from '@/db.js';
import { json, redirect } from '@sveltejs/kit';

export const GET = async (evt) => {
	const doa = await prismaClient.doa.findUnique({
		where: {
			id: +evt.params.id_doa
		}
	});

	if (!doa) {
		return json({
			error: true,
			message: 'Doa not found'
		});
	}

	return redirect(302, `${doa.pelafalanFile}`);
};
