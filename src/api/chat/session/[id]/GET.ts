import { Endpoint, z, error, type RouteModifier } from 'sveltekit-api';

export const Param = z.object({
	id: z.string()
});

export const Output = z.object({
	error: z.boolean(),
	session: z.object({
		id: z.string(),
		userId: z.string(),
		title: z.string(),
		createdAt: z.date(),
		history: z.array(
			z.object({
				id: z.number(),
				role: z.string(),
				parts: z.string(),
				sessionId: z.string()
			})
		)
	})
});

export const Error = {
	500: error(500, 'Something went wrong'),
	404: error(404, 'Session not found')
};

export const Modifier: RouteModifier = (r) => {
	r.tags = ['Chat'];
	r.summary = 'Get Chat Session';
	r.description = 'Dapatkan informasi tentang chat session dengan id tertentu';
	return r;
};

// @ts-ignore
export default new Endpoint({ Modifier, Output, Error, Param }).handle(async () => {
	return new Response();
});
