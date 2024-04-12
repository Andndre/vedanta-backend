import { prismaClient } from "@/db";

export const allBab = () => {
	return prismaClient.gitaBab.findMany();
};

export const one = (bab_number: number) => {
	return prismaClient.gitaBab.findFirst({
		where: { number: bab_number }
	});
};
