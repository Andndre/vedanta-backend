import { GaneshChatSession } from '@/services/ChatService';
import type { z } from 'sveltekit-api';
import { Input, Output } from '$api/chat/session/[id]/chat/POST';
import { json } from '@sveltejs/kit';
import { error } from '@/response';
import SessionModel from '@/models/SessionModel';

type Output = z.infer<typeof Output>;
type Body = z.infer<typeof Input>;

export const POST = async (evt) => {
	try {
		const session = await SessionModel.findById(evt.params.id);
		if (!session) {
			return error(404, 'Session not found');
		}
		if (session.userId !== evt.locals.apiUser!.id) {
			return error(404, 'Session not found');
		}
		const body = (await evt.request.json()) as Body;
		const response = await GaneshChatSession.sendMessage(session.id, body.message);
		if (!response) {
			return error(500, 'Something went wrong');
		}
		return json({
			error: false,
			response
		} satisfies Output);
	} catch (e) {
		return error(500, 'Something went wrong');
	}
};

// // export const Input = z.object({
// // 	message: z.string()
// // });

// // export const Output = z.object({
// // 	error: z.boolean({ description: 'true if error' }),
// // 	response: z.string({ description: 'response message' })
// // });

// // export const Error = {
// // 	500: error(500, 'Something went wrong')
// // };

// // export const Modifier: RouteModifier = (r) => {
// // 	r.tags = ['Chat'];
// // 	r.summary = 'Send Message';
// // 	r.description =
// // 		'Kirim pesan ke session yang diberikan dan dapatkan respon dari lanjutan percakapan sebelumnya pada session tersebut';
// // 	return r;
// // };
