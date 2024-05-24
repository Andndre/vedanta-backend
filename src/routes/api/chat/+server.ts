import { GaneshChatSession } from '@/services/ChatService.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const { message } = await evt.request.json();
	const response = await GaneshChatSession.singleChat(message);
	return json(response);
};
