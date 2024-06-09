/*
  Warnings:

  - You are about to drop the column `points_reward_finished` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `points_reward_per_quiz` on the `Stage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Stage` DROP COLUMN `points_reward_finished`,
    DROP COLUMN `points_reward_per_quiz`;
