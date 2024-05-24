import { GaneshChatSession } from '@/services/ChatService.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const session = await GaneshChatSession.newSession(evt.locals.apiUser!.id);
	return json({
		sessionId: session.id
	});
};
