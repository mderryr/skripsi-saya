/*
  Warnings:

  - Changed the type of `idTempat` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "DataKonservasi"."User" DROP CONSTRAINT "User_idTempat_fkey";

-- AlterTable
ALTER TABLE "DataKonservasi"."User" DROP COLUMN "idTempat";
ALTER TABLE "DataKonservasi"."User" ADD COLUMN     "idTempat" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."User" ADD CONSTRAINT "User_idTempat_fkey" FOREIGN KEY ("idTempat") REFERENCES "DataKonservasi"."TempatKonservasi"("idTempat") ON DELETE RESTRICT ON UPDATE CASCADE;
