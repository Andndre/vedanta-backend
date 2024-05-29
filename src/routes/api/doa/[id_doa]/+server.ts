import { prismaClient } from '@/db.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const doa = await prismaClient.doa.findUnique({
		where: {
			id: +evt.params.id_doa
		},
		select: {
			id: true,
			title: true,
			body: true,
			pelafalanFile: true,
			makna: true
		}
	});

	if (!doa) {
		return json({
			error: true,
			message: 'Doa not found'
		});
	}

	const withFullPelafalan = {
		...doa,
		pelafalanFile: `https://cdn.hmjtiundiksha.com/${doa.pelafalanFile}`,
		makna: doa.makna || ''
	};

	return json({
		doa: withFullPelafalan,
		error: false
	});
};
