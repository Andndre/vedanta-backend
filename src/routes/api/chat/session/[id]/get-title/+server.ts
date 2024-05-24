import { updateTitle, findByIdWithHistory } from '@/models/SessionModel';
import { error } from '@/response';
import { GaneshChatSession } from '@/services/ChatService';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	try {
		const session = await findByIdWithHistory(evt.params.id);
		if (!session) {
			return error(404, 'Session not found');
		}
		if (session.userId !== evt.locals.apiUser!.id) {
			return error(404, 'Session not found');
		}
		// Ambil respon pertama dari Gemini (pesan keempat dalam session)
		const response = await GaneshChatSession.singleChat(
			'Berikan judul chat dari pertanyaan berikut: "' +
				session.history[3].parts +
				'". Jawablah dengan singkat'
		);
		if (!response) {
			return error(500, 'Something went wrong');
		}
		// Filter text dan ambil judul, maksimal 20 karakter
		let judul = response.text.replaceAll('*', '').split('\n')[0];
		if (judul.length > 30) {
			judul = judul.substring(0, 20) + '...';
		}
		await updateTitle(session.id, judul);
		return json({
			error: false,
			response: judul
		});
	} catch (e) {
		return error(500, 'Something went wrong');
	}
};
