import { db } from "@database";
import { refresh_token, user } from "@database/Schema";
import {
  sql,
  type InferInsertModel,
  eq,
  type InferSelectModel,
} from "drizzle-orm";

export type UserModel = InferSelectModel<typeof user>;

export const sUE = db
  .select()
  .from(user)
  .where(eq(user.email, sql.placeholder("email")))
  .prepare();
export const sUI = db
  .select()
  .from(user)
  .where(eq(user.id, sql.placeholder("id")))
  .prepare();

export const selectUserByEmail = async (email: string) => {
  return (await sUE.execute({ email }))[0] as UserModel | null;
};

export const selectUserById = async (id: string) => {
  return (await sUI.execute({ id }))[0] as UserModel | null;
};

export const iU = db
  .insert(user)
  .values({
    email: sql.placeholder("email"),
    name: sql.placeholder("name"),
    password: sql.placeholder("password"),
  })
  .prepare();

export type InserUserModel = InferInsertModel<typeof user>;

export const insertUserBool = async (value: InserUserModel) => {
  if (await selectUserByEmail(value.email)) return false;
  await iU.execute(value);
  return true;
};

export const insertRefreshToken = db
  .insert(refresh_token)
  .values({
    token: sql.placeholder("token"),
  })
  .prepare();

export const selectRefreshToken = db
  .select()
  .from(refresh_token)
  .where(eq(refresh_token.token, sql.placeholder("token")))
  .prepare();

export const deleteRefreshToken = db
  .delete(refresh_token)
  .where(eq(refresh_token.token, sql.placeholder("token")))
  .prepare();
