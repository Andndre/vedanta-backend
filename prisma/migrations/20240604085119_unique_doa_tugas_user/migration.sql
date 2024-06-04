/*
  Warnings:

  - A unique constraint covering the columns `[userId,homeWorkDoaId]` on the table `UserHomeworkDoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserHomeworkDoa_userId_homeWorkDoaId_key` ON `UserHomeworkDoa`(`userId`, `homeWorkDoaId`);
