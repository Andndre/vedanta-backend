import { prismaClient } from '@/db';
import type { GitaSloka } from '@prisma/client';
import { unlinkSync, existsSync, writeFileSync } from 'fs';
import { readdir } from 'fs/promises';
import combinations from 'combinations';

export const allInBab = async (bab_number: number, userId: string) => {
	const result = await prismaClient.gitaSloka.findMany({
		where: { numberBab: bab_number },
		select: {
			id: true,
			number: true,
			content: true,
			translationIndo: true,
			usersLiked: {
				where: {
					userId: userId
				}
			}
		}
	});

	if (!result) {
		return null;
	}

	// Check if usersLiked contains any items and set isLiked accordingly
	const withIsLiked = result.map((sloka) => {
		// Destructure usersLiked and create a new object without it
		const { usersLiked, ...rest } = { ...sloka, isLiked: sloka.usersLiked.length > 0 };
		return rest;
	});

	return withIsLiked;
};

export const one = async (bab_number: number, sloka_number: number, userId: string) => {
	const result = await prismaClient.gitaSloka.findFirst({
		where: { number: sloka_number, numberBab: bab_number },
		include: {
			usersLiked: {
				where: {
					userId: userId
				}
			}
		}
	});

	if (!result) {
		return null;
	}

	// Check if usersLiked contains any items and set isLiked accordingly
	const isLiked = result.usersLiked.length > 0;

	// Destructure usersLiked and create a new object without it
	const { usersLiked, ...rest } = { ...result, isLiked };

	return rest;
};

export const makna = (bab_number: number, sloka_number: number) => {
	return prismaClient.gitaSloka.findFirst({
		where: { number: sloka_number, numberBab: bab_number },
		select: { makna: true }
	});
};

export const saveMakna = async (bab_number: number, sloka_number: number, makna: string) => {
	return prismaClient.gitaSloka.update({
		where: {
			number_numberBab: {
				number: sloka_number,
				numberBab: bab_number
			}
		},
		data: { makna }
	});
};

export const getAllSloka = () => {
	return prismaClient.gitaSloka.findMany();
};

export const tD = (num: number) => ('000' + num).slice(-3);

export const getPelafalanFileName = (
	bab_number: number,
	sloka_number: number,
	end_sloka: number | undefined = undefined
) =>
	`gita_sloka_${tD(bab_number)}_${tD(sloka_number) + (end_sloka ? `-${tD(end_sloka!)}` : '')}.mp3`;

export const getPelafalanFileFullPath = (fileName: string) => {
	return `./static/audio/${fileName}`;
};

export const isPelafalanFileExist = (fileName: string) => {
	const path = getPelafalanFileFullPath(fileName);
	return existsSync(path);
};

export const searchPelafalanFilePath = (bab_number: number, sloka_number: number): string => {
	if (bab_number <= 0 || sloka_number <= 0 || bab_number > 18) {
		throw new Error('Invalid number');
	}
	const fileName = getPelafalanFileName(bab_number, sloka_number);
	if (isPelafalanFileExist(fileName)) {
		return `/audio/${fileName}`;
	}
	return searchPelafalanFilePath(bab_number, --sloka_number);
};

export class AudioAssetDownloader {
	static possiblyGrouped: number[][] = new Array(18).fill([]).map(() => new Array());
	static async getAudioPelafalan(bab_number: number, sloka_number: number) {
		let fileName = getPelafalanFileName(bab_number, sloka_number);
		if (existsSync(getPelafalanFileFullPath(fileName))) {
			process.stdout.write('✅');
			return 'CACHED';
		}
		let audio = await fetch(
			`https://www.holy-bhagavad-gita.org/public/audio/${tD(bab_number)}_${tD(sloka_number)}.mp3`
		);
		if (!audio.ok) {
			process.stdout.write('!');
			AudioAssetDownloader.possiblyGrouped[bab_number - 1].push(sloka_number);
			return 'SKIPPED_DOWNLOAD';
		}
		process.stdout.write('.');
		const arrayBuffer = await audio.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		writeFileSync(getPelafalanFileFullPath(fileName), buffer);
		return 'OK';
	}

	static async tryToDownloadGroup(bab_number: number, start_sloka: number, end_sloka: number) {
		const audio = await fetch(
			`https://www.holy-bhagavad-gita.org/public/audio/${tD(bab_number)}_${tD(start_sloka)}-${tD(
				end_sloka
			)}.mp3`,
			{
				// verbose: true
			}
		);
		if (!audio.ok) return 0; // fail silently
		const path = getPelafalanFileFullPath(getPelafalanFileName(bab_number, start_sloka));
		if (existsSync(path)) {
			process.stdout.write('✅');
			return 0;
		}
		const arrayBuffer = await audio.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		writeFileSync(path, buffer);
		return 1;
	}

	static async downloadAllPelafalan() {
		const allSloka = await getAllSloka();
		const stats = {
			downloaded: 0,
			cached: 0,
			totalAudioFinal: 0,
			deleted: 0,
			skippedDownload: 0
		};
		console.log('-------------------------------');
		console.log('Downloading single audios...');
		console.log('-------------------------------');
		for (const sloka of allSloka) {
			switch (await AudioAssetDownloader.getAudioPelafalan(sloka.numberBab, sloka.number)) {
				case 'CACHED':
					stats.cached++;
					break;
				case 'OK':
					stats.downloaded++;
					break;
				case 'SKIPPED_DOWNLOAD':
					stats.skippedDownload++;
					break;
			}
		}

		process.stdout.write('\n');
		console.log('-------------------------------');
		console.log('Searching pairs...');
		console.log('-------------------------------');

		for (let bab = 0; bab < AudioAssetDownloader.possiblyGrouped.length; bab++) {
			const groupSorted = AudioAssetDownloader.possiblyGrouped[bab].toSorted((a, b) => a - b);
			console.log('For bab ' + (bab + 1) + '.. skipped verses:');
			console.log(groupSorted);
			const groups: number[][] = [];
			let currentGroup: number[] = [];
			for (let i = 0; i < groupSorted.length; i++) {
				if (
					currentGroup.length === 0 ||
					groupSorted[i] - currentGroup[currentGroup.length - 1] === 1
				) {
					currentGroup.push(groupSorted[i]);
				} else {
					groups.push(currentGroup);
					currentGroup = [groupSorted[i]];
				}
			}
			if (currentGroup.length > 0) {
				groups.push(currentGroup);
			}
			const finalArray: number[][] = [];
			for (const group of groups) {
				finalArray.push(...combinations(group, 2, 2));
			}
			console.log('Possible pairs:');
			console.log(finalArray);
			for (const pair of finalArray) {
				const [start, end] = pair;
				if (!end) {
					continue;
				}
				stats.downloaded += await this.tryToDownloadGroup(bab + 1, start, end);
			}
		}

		console.log(
			`Downloaded: ${stats.downloaded} (${stats.skippedDownload} skipped), Cached: ${
				stats.cached
			}, Deleted: ${stats.deleted}, Final Audios: ${(await readdir('./static/audio')).length} files`
		);
		return 'OK';
	}

	static async clean(sloka: GitaSloka) {
		const audio = await fetch(
			`https://www.holy-bhagavad-gita.org/public/audio/${tD(sloka.numberBab)}_${tD(
				sloka.number
			)}.mp3`,
			{
				// verbose: true
			}
		);
		if (audio.ok) {
			return 'SAFE';
		}
		const path = getPelafalanFileFullPath(getPelafalanFileName(sloka.numberBab, sloka.number));
		if (existsSync(path)) {
			unlinkSync(path);
			console.log('-');
			return 'DELETED';
		}
		return 'PASS';
	}

	static getCDNAudioPath(bab: number, sloka: number) {
		const fileName = getPelafalanFileName(bab, sloka);
		return 'https://cdn.hmjtiundiksha.com/vedanta/audio-sloka/' + fileName;
	}

	static async getPelafalanFromCDN(bab: number, sloka: number) {
		let request: Response;
		do {
			const path = AudioAssetDownloader.getCDNAudioPath(bab, sloka);
			request = await fetch(path, {
				method: 'GET'
			});
			sloka--;
		} while (!request.ok);
		return AudioAssetDownloader.getCDNAudioPath(bab, sloka + 1);
	}
}
