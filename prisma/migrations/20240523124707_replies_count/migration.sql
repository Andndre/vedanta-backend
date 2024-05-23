-- AlterTable
ALTER TABLE `DiscussionReply` ADD COLUMN `discussionReplyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `DiscussionReply` ADD CONSTRAINT `DiscussionReply_discussionReplyId_fkey` FOREIGN KEY (`discussionReplyId`) REFERENCES `DiscussionReply`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
