/*
  Warnings:

  - A unique constraint covering the columns `[classCode]` on the table `Kelas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer` to the `UserAnswersQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discussion` ADD COLUMN `kelasId` INTEGER NULL;

-- AlterTable
ALTER TABLE `useranswersquestion` ADD COLUMN `answer` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userlikeddiscussion` ADD COLUMN `grade` INTEGER NULL;

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
    `doaId` INTEGER NOT NULL,
    `timeSetAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fileRecorded` VARCHAR(191) NOT NULL,
    `documentationImage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Kelas_classCode_key` ON `Kelas`(`classCode`);

-- AddForeignKey
ALTER TABLE `Discussion` ADD CONSTRAINT `Discussion_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomeWorkDoa` ADD CONSTRAINT `HomeWorkDoa_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HomeWorkDoa` ADD CONSTRAINT `HomeWorkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
