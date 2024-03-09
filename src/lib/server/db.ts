import { PrismaClient } from '@prisma/client';

/**
 * Creates and returns a singleton instance of PrismaClient.
 *
 * @return {PrismaClient} a new instance of PrismaClient
 */
const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prismaClient = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismaClient;
