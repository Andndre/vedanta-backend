import SessionModel from '@/models/SessionModel.js';
import { error } from '@/response';
import { json } from '@sveltejs/kit';

import { Output } from '$api/chat/session/[id]/GET';
import type { z } from 'sveltekit-api';

type Output = z.infer<typeof Output>;

export const GET = async (evt) => {
	const session = await SessionModel.findByIdWithHistory(evt.params.id);
	if (!session) {
		return error(404, 'Session not found');
	}
	if (session.userId !== evt.locals.apiUser!.id) {
		return error(404, 'Session not found');
	}

	return json({
		error: false,
		session: session
	} satisfies Output);
};

// // export const Param = z.object({
// // 	id: z.string()
// // });

// // export const Output = z.object({
// // 	error: z.boolean(),
// // 	session: z.object({
// // 		id: z.string(),
// // 		userId: z.string(),
// // 		title: z.string(),
// // 		createdAt: z.date(),
// // 		history: z.array(
// // 			z.object({
// // 				id: z.number(),
// // 				role: z.string(),
// // 				parts: z.string(),
// // 				sessionId: z.string()
// // 			})
// // 		)
// // 	})
// // });

// // export const Error = {
// // 	500: error(500, 'Something went wrong'),
// // 	404: error(404, 'Session not found')
// // };

// // export const Modifier: RouteModifier = (r) => {
// // 	r.tags = ['Chat'];
// // 	r.summary = 'Get Chat Session';
// // 	r.description = 'Dapatkan informasi tentang chat session dengan id tertentu';
// // 	return r;
// // };
