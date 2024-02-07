import { Router, type NextFunction, type Handler } from "express";
import BhagavadGitaRoutes from "@routes/BhagavadGitaRoutes";
import UserRoutes from "@routes/UserRoutes";
import { ApiController } from "@controllers";

const router = Router({
	strict: true,
	caseSensitive: true,
})

router.get('/', ApiController.index)
router.use('/gita', BhagavadGitaRoutes)
router.use('/user', UserRoutes)

export default router
