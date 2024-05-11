-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `activeStreak` INTEGER NOT NULL DEFAULT 0,
    `lastActiveAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `refreshSession` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_refreshSession_key`(`refreshSession`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GitaBab` (
    `number` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `titleHindi` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `translationIndo` VARCHAR(191) NOT NULL,

    INDEX `GitaBab_number_idx`(`number`),
    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GitaSloka` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `numberBab` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `translationIndo` TEXT NOT NULL,
    `makna` TEXT NULL,

    UNIQUE INDEX `GitaSloka_number_numberBab_key`(`number`, `numberBab`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatSession` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ChatSession_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,
    `parts` TEXT NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,

    INDEX `MessageHistory_sessionId_idx`(`sessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLikedGitaSloka` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `slokaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discussion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(300) NOT NULL,
    `body` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `repliesCount` INTEGER NOT NULL DEFAULT 0,
    `likesCount` INTEGER NOT NULL DEFAULT 0,
    `creatorId` VARCHAR(191) NOT NULL,
    `kelasId` INTEGER NULL,

    INDEX `Discussion_creatorId_idx`(`creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLikedDiscussion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `discussionId` INTEGER NOT NULL,
    `grade` INTEGER NULL,

    INDEX `UserLikedDiscussion_userId_discussionId_idx`(`userId`, `discussionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiscussionReply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discussionId` INTEGER NOT NULL,
    `reply` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `likesCount` INTEGER NOT NULL DEFAULT 0,

    INDEX `DiscussionReply_discussionId_idx`(`discussionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLikedDiscussionReply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `discussionReplyId` INTEGER NOT NULL,
    `grade` INTEGER NULL,

    INDEX `UserLikedDiscussionReply_userId_discussionReplyId_idx`(`userId`, `discussionReplyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `pelafalanFile` VARCHAR(191) NULL,

    INDEX `Doa_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLikedDoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `doaId` INTEGER NOT NULL,

    INDEX `UserLikedDoa_userId_doaId_idx`(`userId`, `doaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlarmDoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ulangiDoa` INTEGER NOT NULL,
    `doaId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `jam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `label` VARCHAR(191) NOT NULL DEFAULT 'Alarm Doa',

    INDEX `AlarmDoa_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `classCode` VARCHAR(191) NOT NULL,
    `pengajarId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kelas_classCode_key`(`classCode`),
    INDEX `Kelas_classCode_pengajarId_idx`(`classCode`, `pengajarId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserKelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `kelasId` INTEGER NOT NULL,

    INDEX `UserKelas_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `videoLink` VARCHAR(191) NOT NULL,
    `kelasId` INTEGER NULL,
    `description` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    INDEX `Materi_kelasId_idx`(`kelasId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `materiId` INTEGER NULL,
    `fromTemplateId` INTEGER NULL,
    `kelasId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `timeLimit` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `correct` INTEGER NOT NULL,
    `questionModel` JSON NOT NULL,
    `scoreCorrect` INTEGER NOT NULL,
    `scoreIncorrect` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserQuizResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `scoreTotal` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `quizId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAnswerQuizEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `quizResultId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeWorkDoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kelasId` INTEGER NOT NULL,
    `doaId` INTEGER NOT NULL,
    `deadline` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserHomeworkDoa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `timeSetAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fileRecorded` VARCHAR(191) NULL,
    `documentationImage` VARCHAR(191) NULL,
    `grade` INTEGER NULL,
    `homeWorkDoaId` INTEGER NOT NULL,
    `doaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `prize` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBuyGift` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `giftId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BadgeType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Badge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `parameter` INTEGER NOT NULL,
    `badgeTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBadge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `badgeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MissionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `maxProgress` INTEGER NOT NULL,
    `rewardStars` INTEGER NOT NULL,
    `missionTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `missionId` INTEGER NOT NULL,
    `progress` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GitaSloka` ADD CONSTRAINT `GitaSloka_numberBab_fkey` FOREIGN KEY (`numberBab`) REFERENCES `GitaBab`(`number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatSession` ADD CONSTRAINT `ChatSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageHistory` ADD CONSTRAINT `MessageHistory_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `ChatSession`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedGitaSloka` ADD CONSTRAINT `UserLikedGitaSloka_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedGitaSloka` ADD CONSTRAINT `UserLikedGitaSloka_slokaId_fkey` FOREIGN KEY (`slokaId`) REFERENCES `GitaSloka`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discussion` ADD CONSTRAINT `Discussion_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discussion` ADD CONSTRAINT `Discussion_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDiscussion` ADD CONSTRAINT `UserLikedDiscussion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDiscussion` ADD CONSTRAINT `UserLikedDiscussion_discussionId_fkey` FOREIGN KEY (`discussionId`) REFERENCES `Discussion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscussionReply` ADD CONSTRAINT `DiscussionReply_discussionId_fkey` FOREIGN KEY (`discussionId`) REFERENCES `Discussion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDiscussionReply` ADD CONSTRAINT `UserLikedDiscussionReply_discussionReplyId_fkey` FOREIGN KEY (`discussionReplyId`) REFERENCES `DiscussionReply`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDiscussionReply` ADD CONSTRAINT `UserLikedDiscussionReply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDoa` ADD CONSTRAINT `UserLikedDoa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDoa` ADD CONSTRAINT `UserLikedDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlarmDoa` ADD CONSTRAINT `AlarmDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlarmDoa` ADD CONSTRAINT `AlarmDoa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_pengajarId_fkey` FOREIGN KEY (`pengajarId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserKelas` ADD CONSTRAINT `UserKelas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserKelas` ADD CONSTRAINT `UserKelas_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materi` ADD CONSTRAINT `Materi_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_materiId_fkey` FOREIGN KEY (`materiId`) REFERENCES `Materi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_fromTemplateId_fkey` FOREIGN KEY (`fromTemplateId`) REFERENCES `Quiz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizEntry` ADD CONSTRAINT `QuizEntry_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuizResult` ADD CONSTRAINT `UserQuizResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuizResult` ADD CONSTRAINT `UserQuizResult_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnswerQuizEntry` ADD CONSTRAINT `UserAnswerQuizEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnswerQuizEntry` ADD CONSTRAINT `UserAnswerQuizEntry_quizResultId_fkey` FOREIGN KEY (`quizResultId`) REFERENCES `UserQuizResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnswerQuizEntry` ADD CONSTRAINT `UserAnswerQuizEntry_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `QuizEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomeWorkDoa` ADD CONSTRAINT `HomeWorkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomeWorkDoa` ADD CONSTRAINT `HomeWorkDoa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_homeWorkDoaId_fkey` FOREIGN KEY (`homeWorkDoaId`) REFERENCES `HomeWorkDoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBuyGift` ADD CONSTRAINT `UserBuyGift_giftId_fkey` FOREIGN KEY (`giftId`) REFERENCES `Gift`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBuyGift` ADD CONSTRAINT `UserBuyGift_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Badge` ADD CONSTRAINT `Badge_badgeTypeId_fkey` FOREIGN KEY (`badgeTypeId`) REFERENCES `BadgeType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBadge` ADD CONSTRAINT `UserBadge_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBadge` ADD CONSTRAINT `UserBadge_badgeId_fkey` FOREIGN KEY (`badgeId`) REFERENCES `Badge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_missionTypeId_fkey` FOREIGN KEY (`missionTypeId`) REFERENCES `MissionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMission` ADD CONSTRAINT `UserMission_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMission` ADD CONSTRAINT `UserMission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserNotification` ADD CONSTRAINT `UserNotification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
