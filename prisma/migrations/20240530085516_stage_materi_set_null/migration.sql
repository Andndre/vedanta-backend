-- DropForeignKey
ALTER TABLE `Stage` DROP FOREIGN KEY `Stage_materiId_fkey`;

-- AddForeignKey
ALTER TABLE `Stage` ADD CONSTRAINT `Stage_materiId_fkey` FOREIGN KEY (`materiId`) REFERENCES `Materi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
