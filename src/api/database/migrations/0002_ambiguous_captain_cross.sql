CREATE TABLE `refresh_token` (
	`token` varchar(255) NOT NULL,
	CONSTRAINT `refresh_token_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
ALTER TABLE `gita_sloka` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `gita_sloka` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `gita_sloka` ADD CONSTRAINT `sloka_unique` UNIQUE(`number`,`number_bab`);--> statement-breakpoint
ALTER TABLE `gita_sloka` ADD `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `refresh_token`;