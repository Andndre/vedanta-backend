/*
  Warnings:

  - A unique constraint covering the columns `[userId,kelasId]` on the table `UserKelas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserKelas_userId_kelasId_key` ON `UserKelas`(`userId`, `kelasId`);
