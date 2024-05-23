-- AlterTable
ALTER TABLE `User` ADD COLUMN `bacaanSlokaTerakhirId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_bacaanSlokaTerakhirId_fkey` FOREIGN KEY (`bacaanSlokaTerakhirId`) REFERENCES `GitaSloka`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
