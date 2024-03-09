export type User = {
  id: string;
  email: string;
};

export type LoginUser = User | null;

export type MessageHistory = {
	role: 'user' | 'model',
	parts: string
}
