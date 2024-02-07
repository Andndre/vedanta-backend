import { BhagavadGitaService } from "@services"
import type { Handler } from "express"

export const chapters: Handler = async (_req, res) => {
	const chapters = await BhagavadGitaService.getAllChapters();
	res.json(chapters);
}

export const chapter: Handler = async (req, res) => {
	const chapter = await BhagavadGitaService.getChapter(+req.params.bab);
	if (!chapter) return res.status(404).json({ error: "Chapter not found" });
	res.json(chapter);
}

export const slokas: Handler = async (req, res) => {
	const slokas = await BhagavadGitaService.getAllSlokas(+req.params.bab);
	res.json(slokas);
}

export const sloka: Handler = async (req, res) => {
	const sloka = await BhagavadGitaService.getSloka(+req.params.bab, +req.params.sloka);
	if (!sloka) return res.status(404).json({ error: "Sloka not found" });
	res.json(sloka);
}
