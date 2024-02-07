import type { Handler } from "express"
import { ChatService } from "@services"

export const index: Handler = (_req, res) => {
	res.send("Hello World!")
}
export const helloGPT: Handler = async (_req, res) => {
	const response = await ChatService.sendMessage("Hello")
	res.send(response)
}
