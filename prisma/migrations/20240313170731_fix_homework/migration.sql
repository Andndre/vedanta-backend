/*
  Warnings:

  - Added the required column `homeWorkDoaId` to the `UserHomeworkDoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userhomeworkdoa` DROP FOREIGN KEY `UserHomeworkDoa_doaId_fkey`;

-- AlterTable
ALTER TABLE `userhomeworkdoa` ADD COLUMN `grade` INTEGER NULL,
    ADD COLUMN `homeWorkDoaId` INTEGER NOT NULL,
    MODIFY `doaId` INTEGER NULL,
    MODIFY `fileRecorded` VARCHAR(191) NULL,
    MODIFY `documentationImage` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_homeWorkDoaId_fkey` FOREIGN KEY (`homeWorkDoaId`) REFERENCES `HomeWorkDoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
