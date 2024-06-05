-- DropForeignKey
ALTER TABLE `DiscussionReply` DROP FOREIGN KEY `DiscussionReply_discussionReplyId_fkey`;

-- AddForeignKey
ALTER TABLE `DiscussionReply` ADD CONSTRAINT `DiscussionReply_discussionReplyId_fkey` FOREIGN KEY (`discussionReplyId`) REFERENCES `DiscussionReply`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
