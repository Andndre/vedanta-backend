/*
  Warnings:

  - You are about to drop the column `hari` on the `UserHomeworkDoa` table. All the data in the column will be lost.
  - You are about to drop the column `timeSetAt` on the `UserHomeworkDoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserHomeworkDoa` DROP COLUMN `hari`,
    DROP COLUMN `timeSetAt`;
