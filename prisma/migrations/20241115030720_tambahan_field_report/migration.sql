/*
  Warnings:

  - Added the required column `idUser` to the `PenyimpananBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `PenyimpananTahunan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report"."PenyimpananBulanan" ADD COLUMN     "TanggalUpdate" TIMESTAMP(3);
ALTER TABLE "Report"."PenyimpananBulanan" ADD COLUMN     "idUser" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Report"."PenyimpananTahunan" ADD COLUMN     "TanggalUpdate" TIMESTAMP(3);
ALTER TABLE "Report"."PenyimpananTahunan" ADD COLUMN     "idUser" STRING NOT NULL;
