import { updateTitle, findByIdWithHistory } from '@/models/SessionModel';
import { error } from '@/response';
import { GaneshChatSession } from '@/services/ChatService';
import { json } from '@sveltejs/kit';
import { Output } from '$api/chat/session/[id]/get-title/GET';
import type { z } from 'sveltekit-api';

type Output = z.infer<typeof Output>;

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
		} satisfies Output);
	} catch (e) {
		return error(500, 'Something went wrong');
	}
};

// // import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

// // export const Param = z.object({
// // 	id: z.string()
// // });

// // export const Output = z.object({
// // 	title: z.string()
// // });

// // export const Error = {
// // 	500: error(500, 'Something went wrong'),
// // 	404: error(404, 'Session not found')
// // };

// // export const Modifier: RouteModifier = (r) => {
// // 	r.tags = ['Chat'];
// // 	r.summary = 'Get Chat Title';
// // 	r.description = 'Dapatkan informasi judul dari chat session dengan id tertentu';
// // 	return r;
// // };

// // // @ts-ignore
// // export default new Endpoint({ Modifier, Output, Error, Param }).handle(async () => {
// // 	return new Response();
// // });
