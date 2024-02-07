import { BhagavadGitaModel } from "@models";

export const getAllChapters = async () => {
	const chapters = await BhagavadGitaModel.selectAllGitaBab();
	return chapters;
}

export const getChapter = async (chapterNumber: number) => {
	const chapter = await BhagavadGitaModel.selectGitaBabByBabNumberOrUndefined(
		chapterNumber
	);
	return chapter;
}

export const getAllSlokas = async (chapterNumber: number) => {
	const slokas = await BhagavadGitaModel.selectAllSlokasByBabNumber(chapterNumber);
	return slokas;
}

export const getSloka = async (chapterNumber: number, slokaNumber: number) => {
	const sloka = await BhagavadGitaModel.selectSlokaByNumberOrUndefined(
		chapterNumber,
		slokaNumber,
	);
	return sloka;
}