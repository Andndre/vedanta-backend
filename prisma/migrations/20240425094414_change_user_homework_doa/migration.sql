-- DropForeignKey
ALTER TABLE `userhomeworkdoa` DROP FOREIGN KEY `UserHomeworkDoa_doaId_fkey`;

-- AddForeignKey
ALTER TABLE `UserHomeworkDoa` ADD CONSTRAINT `UserHomeworkDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
