import { BhagavadGitaService } from "@services"
import type { Handler } from "express"

export const chapters: Handler = async (_req, res) => {
  const chapters = await BhagavadGitaService.getAllChapters();
  res.json({
    babs: chapters
  });
}

export const chapter: Handler = async (req, res) => {
  const chapter = await BhagavadGitaService.getChapter(+req.params.bab);
  if (!chapter) return res.status(404).json({ error: "BAB not found" });
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

export const maknaSloka: Handler = async (req, res) => {
  const numberBab = +req.params.bab;
  const numberSloka = +req.params.sloka;
  const sloka = await BhagavadGitaService.getSloka(numberBab, numberSloka);
  if (!sloka) return res.status(404).json({ message: "Sloka not found", error: true });
  const makna = await BhagavadGitaService.getMakna(numberBab, numberSloka, sloka.content, sloka.translation_indo)
  if (makna === 'Terjadi kesalahan. silahakan coba lagi.') {
    res.status(500).json({
      message: makna,
      error: true
    })
  }
  res.json({ makna, error: false })
}
