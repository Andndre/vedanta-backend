CREATE TABLE `gita_bab` (
	`number` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`title_hindi` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`translation_indo` varchar(255) NOT NULL,
	CONSTRAINT `gita_bab_number` PRIMARY KEY(`number`)
);
--> statement-breakpoint
CREATE TABLE `gita_sloka` (
	`number` int NOT NULL,
	`number_bab` int NOT NULL,
	`content` text NOT NULL,
	`translation_indo` text NOT NULL,
	CONSTRAINT `gita_sloka_number` PRIMARY KEY(`number`)
);
--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN `username` TO `name`;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `user` DROP INDEX `user_username_unique`;--> statement-breakpoint
ALTER TABLE `user` ADD `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `refresh_token` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `gita_sloka` ADD CONSTRAINT `gita_sloka_number_bab_gita_bab_number_fk` FOREIGN KEY (`number_bab`) REFERENCES `gita_bab`(`number`) ON DELETE cascade ON UPDATE no action;