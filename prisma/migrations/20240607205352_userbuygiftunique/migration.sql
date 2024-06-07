/*
  Warnings:

  - A unique constraint covering the columns `[userId,giftId]` on the table `UserBuyGift` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserBuyGift_userId_giftId_key` ON `UserBuyGift`(`userId`, `giftId`);
