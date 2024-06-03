-- CreateTable
CREATE TABLE `UserClaimsHadiahStage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stageId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserClaimsHadiahStage_userId_stageId_key`(`userId`, `stageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserClaimsHadiahStage` ADD CONSTRAINT `UserClaimsHadiahStage_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClaimsHadiahStage` ADD CONSTRAINT `UserClaimsHadiahStage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
