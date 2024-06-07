import { prismaClient } from '@/db.js';
import { GaneshChatSession } from '@/services/ChatService.js';
import { json } from '@sveltejs/kit';

export const POST = async (evt) => {
	const { message } = await evt.request.json();
	const response = await GaneshChatSession.singleChat(message);
	await prismaClient.user.update({
		where: {
			id: evt.locals.apiUser!.id
		},
		data: {
			ganeshBotMessages: {
				increment: 1
			}
		}
	});
	return json(response);
};
