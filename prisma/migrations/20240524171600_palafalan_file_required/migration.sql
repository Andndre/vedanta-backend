/*
  Warnings:

  - Made the column `pelafalanFile` on table `Doa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Doa` MODIFY `pelafalanFile` VARCHAR(191) NOT NULL;
