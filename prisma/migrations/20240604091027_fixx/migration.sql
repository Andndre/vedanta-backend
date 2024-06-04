-- AlterTable
ALTER TABLE `AlarmDoa` ADD COLUMN `tugasId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AlarmDoa` ADD CONSTRAINT `AlarmDoa_tugasId_fkey` FOREIGN KEY (`tugasId`) REFERENCES `UserHomeworkDoa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
