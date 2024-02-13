import { Router } from "express";
import { ChatController } from '@controllers'
import { TokenMiddleware } from "@middlewares";

const router = Router({
  strict: true,
  caseSensitive: true,
})

router.use(TokenMiddleware)

router.post('/', ChatController.chat)

export default router
