/*
  Warnings:

  - You are about to drop the column `materiId` on the `Quiz` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,missionId]` on the table `UserMission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_materiId_fkey`;

-- AlterTable
ALTER TABLE `MissionType` ADD COLUMN `colorBg` VARCHAR(191) NOT NULL DEFAULT '#FFFFFF';

-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `materiId`,
    ADD COLUMN `stageId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materiId` INTEGER NOT NULL,
    `kelasId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image_path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserMission_userId_missionId_key` ON `UserMission`(`userId`, `missionId`);

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_kelasId_fkey` FOREIGN KEY (`kelasId`) REFERENCES `Kelas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_materiId_fkey` FOREIGN KEY (`materiId`) REFERENCES `Materi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
