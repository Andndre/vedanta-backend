/*
  Warnings:

  - A unique constraint covering the columns `[number,numberBab]` on the table `GitaSloka` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `GitaSloka_number_numberBab_idx` ON `GitaSloka`;

-- CreateIndex
CREATE UNIQUE INDEX `GitaSloka_number_numberBab_key` ON `GitaSloka`(`number`, `numberBab`);
