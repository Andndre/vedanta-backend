-- AlterTable
ALTER TABLE `materi` MODIFY `kelasId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Kelas_classCode_pengajarId_idx` ON `Kelas`(`classCode`, `pengajarId`);

-- RenameIndex
ALTER TABLE `materi` RENAME INDEX `Materi_kelasId_fkey` TO `Materi_kelasId_idx`;

-- RenameIndex
ALTER TABLE `userkelas` RENAME INDEX `UserKelas_userId_fkey` TO `UserKelas_userId_idx`;
