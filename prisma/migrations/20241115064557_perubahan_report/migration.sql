/*
  Warnings:

  - You are about to drop the column `TotalPenyuNaik` on the `PenyimpananBulanan` table. All the data in the column will be lost.
  - You are about to drop the column `TotalPenyuNaik` on the `PenyimpananTahunan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report"."PenyimpananBulanan" DROP COLUMN "TotalPenyuNaik";

-- AlterTable
ALTER TABLE "Report"."PenyimpananTahunan" DROP COLUMN "TotalPenyuNaik";
