/*
  Warnings:

  - You are about to drop the column `stageCompleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `stageCompleted`,
    ADD COLUMN `discussionsAsked` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `ganeshBotMessages` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `quizCompleted` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `stagesCompleted` INTEGER NOT NULL DEFAULT 0;
