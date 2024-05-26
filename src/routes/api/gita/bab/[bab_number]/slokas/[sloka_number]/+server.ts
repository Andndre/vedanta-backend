import { AudioAssetDownloader, one, saveMakna } from '@/models/SlokaModel.js';
import { error, json } from '@sveltejs/kit';
import { prismaClient } from '@/db.js';
import { GaneshChatSession } from '@/services/ChatService.js';

export const GET = async (evt) => {
	const user = evt.locals.apiUser;
	if (!user) {
		throw error(401, 'Unauthorized');
	}
	const sloka = await one(+evt.params.bab_number, +evt.params.sloka_number, user.id);
	if (!sloka) {
		throw error(404, 'sloka not found');
	}
	await prismaClient.user.update({
		where: {
			id: user.id
		},
		data: {
			bacaanSlokaTerakhirId: sloka.id
		}
	});

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

	const urlPelafalan = await AudioAssetDownloader.getPelafalanFromCDN(
		+evt.params.bab_number,
		+evt.params.sloka_number
	);
	const response = { ...sloka, makna, urlPelafalan };

	// get pelafalan url
	// cache
	evt.setHeaders({
		'Cache-Control': 'public, max-age=86400, s-maxage=86400' // 1 day
	});

	return json(response);
};
