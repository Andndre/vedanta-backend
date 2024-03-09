import SessionModel from '@/models/SessionModel.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const apiUser = evt.locals.apiUser!;
	return json({
		sessions: await SessionModel.listFromUser(apiUser.id)
	});
};

// // export const Input = z.object({
// // 	message: z.string()
// // });
//
// // export const Output = z.object({
// // 	error: z.boolean({ description: 'true if error' }),
// // 	text: z.string({ description: 'response message' })
// // });
//
// // export const Error = {
// // 	500: error(500, 'Something went wrong')
// // };
//
// // export const Modifier: RouteModifier = (r) => {
// // 	r.tags = ['Chat'];
// // 	r.summary = 'Sessions';
// // 	r.description = 'Dapatkan semua session pada User';
// // 	return r;
// // };
