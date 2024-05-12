import api from '$api';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
	return json(await api.openapi(evt));
};
