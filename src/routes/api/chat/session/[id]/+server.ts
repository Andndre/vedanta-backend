import { findByIdWithHistory } from '@/models/SessionModel.js';
import { error } from '@/response';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	const session = await findByIdWithHistory(evt.params.id);
	if (!session) {
		return error(404, 'Session not found');
	}
	if (session.userId !== evt.locals.apiUser!.id) {
		return error(404, 'Session not found');
	}

	return json({
		error: false,
		session: session
	});
};
