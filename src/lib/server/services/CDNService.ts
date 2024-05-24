import { TOKEN_CDN } from '$env/static/private';
import { FormData } from 'node-fetch';
import fetch from 'node-fetch';

export const uploadFile = async (file: Blob, destination: string) => {
	const formData = new FormData();
	formData.append('fileToUpload', file);
	formData.append('destination', destination);

	const res = await fetch('https://cdn.hmjtiundiksha.com/', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${TOKEN_CDN}`
		},
		body: formData
	});

	const resBody = (await res.json()) as { path: string };

	if (!res.ok) return null;

	return resBody.path;
};

export const deleteFile = async (filePath: string) => {
	const res = await fetch(
		`https://cdn.hmjtiundiksha.com?filePath=${encodeURIComponent(filePath)}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${TOKEN_CDN}`
			}
		}
	);

	if (!res.ok) return false;

	return true;
};
