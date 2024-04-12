// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			apiUser?: {
				email: string;
				id: string;
			};
			webUser?: {
				id: string;
				name: string;
				email: string;
				isAdmin: boolean;
				refreshSession: string;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
