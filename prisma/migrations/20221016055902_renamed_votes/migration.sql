/*
  Warnings:

  - You are about to drop the column `negVotes` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `posVotes` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `looserVotes` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winnerVotes` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pokemon` DROP COLUMN `negVotes`,
    DROP COLUMN `posVotes`,
    ADD COLUMN `looserVotes` INTEGER NOT NULL,
    ADD COLUMN `winnerVotes` INTEGER NOT NULL;
