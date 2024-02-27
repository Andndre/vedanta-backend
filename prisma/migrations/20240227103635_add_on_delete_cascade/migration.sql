-- DropForeignKey
ALTER TABLE `ChatSession` DROP FOREIGN KEY `ChatSession_userId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageHistory` DROP FOREIGN KEY `MessageHistory_sessionId_fkey`;

-- AddForeignKey
ALTER TABLE `ChatSession` ADD CONSTRAINT `ChatSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageHistory` ADD CONSTRAINT `MessageHistory_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ChatSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
