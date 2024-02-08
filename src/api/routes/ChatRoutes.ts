import { Router } from "express";
import { ChatController } from '@controllers'

const router = Router({
	strict: true,
	caseSensitive: true,
})

router.post('/', ChatController.chat)

export default router
