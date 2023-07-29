/*
  Warnings:

  - The `newsUrl` column on the `news` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "news" DROP COLUMN "newsUrl",
ADD COLUMN     "newsUrl" TEXT[];
