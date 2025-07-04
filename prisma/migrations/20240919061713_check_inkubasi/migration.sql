/*
  Warnings:

  - You are about to drop the column `dilepas` on the `InkubasiPenyu` table. All the data in the column will be lost.
  - You are about to drop the column `idInkubasi` on the `Pelepasan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pelepasan" DROP CONSTRAINT "Pelepasan_idInkubasi_fkey";

-- DropIndex
DROP INDEX "Pelepasan_idInkubasi_idx";

-- AlterTable
ALTER TABLE "InkubasiPenyu" DROP COLUMN "dilepas";

-- AlterTable
ALTER TABLE "Pelepasan" DROP COLUMN "idInkubasi",
ADD COLUMN     "idInkubator" INTEGER;

-- CreateIndex
CREATE INDEX "Pelepasan_idInkubator_idx" ON "Pelepasan"("idInkubator");

-- AddForeignKey
ALTER TABLE "Pelepasan" ADD CONSTRAINT "Pelepasan_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "Inkubator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
