import { one, saveMakna } from '@/models/SlokaModel';
import { GaneshChatSession } from '@/services/ChatService';
import { Endpoint, z, type RouteModifier, error } from 'sveltekit-api';

export const Param = z.object({
	bab_number: z.string(),
	sloka_number: z.string()
});

export const Output = z.object({
	makna: z.string(),
	error: z.boolean()
});

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Gita'];
	r.summary = 'Sloka Meaning';
	r.description = 'Dapatkan makna dari satu sloka yang diberikan';
	return r;
};

export const Error = {
	404: error(404, 'Sloka tidak ditemukan'),
	500: error(500, 'Terjadi kesalahan pada server')
};

export default new Endpoint({ Output, Modifier, Param, Error }).handle(
	async ({ bab_number, sloka_number }) => {
		const sloka = await one(+bab_number, +sloka_number);
		if (!sloka) {
			throw Error[404];
		}
		let makna = sloka.makna;
		if (!makna) {
			const { text, error } = await GaneshChatSession.singleChat(
				`Dalam Bab ${sloka.numberBab} Sloka ${sloka.number} Bhagavad Gita, disebutkan: "${sloka.content}" jika diterjemahan: "${sloka.translationIndo}". Apa makna dari isi sloka tersebut?`
			);
			if (error) {
				throw Error[500];
			}
			makna = text;
			await saveMakna(+bab_number, +sloka_number, text);
		}
		return {
			makna,
			error: false
		};
	}
);
