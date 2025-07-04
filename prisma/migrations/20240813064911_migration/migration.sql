/*
  Warnings:

  - You are about to drop the `TentangTempat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idTempat` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InkubasiPenyu" ADD COLUMN     "Keterangan" TEXT;

-- AlterTable
ALTER TABLE "Pelepasan" ADD COLUMN     "Keterangan" TEXT;

-- AlterTable
ALTER TABLE "PenyuMati" ADD COLUMN     "Keterangan" TEXT;

-- AlterTable
ALTER TABLE "PenyuNaik" ADD COLUMN     "Keterangan" TEXT,
ADD COLUMN     "idZona" INTEGER;

-- AlterTable
ALTER TABLE "TelurDikerami" ADD COLUMN     "Keterangan" TEXT;

-- AlterTable
ALTER TABLE "TelurMenetas" ADD COLUMN     "Keterangan" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idTempat" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TentangTempat";

-- CreateTable
CREATE TABLE "TempatKonservasi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "foto" TEXT,

    CONSTRAINT "TempatKonservasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zona" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idTempat_fkey" FOREIGN KEY ("idTempat") REFERENCES "TempatKonservasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenyuNaik" ADD CONSTRAINT "PenyuNaik_idZona_fkey" FOREIGN KEY ("idZona") REFERENCES "Zona"("id") ON DELETE SET NULL ON UPDATE CASCADE;
