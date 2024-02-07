import { relations } from "drizzle-orm";
import { int, mysqlTable, text, unique, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
	id: int("id").autoincrement().primaryKey(),
	name: varchar("name", {length: 255}).notNull(),
	email: varchar("email", {length: 255}).notNull().unique(),
	password: varchar("password", {length: 255}).notNull(),
});

export const refresh_token = mysqlTable("refresh_token", {
	token: varchar("token", {length: 255}).notNull().unique(),
})

export const gita_bab = mysqlTable("gita_bab", {
	number: int("number").primaryKey(),
	title: varchar("title", {length: 255}).notNull(),
	title_hindi: varchar("title_hindi", {length: 255}).notNull(),
	summary: text("summary").notNull(),
	translation_indo: varchar("translation_indo", {length: 255}).notNull(),
});

export const gita_sloka = mysqlTable("gita_sloka", {
	id: int("id").autoincrement().primaryKey(),
	number: int("number").notNull(),
	number_bab: int("number_bab").notNull().references(() => gita_bab.number, {
		onDelete: "cascade",
	}),
	content: text("content").notNull(),
	translation_indo: text("translation_indo").notNull(),
}, (self) => ({
	unique: unique("sloka_unique").on(self.number, self.number_bab),
}));

export const gita_sloka_relations = relations(gita_sloka, ({one}) => ({
	bab: one(gita_bab, {
		fields: [gita_sloka.number_bab],
		references: [gita_bab.number],
		relationName: "sloka_bab",
	})
}));

export const gita_bab_relations = relations(gita_bab, ({many}) => ({
	slokas: many(gita_sloka, {
		relationName: "sloka_bab",
	})
}));
