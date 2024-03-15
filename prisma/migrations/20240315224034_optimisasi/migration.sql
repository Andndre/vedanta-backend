/*
  Warnings:

  - You are about to drop the column `rule` on the `badge` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `timeLimit` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiztemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `useranswersquestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `useranswersquiz` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `badgeTypeId` to the `Badge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parameter` to the `Badge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `missionTypeId` to the `Mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `discussion` DROP FOREIGN KEY `Discussion_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `homeworkdoa` DROP FOREIGN KEY `HomeWorkDoa_doaId_fkey`;

-- DropForeignKey
ALTER TABLE `homeworkdoa` DROP FOREIGN KEY `HomeWorkDoa_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `materi` DROP FOREIGN KEY `Materi_kelasId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `quiztemplate` DROP FOREIGN KEY `QuizTemplate_materiId_fkey`;

-- DropForeignKey
ALTER TABLE `quiztemplate` DROP FOREIGN KEY `QuizTemplate_userId_fkey`;

-- DropForeignKey
ALTER TABLE `useranswersquestion` DROP FOREIGN KEY `UserAnswersQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `useranswersquestion` DROP FOREIGN KEY `UserAnswersQuestion_userId_fkey`;

-- DropForeignKey
ALTER TABLE `useranswersquiz` DROP FOREIGN KEY `UserAnswersQuiz_quizId_fkey`;

-- DropForeignKey
ALTER TABLE `useranswersquiz` DROP FOREIGN KEY `UserAnswersQuiz_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userhomeworkdoa` DROP FOREIGN KEY `UserHomeworkDoa_doaId_fkey`;

-- DropForeignKey
ALTER TABLE `userhomeworkdoa` DROP FOREIGN KEY `UserHomeworkDoa_homeWorkDoaId_fkey`;

-- AlterTable
ALTER TABLE `badge` DROP COLUMN `rule`,
    ADD COLUMN `badgeTypeId` INTEGER NOT NULL,
    ADD COLUMN `parameter` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `mission` DROP COLUMN `name`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `missionTypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `creatorId`,
    DROP COLUMN `question`,
    DROP COLUMN `startedAt`,
    DROP COLUMN `timeLimit`,
    ADD COLUMN `fromTemplateId` INTEGER NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `question`;

-- DropTable
DROP TABLE `quiztemplate`;

-- DropTable
DROP TABLE `useranswersquestion`;

-- DropTable
DROP TABLE `useranswersquiz`;

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
CREATE TABLE `MissionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discussion` ADD CONSTRAINT `Discussion_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materi` ADD CONSTRAINT `Materi_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_fromTemplateId_fkey` FOREIGN KEY (`fromTemplateId`) REFERENCES `Quiz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizEntry` ADD CONSTRAINT `QuizEntry_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuizResult` ADD CONSTRAINT `UserQuizResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuizResult` ADD CONSTRAINT `UserQuizResult_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnswerQuizEntry` ADD CONSTRAINT `UserAnswerQuizEntry_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `QuizEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnswerQuizEntry` ADD CONSTRAINT `UserAnswerQuizEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnswerQuizEntry` ADD CONSTRAINT `UserAnswerQuizEntry_quizResultId_fkey` FOREIGN KEY (`quizResultId`) REFERENCES `UserQuizResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomeWorkDoa` ADD CONSTRAINT `HomeWorkDoa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomeWorkDoa` ADD CONSTRAINT `HomeWorkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_homeWorkDoaId_fkey` FOREIGN KEY (`homeWorkDoaId`) REFERENCES `HomeWorkDoa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBuyGift` ADD CONSTRAINT `UserBuyGift_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBuyGift` ADD CONSTRAINT `UserBuyGift_giftId_fkey` FOREIGN KEY (`giftId`) REFERENCES `Gift`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Badge` ADD CONSTRAINT `Badge_badgeTypeId_fkey` FOREIGN KEY (`badgeTypeId`) REFERENCES `BadgeType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_missionTypeId_fkey` FOREIGN KEY (`missionTypeId`) REFERENCES `MissionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
