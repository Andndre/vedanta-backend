import { Router } from "express";
import { ApiController } from '@controllers'
import BhagavadGitaRoutes from "@routes/BhagavadGitaRoutes";
import UserRoutes from "@routes/UserRoutes";

const router = Router({
	strict: true,
	caseSensitive: true,
})

router.get('/', ApiController.index)
router.use('/gita', BhagavadGitaRoutes)
router.use('/user', UserRoutes)

export default router
