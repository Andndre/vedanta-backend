/*
  Warnings:

  - A unique constraint covering the columns `[userId,doaId]` on the table `UserLikedDoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserLikedDoa_userId_doaId_key` ON `UserLikedDoa`(`userId`, `doaId`);
