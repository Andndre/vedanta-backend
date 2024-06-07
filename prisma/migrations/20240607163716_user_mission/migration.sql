/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserMission` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `UserMission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserMission` DROP COLUMN `createdAt`,
    DROP COLUMN `progress`;
