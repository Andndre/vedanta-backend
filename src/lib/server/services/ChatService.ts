import { GEMINI_API_KEY } from '$env/static/private';
import SessionModel from '@/models/SessionModel';

import type { MessageHistory } from '@/types';
import {
	ChatSession,
	GoogleGenerativeAI,
	type GenerateContentStreamResult,
	type GenerateContentResult
} from '@google/generative-ai';

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
			'Halo, nama saya Ganesh Bot, sebuah Bot yang bisa membantu Anda belajar Agama Hindu. Saya juga bisa mengetahui semua isi dari kitab Bhagavad Gita, mengetahui doa doa yang ada dalam agama Hindu, dan semua praktik keagamaan dalam agama Hindu. Saya tidak bisa membahas hal hal yang sensitif di luar topik yang saya kuasai ini. Ada yang bisa saya bantu?'
	}
];

/**
 * # GaneshChatSession
 *
 * A class for handling chat sessions for Gemini AI. This class can be used with single API Key for many users.
 */
export class GaneshChatSession {
	private chatSession: ChatSession;
	private static sessions: Map<string, GaneshChatSession> = new Map();
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
		this.chatSession = chatSession;
		this.id = sessionId;
	}

	/**
	 * Create a new chat session for the given user.
	 *
	 * @param {string} userId - The ID of the user
	 * @returns The newly created chat session
	 */
	static async newSession(userId: string): Promise<GaneshChatSession> {
		const chatSession = model.startChat({
			history: defaultHistory
		});
		const session = await SessionModel.create(userId);
		const ganeshChatSession = new GaneshChatSession(chatSession, session.id);
		await SessionModel.saveHistory(session.id, defaultHistory);
		GaneshChatSession.sessions.set(session.id, ganeshChatSession);
		return ganeshChatSession;
	}

	/**
	 * Restore a session by its ID, retrieve session data and history, start a chat session,
	 * create a new GaneshChatSession, and store it in the sessions map.
	 *
	 * @param {string} sessionId - The ID of the session to be restored
	 * @returns The restored GaneshChatSession or null if the session does not exist
	 */
	static async restoreSession(sessionId: string): Promise<GaneshChatSession | null> {
		const session = await SessionModel.findById(sessionId);
		if (!session) {
			return null;
		}
		const history = await SessionModel.getHistory(session.id);
		const chatSession = model.startChat({
			history: history
		});
		const ganeshChatSession = new GaneshChatSession(chatSession, session.id);
		GaneshChatSession.sessions.set(sessionId, ganeshChatSession);
		return ganeshChatSession;
	}

	/**
	 * Retrieves a session with the given session ID, or restores the session if it does not exist.
	 *
	 * @param {string} sessionId - The ID of the session to retrieve or restore
	 * @returns The retrieved or restored session
	 */
	static async getSession(sessionId: string): Promise<GaneshChatSession | null> {
		if (GaneshChatSession.sessions.has(sessionId)) {
			return GaneshChatSession.sessions.get(sessionId) ?? null;
		}
		return await GaneshChatSession.restoreSession(sessionId);
	}

	/**
	 * Get the list of chat sessions for a specific user.
	 *
	 * @param {string} userId - the ID of the user
	 * @returns the list of chat sessions for the user
	 */
	static getSessionList(userId: string): Promise<{ id: string; title: string }[]> {
		return SessionModel.listFromUser(userId);
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
	 * Sends a message using the given message string.
	 *
	 * @param {string} message - The message to be sent
	 * @returns A promise that resolves with the result of sending the message
	 */
	async sendMessage(message: string): Promise<GenerateContentResult> {
		await GaneshChatSession.delayRpm();
		return this.chatSession.sendMessage(message);
	}

	/**
	 * Send a message to get strem response from Gemini AI.
	 *
	 * @param {string} message - The message to be sent
	 * @returns A promise that resolves with the result of sending the message through the stream
	 */
	async sendMessageStream(message: string): Promise<GenerateContentStreamResult> {
		await GaneshChatSession.delayRpm();
		return this.chatSession.sendMessageStream(message);
	}

	/**
	 * Sends a message in the chat session.
	 *
	 * @param {string} sessionId - The ID of the chat session
	 * @param {string} message - The message to be sent
	 * @returns The response text from the AI
	 */
	static async sendMessage(sessionId: string, message: string): Promise<string | null> {
		const session = await GaneshChatSession.getSession(sessionId);
		if (!session) return null;
		const response = await session.sendMessage(message);
		const responseText = response.response.text();
		const history: MessageHistory[] = [
			{
				role: 'user',
				parts: message
			},
			{
				role: 'model',
				parts: responseText
			}
		];
		await SessionModel.saveHistory(sessionId, history);
		return responseText;
	}

	static async *sendMessageStream(sessionId: string, message: string) {
		const session = await GaneshChatSession.getSession(sessionId);
		if (!session) return;
		const response = await session.sendMessageStream(message);
		let responseText = '';
		for await (const item of response.stream) {
			responseText += item.text();
			console.log(responseText);
			yield item.text();
		}

		const history: MessageHistory[] = [
			{
				role: 'user',
				parts: message
			},
			{
				role: 'model',
				parts: responseText
			}
		];
		await SessionModel.saveHistory(sessionId, history);
		return responseText;
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

export default {
	GaneshChatSession
};
