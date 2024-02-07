import type { APIChapter, APISloka } from "@interfaces/BhagavadGita";
import { BhagavadGitaModel } from "@models";
import { translate } from "@vitalets/google-translate-api";
import { HttpProxyAgent } from "http-proxy-agent";

export const getAllChaptersAPI = async () => {
  return (await fetch(`${API_ENDPOINT}/chapters`).then((res) =>
    res.json()
  )) as APIChapter[];
};

const getChapterAPI = async (chapterNumber: number) => {
  return (await fetch(`${API_ENDPOINT}/chapter/${chapterNumber}`).then((res) =>
    res.json()
  )) as APIChapter;
};

const proxy = "68.183.143.134:80";
const timeoutMs = 10000;

async function translateIndo(sourceText: string) {
  console.log(`\n\n${sourceText}`);
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  const fetchOptions = {
		agent: new HttpProxyAgent(`http://${proxy}`),
    signal: ac.signal,
  } as Partial<RequestInit>;
  try {
		const { text } = await translate(sourceText, { to: 'id', fetchOptions });
		console.log(`-------------------------\n${text}`);
    return text;
  } finally {
    clearTimeout(timer);
  }
}

export const getSlokaAPI = async (chapterNumber: number, slokaNumber: number) => {
  return (await fetch(
    `${API_ENDPOINT}/slok/${chapterNumber}/${slokaNumber}`
  ).then((res) => res.json())) as APISloka;
};


const API_ENDPOINT = "https://bhagavadgitaapi.in";

async function seedBhagavadGita() {
	for (let i = 1; i <= 18; i++) {
		const chapter = await getChapterAPI(i);
		if (!(await BhagavadGitaModel.babExists(i))) {
			await BhagavadGitaModel.insertGitaBabBool({
				number: chapter.chapter_number,
				summary: await translateIndo(chapter.summary.en),
				title: chapter.translation,
				title_hindi: chapter.name,
				translation_indo: await translateIndo(chapter.meaning.en),
			});
		} else {
			console.log(`Chapter ${chapter.chapter_number} already exists`);
		}
    for (let j = 1; j <= chapter.verses_count; j++) {
			if (!(await BhagavadGitaModel.slokaExists(i, j))) {
				const apiSloka = (await fetch(`${API_ENDPOINT}/slok/${i}/${j}`, {
					// verbose: true,
				}).then((res) => res.json())) as APISloka;
				await BhagavadGitaModel.insertSlokaBool({
					number: apiSloka.verse,
					content: apiSloka.transliteration,
					number_bab: chapter.chapter_number,
					translation_indo: await translateIndo(
						apiSloka.purohit.et ||
						apiSloka.siva.et ||
						apiSloka.adi.et ||
						apiSloka.raman.et ||
							apiSloka.gambir.et ||
							apiSloka.san.et ||
							apiSloka.sankar.et
					),
				})
			} else {
				console.log(`Sloka ${i}.${j} already exists`);
			}
    }
  }
}

await seedBhagavadGita();
