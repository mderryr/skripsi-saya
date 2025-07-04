/*
  Warnings:

  - You are about to drop the column `dilepas` on the `PenyuMati` table. All the data in the column will be lost.
  - You are about to drop the column `idPenyu` on the `PenyuNaik` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PenyuNaik" DROP CONSTRAINT "PenyuNaik_idPenyu_fkey";

-- DropIndex
DROP INDEX "PenyuNaik_idPenyu_idx";

-- AlterTable
ALTER TABLE "PenyuMati" DROP COLUMN "dilepas";

-- AlterTable
ALTER TABLE "PenyuNaik" DROP COLUMN "idPenyu";
