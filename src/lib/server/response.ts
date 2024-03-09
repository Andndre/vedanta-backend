export const error = (status: number, message: string) => {
	return new Response(
		JSON.stringify({
			error: true,
			response: message
		}),
		{
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
