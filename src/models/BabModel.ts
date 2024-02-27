import { prismaClient } from "..";

const allBab = () => {
	return prismaClient.gitaBab.findMany();
};

const one = (bab_number: number) => {
	return prismaClient.gitaBab.findFirst({
		where: { number: bab_number },
	});
};

export default {
	allBab,
	one
}
