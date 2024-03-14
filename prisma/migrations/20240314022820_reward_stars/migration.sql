/*
  Warnings:

  - Added the required column `rewardStars` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mission` ADD COLUMN `rewardStars` INTEGER NOT NULL;
