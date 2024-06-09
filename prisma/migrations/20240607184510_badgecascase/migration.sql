-- DropForeignKey
ALTER TABLE `Badge` DROP FOREIGN KEY `Badge_badgeTypeId_fkey`;

-- AddForeignKey
ALTER TABLE `Badge` ADD CONSTRAINT `Badge_badgeTypeId_fkey` FOREIGN KEY (`badgeTypeId`) REFERENCES `BadgeType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
