/*
  Warnings:

  - You are about to drop the column `TotalTukikMatiDieawat` on the `PenyimpananBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `TotalTukikMatiDieawat` on the `PenyimpananTahunan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idDok]` on the table `PenyimpananBulanan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idDok]` on the table `PenyimpananTahunan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TotalPenyuNaik` to the `PenyimpananBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalTukikMati` to the `PenyimpananBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDok` to the `PenyimpananBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalPenyuNaik` to the `PenyimpananTahunan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalTukikMati` to the `PenyimpananTahunan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idDok` to the `PenyimpananTahunan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report"."PenyimpananBulanan" DROP COLUMN "TotalTukikMatiDieawat";
ALTER TABLE "Report"."PenyimpananBulanan" ADD COLUMN     "TotalPenyuNaik" INT4 NOT NULL;
ALTER TABLE "Report"."PenyimpananBulanan" ADD COLUMN     "TotalTukikMati" INT4 NOT NULL;
ALTER TABLE "Report"."PenyimpananBulanan" ADD COLUMN     "idDok" STRING NOT NULL;
ALTER TABLE "Report"."PenyimpananBulanan" ALTER COLUMN "Tempat" SET DATA TYPE STRING;

-- AlterTable
ALTER TABLE "Report"."PenyimpananTahunan" DROP COLUMN "TotalTukikMatiDieawat";
ALTER TABLE "Report"."PenyimpananTahunan" ADD COLUMN     "TotalPenyuNaik" INT4 NOT NULL;
ALTER TABLE "Report"."PenyimpananTahunan" ADD COLUMN     "TotalTukikMati" INT4 NOT NULL;
ALTER TABLE "Report"."PenyimpananTahunan" ADD COLUMN     "idDok" STRING NOT NULL;
ALTER TABLE "Report"."PenyimpananTahunan" ALTER COLUMN "Tempat" SET DATA TYPE STRING;

-- CreateIndex
CREATE UNIQUE INDEX "PenyimpananBulanan_idDok_key" ON "Report"."PenyimpananBulanan"("idDok");

-- CreateIndex
CREATE UNIQUE INDEX "PenyimpananTahunan_idDok_key" ON "Report"."PenyimpananTahunan"("idDok");
