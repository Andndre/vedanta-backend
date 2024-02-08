import { Router } from "express";
import { BhagavadGitaController } from '@controllers'
import { TokenMiddleware } from "@middlewares";

const router = Router({
	strict: true,
	caseSensitive: true,
})

router.use(TokenMiddleware)

router.get('/', BhagavadGitaController.chapters)
router.get('/bab/:bab', BhagavadGitaController.chapter)
router.get('/bab/:bab/slokas', BhagavadGitaController.slokas)
router.get('/bab/:bab/sloka/:sloka', BhagavadGitaController.sloka)
router.get('/bab/:bab/sloka/:sloka/makna', BhagavadGitaController.maknaSloka)

export default router
