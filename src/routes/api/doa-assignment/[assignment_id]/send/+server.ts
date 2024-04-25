import { prismaClient } from '@/db.js';
import fs from 'fs';

export const POST = async (evt) => {
	const body = await evt.request.formData();
	const imageFile = body.get('documentation') as File;
	const recordingFile = body.get('recording') as File;
	// save image to /static/documentation-images
	fs.writeFileSync(
		`static/documentation-images/${imageFile.name}`,
		Buffer.from(await imageFile.arrayBuffer())
	);
	// save image to /static/recording-doa
	fs.writeFileSync(
		`static/recording-doa/${recordingFile.name}`,
		Buffer.from(await recordingFile.arrayBuffer())
	);

	await prismaClient.userHomeworkDoa.create({
		data: {
			homeWorkDoaId: +evt.params.assignment_id,
			userId: evt.locals.apiUser!.id,
			timeSetAt: new Date(),
			documentationImage: '/documentation-images/' + imageFile.name,
			fileRecorded: '/recording-doa/' + recordingFile.name
		}
	});
	return new Response();
};
