import { one, saveMakna } from '@/models/SlokaModel.js';
import { GaneshChatSession } from '@/services/ChatService.js';
import { error, json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const sloka = await one(+evt.params.bab_number, +evt.params.sloka_number, evt.locals.apiUser!.id);
	if (!sloka) {
		throw error(404, 'Sloka not found');
	}
	let makna = sloka.makna;
	if (!makna) {
		const { text, error: err } = await GaneshChatSession.singleChat(
			`Dalam Bab ${sloka.numberBab} Sloka ${sloka.number} Bhagavad Gita, disebutkan: "${sloka.content}" jika diterjemahan: "${sloka.translationIndo}". Apa makna dari isi sloka tersebut?`
		);
		if (err) {
			throw error(500, 'GaneshChatSession error');
		}
		makna = text;
		await saveMakna(+evt.params.bab_number, +evt.params.sloka_number, text);
	}
	return json({
		makna,
		error: false
	});
};
