import { db } from "@database";
import { gita_bab, gita_sloka } from "@database/Schema";
import {
  sql,
  type InferInsertModel,
  eq,
  and,
  type InferSelectModel,
} from "drizzle-orm";

export const iB = db
  .insert(gita_bab)
  .values({
    number: sql.placeholder("number"),
    summary: sql.placeholder("summary"),
    title: sql.placeholder("title"),
    title_hindi: sql.placeholder("title_hindi"),
    translation_indo: sql.placeholder("translation_indo"),
  })
  .prepare();

export type GitaBabModel = InferSelectModel<typeof gita_bab>;
export type InsertGitaBab = InferInsertModel<typeof gita_bab>;
export type SlokaModel = InferSelectModel<typeof gita_sloka>;
export type InsertSloka = InferInsertModel<typeof gita_sloka>;

export const insertGitaBabBool = async (value: InsertGitaBab) => {
	try {
		await iB.execute(value);
		return true;
	} catch (error) {
		return false;
	}
};

export const insertGitaBabThrows = async (value: InsertGitaBab) => {
	return await iB.execute(value);
};

export const sB = db
  .select()
  .from(gita_bab)
  .where(eq(gita_bab.number, sql.placeholder("number")))
  .prepare();

export const selectGitaBabByBabNumberOrUndefined = async (number: number) => {
  return (await sB.execute({ number }))[0] as GitaBabModel | undefined;
};

export const saB = db.select().from(gita_bab).prepare();

export const selectAllGitaBab = async () => {
  return await saB.execute();
};

export const babExists = async (number: number) => {
	const chapter = await selectGitaBabByBabNumberOrUndefined(number);
	return chapter !== undefined;
};

export const sASbyB = db.query.gita_sloka.findMany({
	where: () => eq(gita_sloka.number_bab, sql.placeholder("number_bab")),
	orderBy: [gita_sloka.number],
	columns: {
		number: true,
	}
}).prepare()

export const selectAllSlokasByBabNumber = async (num: number) => {
	return await sASbyB.execute({ number_bab: num }) as SlokaModel[];
};

export const sS = db
  .select()
  .from(gita_sloka)
  .where(
    and(
      eq(gita_sloka.number_bab, sql.placeholder("number_bab")),
      eq(gita_sloka.number, sql.placeholder("number"))
    )
  )
  .prepare();

export const selectSlokaByNumberOrUndefined = async (
  number_bab: number,
  number: number
) => {
  return (await sS.execute({ number_bab, number }))[0] as SlokaModel | undefined;
};

export const iS = db
  .insert(gita_sloka)
  .values({
    number: sql.placeholder("number"),
    number_bab: sql.placeholder("number_bab"),
    content: sql.placeholder("content"),
    translation_indo: sql.placeholder("translation_indo"),
  })
  .prepare();

export const insertSlokaThrows = async (value: InsertSloka) => {
  return await iS.execute(value);
};

export const insertSlokaBool = async (value: InsertSloka) => {
	try {
		await iS.execute(value);
		return true;
	} catch (error) {
		return false;
	}
};

export const slokaExists = async (number_bab: number, number: number) => {
	const sloka = await selectSlokaByNumberOrUndefined(number_bab, number);
	return sloka !== undefined;
}
