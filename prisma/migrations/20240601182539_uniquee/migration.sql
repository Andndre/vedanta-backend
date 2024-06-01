/*
  Warnings:

  - A unique constraint covering the columns `[userId,quizId]` on the table `UserAnswerQuizEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,quizId]` on the table `UserQuizResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserAnswerQuizEntry_userId_quizId_key` ON `UserAnswerQuizEntry`(`userId`, `quizId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserQuizResult_userId_quizId_key` ON `UserQuizResult`(`userId`, `quizId`);
