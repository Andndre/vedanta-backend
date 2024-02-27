import { prismaClient } from ".."

export const create = async (email: string, password: string, name: string) => {
	return prismaClient.user.create({
		data: {
			email,
			password: await Bun.password.hash(password),
			name,
		}
	})
}

export const isExists = async (email: string) => {
	const user = await prismaClient.user.findFirst({
		where: {
			email,
		},
		select: {
			id: true
		}
	});
	return !!user;
}

export const findOne = async (email: string) => {
	const user = await prismaClient.user.findFirst({
		where: {
			email,
		},
	});
	return user;
}

export default {
	create,
	isExists,
	findOne
}
