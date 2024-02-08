import { BhagavadGitaModel } from "@models";
import { ChatService } from "@services";

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

export const getMakna = async (bab: number, sloka: number, textSloka: string, terjemahan: string) => {
	const maknaDb = await BhagavadGitaModel.getMaknaSloka(bab, sloka);
	if (maknaDb?.makna) return maknaDb.makna;
	const makna = await ChatService.sendMessage(`Dalam Bab ${bab} Sloka ${sloka} Bhagavad Gita, disebutkan: "${textSloka}" jika diterjemahan: "${terjemahan}". Apa makna dari isi sloka tersebut?`);
	if (makna.text !== 'Terjadi kesalahan. silahakan coba lagi.') {
		await BhagavadGitaModel.updateMakna(bab, sloka, makna.text);
	}
	return makna.text;
}
