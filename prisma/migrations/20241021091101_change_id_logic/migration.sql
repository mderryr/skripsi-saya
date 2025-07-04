/*
  Warnings:

  - The `idPenyu` column on the `InkubasiPenyu` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `idInkubator` column on the `Pelepasan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `idPenyu` column on the `PenyuMati` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `idInkubator` column on the `PenyuMati` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `idPenyu` column on the `TelurMenetas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[idPenyuMenetas]` on the table `InkubasiPenyu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idInkubator]` on the table `Inkubator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idJenisPenyu]` on the table `JenisPenyu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idPenyuDikerami]` on the table `TelurMenetas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idTempat]` on the table `TempatKonservasi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idZona]` on the table `Zona` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `idInkubator` on the `InkubasiPenyu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `idInkubator` to the `Inkubator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idJenisPenyu` to the `JenisPenyu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idTempat` to the `TempatKonservasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idZona` to the `Zona` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" DROP CONSTRAINT "InkubasiPenyu_idInkubator_fkey";

-- DropForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" DROP CONSTRAINT "InkubasiPenyu_idPenyu_fkey";

-- DropForeignKey
ALTER TABLE "DataKonservasi"."Pelepasan" DROP CONSTRAINT "Pelepasan_idInkubator_fkey";

-- DropForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" DROP CONSTRAINT "PenyuMati_idInkubator_fkey";

-- DropForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" DROP CONSTRAINT "PenyuMati_idPenyu_fkey";

-- DropForeignKey
ALTER TABLE "DataKonservasi"."TelurMenetas" DROP CONSTRAINT "TelurMenetas_idPenyu_fkey";

-- AlterTable
ALTER TABLE "DataKonservasi"."InkubasiPenyu" DROP COLUMN "idInkubator";
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD COLUMN     "idInkubator" STRING NOT NULL;
ALTER TABLE "DataKonservasi"."InkubasiPenyu" DROP COLUMN "idPenyu";
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD COLUMN     "idPenyu" STRING;

-- AlterTable
ALTER TABLE "DataKonservasi"."Inkubator" ADD COLUMN     "idInkubator" STRING NOT NULL;

-- AlterTable
ALTER TABLE "DataKonservasi"."JenisPenyu" ADD COLUMN     "idJenisPenyu" STRING NOT NULL;

-- AlterTable
ALTER TABLE "DataKonservasi"."Pelepasan" DROP COLUMN "idInkubator";
ALTER TABLE "DataKonservasi"."Pelepasan" ADD COLUMN     "idInkubator" STRING;

-- AlterTable
ALTER TABLE "DataKonservasi"."PenyuMati" DROP COLUMN "idPenyu";
ALTER TABLE "DataKonservasi"."PenyuMati" ADD COLUMN     "idPenyu" STRING;
ALTER TABLE "DataKonservasi"."PenyuMati" DROP COLUMN "idInkubator";
ALTER TABLE "DataKonservasi"."PenyuMati" ADD COLUMN     "idInkubator" STRING;

-- AlterTable
ALTER TABLE "DataKonservasi"."TelurMenetas" DROP COLUMN "idPenyu";
ALTER TABLE "DataKonservasi"."TelurMenetas" ADD COLUMN     "idPenyu" STRING;

-- AlterTable
ALTER TABLE "DataKonservasi"."TempatKonservasi" ADD COLUMN     "idTempat" STRING NOT NULL;

-- AlterTable
ALTER TABLE "DataKonservasi"."Zona" ADD COLUMN     "idZona" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InkubasiPenyu_idPenyuMenetas_key" ON "DataKonservasi"."InkubasiPenyu"("idPenyuMenetas");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idInkubator_idx" ON "DataKonservasi"."InkubasiPenyu"("idInkubator");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idPenyu_idx" ON "DataKonservasi"."InkubasiPenyu"("idPenyu");

-- CreateIndex
CREATE UNIQUE INDEX "Inkubator_idInkubator_key" ON "DataKonservasi"."Inkubator"("idInkubator");

-- CreateIndex
CREATE UNIQUE INDEX "JenisPenyu_idJenisPenyu_key" ON "DataKonservasi"."JenisPenyu"("idJenisPenyu");

-- CreateIndex
CREATE INDEX "Pelepasan_idInkubator_idx" ON "DataKonservasi"."Pelepasan"("idInkubator");

-- CreateIndex
CREATE INDEX "PenyuMati_idPenyu_idx" ON "DataKonservasi"."PenyuMati"("idPenyu");

-- CreateIndex
CREATE INDEX "PenyuMati_idInkubator_idx" ON "DataKonservasi"."PenyuMati"("idInkubator");

-- CreateIndex
CREATE UNIQUE INDEX "TelurMenetas_idPenyuDikerami_key" ON "DataKonservasi"."TelurMenetas"("idPenyuDikerami");

-- CreateIndex
CREATE INDEX "TelurMenetas_idPenyu_idx" ON "DataKonservasi"."TelurMenetas"("idPenyu");

-- CreateIndex
CREATE UNIQUE INDEX "TempatKonservasi_idTempat_key" ON "DataKonservasi"."TempatKonservasi"("idTempat");

-- CreateIndex
CREATE UNIQUE INDEX "Zona_idZona_key" ON "DataKonservasi"."Zona"("idZona");

-- AddForeignKey
ALTER TABLE "DataKonservasi"."TelurMenetas" ADD CONSTRAINT "TelurMenetas_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "DataKonservasi"."JenisPenyu"("idJenisPenyu") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "DataKonservasi"."Inkubator"("idInkubator") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "DataKonservasi"."JenisPenyu"("idJenisPenyu") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" ADD CONSTRAINT "PenyuMati_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "DataKonservasi"."Inkubator"("idInkubator") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" ADD CONSTRAINT "PenyuMati_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "DataKonservasi"."JenisPenyu"("idJenisPenyu") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."Pelepasan" ADD CONSTRAINT "Pelepasan_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "DataKonservasi"."Inkubator"("idInkubator") ON DELETE SET NULL ON UPDATE CASCADE;
