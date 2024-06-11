import { GEMINI_API_KEY } from '$env/static/private';

import type { MessageHistory } from '@/types';
import { type ChatSession, GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Default message history to be used when starting a new chat session with Ganesh Bot
 */
export const defaultHistory: MessageHistory[] = [
	{
		role: 'user',
		parts: 'Halo, saya dengar kamu tahu banyak tentang agama Hindu di Bali (Indonesia)'
	},
	{
		role: 'model',
		parts:
			'Halo, nama saya Ganesh Bot, sebuah Bot yang bisa membantu Anda belajar Agama Hindu. Saya juga bisa mengetahui semua isi dari kitab Bhagavad Gita, mengetahui doa doa yang ada dalam agama Hindu, dan semua praktik keagamaan dalam agama Hindu. Saya tidak bisa membahas hal hal yang sensitif di luar topik yang saya kuasai ini, sebagai contoh saya sama sekali tidak bisa menjawab pertanyaan yang berhubungan dengan agama lain selain hindu, dan pertanyaan lainnya yang tidak berkaitan dengan agama hindu di bali. Ada yang bisa saya bantu?'
	}
];

/**
 * # GaneshChatSession
 *
 * A class for handling chat sessions for Gemini AI. This class can be used with single API Key for many users.
 */
export class GaneshChatSession {
	id: string;
	// Free tier Gemini AI memiliki reate limit 60 request per menit. Untuk mencegah terlalu banyak message,
	// gunakan limiter manual.
	private static lastTime = Date.now();

	/**
	 * Constructor for creating a new instance of the class.
	 *
	 * @param {ChatSession} chatSession - the chat session for the instance
	 * @param {string} sessionId - the unique identifier for the instance
	 */
	private constructor(chatSession: ChatSession, sessionId: string) {
		this.id = sessionId;
	}

	private static getDurationSinceLastRequest() {
		return Date.now() - GaneshChatSession.lastTime;
	}

	private static delayRpm(rpm = 59) {
		// Actually it's 60, but 59 to avoid being exactly on the limit
		const duration = GaneshChatSession.getDurationSinceLastRequest();
		const rpmInMs = (60 * 1000) / rpm; // 1 minute
		if (duration < rpmInMs) {
			const delay = rpmInMs - duration;
			GaneshChatSession.lastTime = Date.now() + delay;
			return new Promise((resolve) => setTimeout(resolve, delay));
		}
		GaneshChatSession.lastTime = Date.now();
		return Promise.resolve();
	}

	/**
	 * A function that handles a single chat message.
	 *
	 * @param {string} message - the message to be sent
	 * @returns an object with error status and the response text
	 */
	public static async singleChat(message: string): Promise<{
		error: boolean;
		text: string;
	}> {
		await GaneshChatSession.delayRpm();
		try {
			const chat = model.startChat({
				history: defaultHistory
			});
			const result = await chat.sendMessage(message);
			return {
				error: false,
				text: result.response.text()
			};
		} catch (e: any) {
			return {
				error: true,
				text: e.message as string
			};
		}
	}
}
