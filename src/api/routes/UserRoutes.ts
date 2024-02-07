import { Router } from "express";
import { UserController } from '@controllers'

const router = Router({
	strict: true,
	caseSensitive: true,
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post("/refreshToken", UserController.refreshToken)

export default router
