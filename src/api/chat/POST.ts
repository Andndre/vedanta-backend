import { GaneshChatSession } from '@/services/ChatService';
import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Input = z.object({
	message: z.string()
});

export const Output = z.object({
	error: z.boolean({ description: 'true if error' }),
	text: z.string({ description: 'response message' })
});

export const Error = {
	500: error(500, 'Something went wrong')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Chat'];
	r.summary = 'Quick Chat';
	r.description = 'Dapatkan Jawaban Cepat dari Ganesh Bot tanpa membuat percakapan (Chat Session)';
	return r;
};

export default new Endpoint({ Input, Output, Error, Modifier }).handle(async ({ message }) => {
	const response = await GaneshChatSession.singleChat(message);
	return response;
});
