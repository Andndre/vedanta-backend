/*
  Warnings:

  - A unique constraint covering the columns `[userId,discussionId]` on the table `UserLikedDiscussion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserLikedDiscussion_userId_discussionId_key` ON `UserLikedDiscussion`(`userId`, `discussionId`);
