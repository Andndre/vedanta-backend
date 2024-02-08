import { ChatService } from "@services";
import type { Handler } from "express";

export const chat: Handler = async (req, res) => {
	const chatMessage = req.body['message'] as string;
	const result = await ChatService.sendMessage(chatMessage)
	if (result.text === 'Terjadi kesalahan. silahakan coba lagi.') {
		res.status(500).json({
			text: result.text,
			error: true
		})
	}
	res.json({ text: result.text, error: false })
}
