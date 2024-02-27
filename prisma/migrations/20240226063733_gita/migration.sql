-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `GitaBab` (
    `number` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `titleHindi` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `translationIndo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GitaSloka` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `numberBab` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `translationIndo` TEXT NOT NULL,
    `makna` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GitaSloka` ADD CONSTRAINT `GitaSloka_numberBab_fkey` FOREIGN KEY (`numberBab`) REFERENCES `GitaBab`(`number`) ON DELETE CASCADE ON UPDATE CASCADE;
