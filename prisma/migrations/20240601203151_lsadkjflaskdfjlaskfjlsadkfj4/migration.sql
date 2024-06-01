/*
  Warnings:

  - A unique constraint covering the columns `[userId,quizId]` on the table `UserAnswerQuizEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserAnswerQuizEntry_userId_quizId_key` ON `UserAnswerQuizEntry`(`userId`, `quizId`);
