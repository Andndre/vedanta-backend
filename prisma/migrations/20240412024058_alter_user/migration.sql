/*
  Warnings:

  - You are about to drop the column `isTeacher` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshSession]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshSession` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isTeacher`,
    ADD COLUMN `refreshSession` VARCHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_refreshSession_key` ON `User`(`refreshSession`);
