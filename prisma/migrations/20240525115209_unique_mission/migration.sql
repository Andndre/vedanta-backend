/*
  Warnings:

  - A unique constraint covering the columns `[missionTypeId]` on the table `Mission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Mission_missionTypeId_key` ON `Mission`(`missionTypeId`);
