/*
  Warnings:

  - The primary key for the `MessageHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `MessageHistory` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `MessageHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `MessageHistory` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
