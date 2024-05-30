-- DropForeignKey
ALTER TABLE `AlarmDoa` DROP FOREIGN KEY `AlarmDoa_doaId_fkey`;

-- AlterTable
ALTER TABLE `AlarmDoa` MODIFY `doaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AlarmDoa` ADD CONSTRAINT `AlarmDoa_doaId_fkey` FOREIGN KEY (`doaId`) REFERENCES `Doa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
