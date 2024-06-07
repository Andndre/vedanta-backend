-- DropForeignKey
ALTER TABLE `AlarmDoa` DROP FOREIGN KEY `AlarmDoa_tugasId_fkey`;

-- AddForeignKey
ALTER TABLE `AlarmDoa` ADD CONSTRAINT `AlarmDoa_tugasId_fkey` FOREIGN KEY (`tugasId`) REFERENCES `HomeWorkDoa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
