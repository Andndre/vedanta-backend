import { prismaClient } from "..";

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

export default {
  allInBab,
  one,
  makna,
  saveMakna
};
