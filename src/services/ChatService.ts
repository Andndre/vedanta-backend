import SessionModel from '@/models/SessionModel';

import { MessageHistory } from '@/types';
import { ChatSession, GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(Bun.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: 'gemini-pro'});

const defaultHistory: MessageHistory[] = [
	{
		role: 'user',
		parts: 'Halo, saya dengar kamu tahu banyak tentang agama Hindu di Bali (Indonesia)'
	},
	{
		role: 'model',
		parts: 'Halo, nama saya Ganesh Bot, sebuah Bot yang bisa membantu Anda belajar Agama Hindu. Saya juga bisa mengetahui semua isi dari kitab Bhagavad Gita, mengetahui doa doa yang ada dalam agama Hindu, dan semua praktik keagamaan dalam agama Hindu. Saya tidak bisa membahas hal hal yang sensitif di luar topik yang saya kuasai ini. Ada yang bisa saya bantu?'
	}
]

export class GaneshChatSession {
	private chatSession: ChatSession;
	private static sessions: Map<string, GaneshChatSession> = new Map();
	id: string;
	// Free tier Gemini AI memiliki reate limit 60 request per menit. Untuk mencegah terlalu banyak message,
	// gunakan limiter manual.
	private static lastTime = Date.now();

	private constructor(chatSession: ChatSession, sessionId: string) {
		this.chatSession = chatSession;
		this.id = sessionId;
	}
	
	static async newSession(userId: string) {
		const chatSession = model.startChat({
			history: defaultHistory
		});
		const session = await SessionModel.create(userId);
		const ganeshChatSession = new GaneshChatSession(chatSession, session.id);
		await SessionModel.saveHistory(session.id, defaultHistory)
		GaneshChatSession.sessions.set(session.id, ganeshChatSession);
		return ganeshChatSession;
	}

	static async restoreSession(sessionId: string) {
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

	static async getSession(sessionId: string) {
		if (this.sessions.has(sessionId)) {
			return this.sessions.get(sessionId);
		}
		return await this.restoreSession(sessionId);
	}

	static getSessionList(userId: string) {
		return SessionModel.listFromUser(userId);
	}

	private static getDurationSinceLastRequest() {
		return Date.now() - GaneshChatSession.lastTime;
	}

	private static delayRpm(rpm = 59) {
		const duration = GaneshChatSession.getDurationSinceLastRequest();
		const rpmInMs = 60 * 1000 / rpm; // 1 minute
		if (duration < rpmInMs) {
			const delay = rpmInMs - duration;
			return new Promise(resolve => setTimeout(resolve, delay));
		}
		return Promise.resolve();
	}

	async sendMessage(message: string) {
		await GaneshChatSession.delayRpm();
		return this.chatSession.sendMessage(message);
	}

	static async sendMessage(sessionId: string, message: string) {
		const session = await this.getSession(sessionId);
		if (!session) return null;
		const response = await session.sendMessage(message);
		GaneshChatSession.lastTime = Date.now();
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
		]
		await SessionModel.saveHistory(sessionId, history);
		return responseText;
	}

	public static async singleChat(message: string) {
		await GaneshChatSession.delayRpm();
		try {
			const chat = model.startChat({
				history: defaultHistory,
			})
			const result = await chat.sendMessage(message);
			GaneshChatSession.lastTime = Date.now();
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
	};
}

export default {
	GaneshChatSession
}
