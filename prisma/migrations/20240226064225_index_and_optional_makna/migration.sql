-- AlterTable
ALTER TABLE `GitaSloka` MODIFY `makna` TEXT NULL;

-- CreateIndex
CREATE INDEX `GitaBab_number_idx` ON `GitaBab`(`number`);

-- CreateIndex
CREATE INDEX `GitaSloka_number_numberBab_idx` ON `GitaSloka`(`number`, `numberBab`);
