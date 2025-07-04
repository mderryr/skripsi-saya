/*
  Warnings:

  - You are about to drop the column `idPenyu` on the `TelurDikerami` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TelurDikerami" DROP CONSTRAINT "TelurDikerami_idPenyu_fkey";

-- DropIndex
DROP INDEX "TelurDikerami_idPenyu_idx";

-- AlterTable
ALTER TABLE "InkubasiPenyu" ADD COLUMN     "idPenyu" INTEGER;

-- AlterTable
ALTER TABLE "TelurDikerami" DROP COLUMN "idPenyu";

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idPenyu_idx" ON "InkubasiPenyu"("idPenyu");

-- AddForeignKey
ALTER TABLE "InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
