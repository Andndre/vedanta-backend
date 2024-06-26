import { json } from '@sveltejs/kit';

export const error = (status: number, message: string) => {
	return json(
		{
			error: true,
			message
		},
		{
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
