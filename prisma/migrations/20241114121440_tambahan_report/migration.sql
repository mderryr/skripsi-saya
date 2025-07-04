/*
  Warnings:

  - You are about to drop the `StorageDatabase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Report"."StorageDatabase";

-- CreateTable
CREATE TABLE "Report"."PenyimpananBulanan" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "Bulan" INT4 NOT NULL,
    "Tahun" INT4 NOT NULL,
    "PenyuNaikTakBertelur" INT4 NOT NULL,
    "PenyuNaikBertelur" INT4 NOT NULL,
    "TotalTelurDiselamatkan" INT4 NOT NULL,
    "TotalTelurMenetas" INT4 NOT NULL,
    "TotalTelurTakMenetas" INT4 NOT NULL,
    "TotalTukikMatiDieawat" INT4 NOT NULL,
    "TotalTukikDilepaskan" INT4 NOT NULL,
    "TanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Tempat" INT4 NOT NULL,

    CONSTRAINT "PenyimpananBulanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report"."PenyimpananTahunan" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "Tahun" INT4 NOT NULL,
    "PenyuNaikTakBertelur" INT4 NOT NULL,
    "PenyuNaikBertelur" INT4 NOT NULL,
    "TotalTelurDiselamatkan" INT4 NOT NULL,
    "TotalTelurMenetas" INT4 NOT NULL,
    "TotalTelurTakMenetas" INT4 NOT NULL,
    "TotalTukikMatiDieawat" INT4 NOT NULL,
    "TotalTukikDilepaskan" INT4 NOT NULL,
    "TanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Tempat" INT4 NOT NULL,

    CONSTRAINT "PenyimpananTahunan_pkey" PRIMARY KEY ("id")
);
