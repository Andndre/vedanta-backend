/*
  Warnings:

  - You are about to drop the column `kelasId` on the `Stage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Stage` DROP FOREIGN KEY `Stage_kelasId_fkey`;

-- AlterTable
ALTER TABLE `Stage` DROP COLUMN `kelasId`;
