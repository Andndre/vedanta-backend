import { prismaClient } from ".."
import { MessageHistory } from "../types"

export const listFromUser = (userId: string) => {
	return prismaClient.chatSession.findMany({
		where: {
			userId
		},
		select: {
			id: true,
			title: true
		}
	})
}

export const create = (userId: string) => {
	return prismaClient.chatSession.create({
    data: {
			title: Date.now().toString(),
			userId
    }
  })
}

export const saveHistory = (sessionId: string, messages: MessageHistory[]) => {
	return prismaClient.messageHistory.createMany({
    data: messages.map(message => ({
			sessionId,
			...message,
		})),
  })
}

export const findById = (sessionId: string) => {
	return prismaClient.chatSession.findFirst({
		where: {
			id: sessionId
		},
		include: {
			history: true,
		}
	})
}

export const getHistory = (sessionId: string) => {
	return prismaClient.messageHistory.findMany({
		where: {
			sessionId
		},
		orderBy: {
      id: "asc",
    },
	})
}

export default {
	listFromUser,
	saveHistory,
	create,
	findById,
	getHistory
}
