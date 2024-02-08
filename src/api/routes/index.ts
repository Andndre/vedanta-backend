import { Router } from "express";
import BhagavadGitaRoutes from "@routes/BhagavadGitaRoutes";
import UserRoutes from "@routes/UserRoutes";
import ChatRoutes from "@routes/ChatRoutes";
import { ApiController } from "@controllers";

const router = Router({
	strict: true,
	caseSensitive: true,
})

router.get('/', ApiController.index)
router.use('/gita', BhagavadGitaRoutes)
router.use('/user', UserRoutes)
router.use('/chat', ChatRoutes)

export default router
