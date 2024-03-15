/*
  Warnings:

  - You are about to drop the column `score` on the `useranswersquiz` table. All the data in the column will be lost.
  - Added the required column `answer` to the `UserAnswersQuiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useranswersquiz` DROP COLUMN `score`,
    ADD COLUMN `answer` VARCHAR(191) NOT NULL;
