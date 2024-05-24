import { listFromUser } from '@/models/SessionModel.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const apiUser = evt.locals.apiUser!;
	return json({
		sessions: await listFromUser(apiUser.id)
	});
};
