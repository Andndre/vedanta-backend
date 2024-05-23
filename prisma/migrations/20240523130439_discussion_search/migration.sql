-- CreateIndex
CREATE FULLTEXT INDEX `Discussion_title_body_idx` ON `Discussion`(`title`, `body`);
