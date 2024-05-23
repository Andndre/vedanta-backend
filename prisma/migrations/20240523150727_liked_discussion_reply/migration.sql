/*
  Warnings:

  - A unique constraint covering the columns `[userId,discussionReplyId]` on the table `UserLikedDiscussionReply` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserLikedDiscussionReply_userId_discussionReplyId_key` ON `UserLikedDiscussionReply`(`userId`, `discussionReplyId`);
