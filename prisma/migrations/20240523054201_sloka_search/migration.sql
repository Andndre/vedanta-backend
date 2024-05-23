-- DropIndex
DROP INDEX `GitaSloka_content_idx` ON `GitaSloka`;

-- DropIndex
DROP INDEX `GitaSloka_translationIndo_idx` ON `GitaSloka`;

-- CreateIndex
CREATE FULLTEXT INDEX `GitaSloka_translationIndo_content_idx` ON `GitaSloka`(`translationIndo`, `content`);
