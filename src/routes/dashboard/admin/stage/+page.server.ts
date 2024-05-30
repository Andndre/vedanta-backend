import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (evt) => {
	const user = evt.locals.webUser!;

	const stages = await prismaClient.stage.findMany();

	return {
		stages
	};
};
