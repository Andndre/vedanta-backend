/*
  Warnings:

  - Added the required column `creatorId` to the `DiscussionReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DiscussionReply` ADD COLUMN `creatorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DiscussionReply` ADD CONSTRAINT `DiscussionReply_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
