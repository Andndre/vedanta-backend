/*
  Warnings:

  - You are about to drop the column `doaId` on the `UserHomeworkDoa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserHomeworkDoa` DROP FOREIGN KEY `UserHomeworkDoa_doaId_fkey`;

-- AlterTable
ALTER TABLE `UserHomeworkDoa` DROP COLUMN `doaId`;
