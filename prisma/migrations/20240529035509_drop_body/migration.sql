/*
  Warnings:

  - You are about to drop the column `body` on the `Discussion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Discussion_title_body_idx` ON `Discussion`;

-- AlterTable
ALTER TABLE `Discussion` DROP COLUMN `body`;

-- CreateIndex
CREATE FULLTEXT INDEX `Discussion_title_idx` ON `Discussion`(`title`);
