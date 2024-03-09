import { GaneshChatSession } from '@/services/ChatService.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const session = await GaneshChatSession.newSession(evt.locals.apiUser!.id);
	return json({
		sessionId: session.id
	});
};

// // export const Output = z.object({
// // 	sessionId: z.string()
// // });

// // export const Error = {
// // 	500: error(500, 'Something went wrong')
// // };

// // export const Modifier: RouteModifier = (r) => {
// // 	r.tags = ['Chat'];
// // 	r.summary = 'Create Chat Session';
// // 	r.description = 'Buat percakapan baru (dapatkan session id)';
// // 	return r;
// // };
