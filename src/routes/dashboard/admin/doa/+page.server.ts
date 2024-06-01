import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const doas = await prismaClient.doa.findMany({});

	return { doas };
};
