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

	private constructor(chatSession: ChatSession, userId: string, sessionId: string) {
		this.chatSession = chatSession;
		this.id = sessionId;
		GaneshChatSession.sessions.set(userId, this);
	}
	
	static async newSession(userId: string) {
		const chatSession = model.startChat({
			history: defaultHistory
		});
		const session = await SessionModel.create(userId);
		const ganeshChatSession = new GaneshChatSession(chatSession, userId, session.id);
		await SessionModel.saveHistory(session.id, defaultHistory)
		this.sessions.set(session.id, ganeshChatSession);
		return ganeshChatSession;
	}

	static async restoreSession(userId: string, sessionId: string) {
		const session = await SessionModel.findById(sessionId);
		if (!session) {
			return null;
		}
		const history = await SessionModel.getHistory(session.id);
		const chatSession = model.startChat({
			history: history
		});
		const ganeshChatSession = new GaneshChatSession(chatSession, userId, session.id);
		this.sessions.set(sessionId, ganeshChatSession);
		return ganeshChatSession;
	}

	static async getSession(userId: string, sessionId: string) {
		if (this.sessions.has(sessionId)) {
			return this.sessions.get(sessionId);
		}
		return await this.restoreSession(userId, sessionId);
	}

	static getSessionList(userId: string) {
		return SessionModel.listFromUser(userId);
	}

	async sendMessage(message: string) {
		return this.chatSession.sendMessage(message);
	}

	static async sendMessage(userId: string, sessionId: string, message: string) {
		const session = await this.getSession(userId, sessionId);
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
		]
		await SessionModel.saveHistory(sessionId, history);
		return responseText;
	}
}

export const singleChat = async (message: string) => {
	try {
		const chat = model.startChat({
			history: defaultHistory,
		})
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
};

export default {
	singleChat
}
