import { GaneshChatSession } from '@/services/ChatService';
import type { z } from 'sveltekit-api';
import { json } from '@sveltejs/kit';
import { error } from '@/response';
import { findById } from '@/models/SessionModel';

export const POST = async (evt) => {
	try {
		const session = await findById(evt.params.id);
		if (!session) {
			return error(404, 'Session not found');
		}
		if (session.userId !== evt.locals.apiUser!.id) {
			return error(404, 'Session not found');
		}
		const body = (await evt.request.json()) as {
			message: string;
		};
		const response = await GaneshChatSession.sendMessage(session.id, body.message);
		if (!response) {
			return error(500, 'Something went wrong');
		}
		return json({
			error: false,
			response
		});
	} catch (e) {
		return error(500, 'Something went wrong');
	}
};
