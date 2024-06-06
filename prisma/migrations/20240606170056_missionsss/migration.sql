/*
  Warnings:

  - You are about to drop the column `description` on the `Mission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Mission` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `stageCompleted` INTEGER NOT NULL DEFAULT 0;
