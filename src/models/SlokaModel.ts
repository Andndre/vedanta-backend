import { BunFile } from "bun";
import { prismaClient } from "..";
import { GitaSloka } from "@prisma/client";
import { unlinkSync } from "node:fs";
import combinations from "combinations";
import { readdir } from "node:fs/promises";

const allInBab = (bab_number: number) => {
  return prismaClient.gitaSloka.findMany({
    where: { numberBab: bab_number },
    select: { id: true, number: true, content: true, translationIndo: true },
  });
};

const one = (bab_number: number, sloka_number: number) => {
  return prismaClient.gitaSloka.findFirst({
    where: { number: sloka_number, numberBab: bab_number },
  });
};

const makna = (bab_number: number, sloka_number: number) => {
  return prismaClient.gitaSloka.findFirst({
    where: { number: sloka_number, numberBab: bab_number },
    select: { makna: true },
  });
};

const saveMakna = async (
  bab_number: number,
  sloka_number: number,
  makna: string
) => {
  return prismaClient.gitaSloka.update({
    where: {
      number_numberBab: {
        number: sloka_number,
        numberBab: bab_number,
      },
    },
    data: { makna },
  });
};

export const getAllSloka = () => {
  return prismaClient.gitaSloka.findMany();
}

export const tD = (num: number) => ('000' + num).slice(-3);

export const getPelafalanFileName = (bab_number: number, sloka_number: number, end_sloka: number | undefined = undefined) => 
  `gita_sloka_${tD(bab_number)}_${tD(sloka_number) + (end_sloka ? `-${tD(end_sloka!)}` : '')}.mp3`;

export const getPelafalanFileFullPath = (fileName: string) => {
  return `./public/audio/${fileName}`;
}

export const isPelafalanFileExist = async (fileName: string) => {
  const path = getPelafalanFileFullPath(fileName);
  return await Bun.file(path).exists()
}

export const searchPelafalanFile = async (bab_number: number, sloka_number: number) : Promise<BunFile> => {
  if (bab_number <= 0 || sloka_number <= 0 || bab_number > 18) {
    throw new Error('Invalid number')
  }
  const fileName = getPelafalanFileName(bab_number, sloka_number);
  if (await isPelafalanFileExist(fileName)) {
    const file = Bun.file(getPelafalanFileFullPath(fileName))
    return file;
  }
  return await searchPelafalanFile(bab_number, --sloka_number)
}

export class AudioAssetDownloader {
  static possiblyGrouped: number[][] = new Array(18).fill([]).map(() => new Array());
  static async getAudioPelafalan (bab_number: number, sloka_number: number) {
    let fileName = getPelafalanFileName(bab_number, sloka_number);
    if (await Bun.file(getPelafalanFileFullPath(fileName)).exists()) {
      process.stdout.write('✅')
      return "CACHED"
    }
    let audio = await fetch(`https://www.holy-bhagavad-gita.org/public/audio/${tD(bab_number)}_${tD(sloka_number)}.mp3`, {
      // verbose: true
    });
    if (!audio.ok) {
      process.stdout.write('!');
      AudioAssetDownloader.possiblyGrouped[bab_number - 1].push(sloka_number);
      return 'SKIPPED_DOWNLOAD';
    }
    process.stdout.write('.');
    const arrayBuffer = await audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await Bun.write(getPelafalanFileFullPath(fileName), buffer);
    return 'OK'
  }
  
  static async tryToDownloadGroup(bab_number: number, start_sloka: number, end_sloka: number) {
    const audio = await fetch(`https://www.holy-bhagavad-gita.org/public/audio/${tD(bab_number)}_${tD(start_sloka)}-${tD(end_sloka)}.mp3`, {
      // verbose: true
    });
    if (!audio.ok) return 0; // fail silently
    const path = getPelafalanFileFullPath(getPelafalanFileName(bab_number, start_sloka))
    if (await Bun.file(path).exists()) {
      process.stdout.write('✅')
      return 0;
    }
    const arrayBuffer = await audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await Bun.write(path, buffer);
    return 1;
  }
  
  static async downloadAllPelafalan () {
    const allSloka = await getAllSloka();
    const stats = {
      downloaded: 0,
      cached: 0,
      totalAudioFinal: 0,
      deleted: 0,
      skippedDownload: 0,
    }
    console.log('-------------------------------')
    console.log('Downloading single audios...')
    console.log('-------------------------------')
    for (const sloka of allSloka) {
      switch(await AudioAssetDownloader.getAudioPelafalan(sloka.numberBab, sloka.number)) {
        case 'CACHED':
          stats.cached++;
          break;
        case "OK":
          stats.downloaded++;
          break;
        case 'SKIPPED_DOWNLOAD':
          stats.skippedDownload++;
          break;
      }
    }

    process.stdout.write('\n');
    console.log('-------------------------------')
    console.log('Searching pairs...')
    console.log('-------------------------------')

    for (let bab = 0; bab < AudioAssetDownloader.possiblyGrouped.length; bab++) {
      const groupSorted = AudioAssetDownloader.possiblyGrouped[bab].toSorted((a, b) => a - b);
      console.log('For bab ' + (bab + 1) + '.. skipped verses:')
      console.log(groupSorted);
      const groups: number[][] = [];
      let currentGroup: number[] = [];
      for (let i = 0; i < groupSorted.length; i++) {
        if (currentGroup.length === 0 || groupSorted[i] - currentGroup[currentGroup.length - 1] === 1) {
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

    console.log(`Downloaded: ${stats.downloaded} (${stats.skippedDownload} skipped), Cached: ${stats.cached}, Deleted: ${stats.deleted}, Final Audios: ${(await readdir("./public/audio")).length} files`)
    return "OK"
  }

  static async clean (sloka: GitaSloka) {
    const audio = await fetch(`https://www.holy-bhagavad-gita.org/public/audio/${tD(sloka.numberBab)}_${tD(sloka.number)}.mp3`, {
      // verbose: true
    });
    if (audio.ok) {
      return 'SAFE';
    }
    const path = getPelafalanFileFullPath(getPelafalanFileName(sloka.numberBab, sloka.number));
    if (await Bun.file(path).exists()) {
      unlinkSync(path);
      console.log('-');
      return 'DELETED';
    }
    return 'PASS';
  }
}

export default {
  allInBab,
  one,
  makna,
  saveMakna,
  searchPelafalanFile
};
