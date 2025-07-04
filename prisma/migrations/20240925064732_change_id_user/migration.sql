/*
  Warnings:

  - You are about to drop the column `penanggungJawab` on the `InkubasiPenyu` table. All the data in the column will be lost.
  - You are about to drop the column `penanggungJawab` on the `Pelepasan` table. All the data in the column will be lost.
  - You are about to drop the column `penanggungJawab` on the `PenyuMati` table. All the data in the column will be lost.
  - You are about to drop the column `penanggungJawab` on the `PenyuNaik` table. All the data in the column will be lost.
  - You are about to drop the column `penanggungJawab` on the `TelurDikerami` table. All the data in the column will be lost.
  - You are about to drop the column `penanggungJawab` on the `TelurMenetas` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUser]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomerTelp]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomerTelp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "InkubasiPenyu" DROP COLUMN "penanggungJawab",
ADD COLUMN     "idpenanggungJawab" TEXT;

-- AlterTable
ALTER TABLE "Pelepasan" DROP COLUMN "penanggungJawab",
ADD COLUMN     "idpenanggungJawab" TEXT;

-- AlterTable
ALTER TABLE "PenyuMati" DROP COLUMN "penanggungJawab",
ADD COLUMN     "idpenanggungJawab" TEXT;

-- AlterTable
ALTER TABLE "PenyuNaik" DROP COLUMN "penanggungJawab",
ADD COLUMN     "idpenanggungJawab" TEXT;

-- AlterTable
ALTER TABLE "TelurDikerami" DROP COLUMN "penanggungJawab",
ADD COLUMN     "idpenanggungJawab" TEXT;

-- AlterTable
ALTER TABLE "TelurMenetas" DROP COLUMN "penanggungJawab",
ADD COLUMN     "idpenanggungJawab" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "idUser" TEXT NOT NULL,
ADD COLUMN     "nomerTelp" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idpenanggungJawab_idx" ON "InkubasiPenyu"("idpenanggungJawab");

-- CreateIndex
CREATE INDEX "Pelepasan_idpenanggungJawab_idx" ON "Pelepasan"("idpenanggungJawab");

-- CreateIndex
CREATE INDEX "PenyuMati_idpenanggungJawab_idx" ON "PenyuMati"("idpenanggungJawab");

-- CreateIndex
CREATE INDEX "PenyuNaik_idZona_idx" ON "PenyuNaik"("idZona");

-- CreateIndex
CREATE INDEX "PenyuNaik_idpenanggungJawab_idx" ON "PenyuNaik"("idpenanggungJawab");

-- CreateIndex
CREATE INDEX "TelurDikerami_idpenanggungJawab_idx" ON "TelurDikerami"("idpenanggungJawab");

-- CreateIndex
CREATE INDEX "TelurMenetas_idpenanggungJawab_idx" ON "TelurMenetas"("idpenanggungJawab");

-- CreateIndex
CREATE UNIQUE INDEX "User_idUser_key" ON "User"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_nomerTelp_key" ON "User"("nomerTelp");

-- AddForeignKey
ALTER TABLE "PenyuNaik" ADD CONSTRAINT "PenyuNaik_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelurDikerami" ADD CONSTRAINT "TelurDikerami_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelurMenetas" ADD CONSTRAINT "TelurMenetas_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenyuMati" ADD CONSTRAINT "PenyuMati_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelepasan" ADD CONSTRAINT "Pelepasan_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;
