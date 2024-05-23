/*
  Warnings:

  - A unique constraint covering the columns `[userId,slokaId]` on the table `UserLikedGitaSloka` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserLikedGitaSloka_userId_slokaId_key` ON `UserLikedGitaSloka`(`userId`, `slokaId`);
