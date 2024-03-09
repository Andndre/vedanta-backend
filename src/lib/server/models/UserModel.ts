import { prismaClient } from "@/db"
import bcrypt from 'bcryptjs'

export const create = async (email: string, password: string, name: string) => {
	return prismaClient.user.create({
		data: {
			email,
			password: await bcrypt.hash(password, 10),
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
