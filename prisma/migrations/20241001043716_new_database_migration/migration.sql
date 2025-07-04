-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "DataKonservasi";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "Report";

-- CreateTable
CREATE TABLE "DataKonservasi"."User" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idUser" STRING NOT NULL,
    "nomerTelp" STRING,
    "username" STRING NOT NULL,
    "name" STRING NOT NULL,
    "password" STRING NOT NULL,
    "admin" BOOL DEFAULT false,
    "idTempat" INT8 NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."TempatKonservasi" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "nama" STRING NOT NULL,
    "alamat" STRING NOT NULL,
    "foto" STRING,

    CONSTRAINT "TempatKonservasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."JenisPenyu" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "nama" STRING NOT NULL,
    "namaIlmiah" STRING,

    CONSTRAINT "JenisPenyu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."PenyuNaik" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idDok" STRING NOT NULL,
    "dikerami" BOOL DEFAULT false,
    "jumlahPenyu" INT4 DEFAULT 0,
    "penyuBertelur" BOOL NOT NULL DEFAULT true,
    "telurDiselamatkan" INT4,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "Keterangan" STRING,
    "create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "idpenanggungJawab" STRING,
    "idZona" INT8,

    CONSTRAINT "PenyuNaik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."TelurDikerami" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idDok" STRING NOT NULL,
    "menetas" BOOL DEFAULT false,
    "telurBaik" INT4,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "Keterangan" STRING,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "idpenanggungJawab" STRING,
    "idPenyuNaik" STRING,

    CONSTRAINT "TelurDikerami_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."TelurMenetas" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idDok" STRING NOT NULL,
    "diinkubasi" BOOL DEFAULT false,
    "telurMenetas" INT4,
    "telurRusak" INT4,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "Keterangan" STRING,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "idpenanggungJawab" STRING,
    "idPenyu" INT8,
    "idPenyuDikerami" STRING,

    CONSTRAINT "TelurMenetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."InkubasiPenyu" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idDok" STRING NOT NULL,
    "JumlahTukik" INT4 NOT NULL,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "Keterangan" STRING,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "idpenanggungJawab" STRING,
    "idInkubator" INT8 NOT NULL,
    "idPenyu" INT8,
    "idPenyuMenetas" STRING,

    CONSTRAINT "InkubasiPenyu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."PenyuMati" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idDok" STRING NOT NULL,
    "penyuMati" INT4,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "Keterangan" STRING,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "idpenanggungJawab" STRING,
    "idPenyu" INT8,
    "idInkubator" INT8,

    CONSTRAINT "PenyuMati_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."Pelepasan" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "idDok" STRING NOT NULL,
    "JumlahTukik" INT4 NOT NULL,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "Keterangan" STRING,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "idpenanggungJawab" STRING,
    "idInkubator" INT8,

    CONSTRAINT "Pelepasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."Inkubator" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "namaInkubator" STRING NOT NULL,
    "tukikHidup" INT4 DEFAULT 0,
    "tukikMati" INT4 DEFAULT 0,
    "berfungsi" BOOL NOT NULL DEFAULT true,
    "keterangan" STRING,
    "tukikAda" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Inkubator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataKonservasi"."Zona" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "nama" STRING NOT NULL,
    "keterangan" STRING NOT NULL,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report"."StorageDatabase" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "Bulan" INT4 NOT NULL,
    "Tahun" INT4 NOT NULL,
    "PenyuNaikTakBertelur" INT4 NOT NULL,
    "PenyuNaikBertelur" INT4 NOT NULL,
    "TotalTelurDiselamatkan" INT4 NOT NULL,
    "TotalTelurMenetas" INT4 NOT NULL,
    "TotalTelurTakMenetas" INT4 NOT NULL,
    "TotalTukikDilepaskan" INT4 NOT NULL,
    "TanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Tempat" INT4 NOT NULL,

    CONSTRAINT "StorageDatabase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idUser_key" ON "DataKonservasi"."User"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_nomerTelp_key" ON "DataKonservasi"."User"("nomerTelp");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "DataKonservasi"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PenyuNaik_idDok_key" ON "DataKonservasi"."PenyuNaik"("idDok");

-- CreateIndex
CREATE INDEX "PenyuNaik_idZona_idx" ON "DataKonservasi"."PenyuNaik"("idZona");

-- CreateIndex
CREATE INDEX "PenyuNaik_idpenanggungJawab_idx" ON "DataKonservasi"."PenyuNaik"("idpenanggungJawab");

-- CreateIndex
CREATE UNIQUE INDEX "TelurDikerami_idDok_key" ON "DataKonservasi"."TelurDikerami"("idDok");

-- CreateIndex
CREATE INDEX "TelurDikerami_idPenyuNaik_idx" ON "DataKonservasi"."TelurDikerami"("idPenyuNaik");

-- CreateIndex
CREATE INDEX "TelurDikerami_idpenanggungJawab_idx" ON "DataKonservasi"."TelurDikerami"("idpenanggungJawab");

-- CreateIndex
CREATE UNIQUE INDEX "TelurMenetas_idDok_key" ON "DataKonservasi"."TelurMenetas"("idDok");

-- CreateIndex
CREATE INDEX "TelurMenetas_idPenyu_idx" ON "DataKonservasi"."TelurMenetas"("idPenyu");

-- CreateIndex
CREATE INDEX "TelurMenetas_idPenyuDikerami_idx" ON "DataKonservasi"."TelurMenetas"("idPenyuDikerami");

-- CreateIndex
CREATE INDEX "TelurMenetas_idpenanggungJawab_idx" ON "DataKonservasi"."TelurMenetas"("idpenanggungJawab");

-- CreateIndex
CREATE UNIQUE INDEX "InkubasiPenyu_idDok_key" ON "DataKonservasi"."InkubasiPenyu"("idDok");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idInkubator_idx" ON "DataKonservasi"."InkubasiPenyu"("idInkubator");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idPenyu_idx" ON "DataKonservasi"."InkubasiPenyu"("idPenyu");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idPenyuMenetas_idx" ON "DataKonservasi"."InkubasiPenyu"("idPenyuMenetas");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idpenanggungJawab_idx" ON "DataKonservasi"."InkubasiPenyu"("idpenanggungJawab");

-- CreateIndex
CREATE UNIQUE INDEX "PenyuMati_idDok_key" ON "DataKonservasi"."PenyuMati"("idDok");

-- CreateIndex
CREATE INDEX "PenyuMati_idPenyu_idx" ON "DataKonservasi"."PenyuMati"("idPenyu");

-- CreateIndex
CREATE INDEX "PenyuMati_idInkubator_idx" ON "DataKonservasi"."PenyuMati"("idInkubator");

-- CreateIndex
CREATE INDEX "PenyuMati_idpenanggungJawab_idx" ON "DataKonservasi"."PenyuMati"("idpenanggungJawab");

-- CreateIndex
CREATE UNIQUE INDEX "Pelepasan_idDok_key" ON "DataKonservasi"."Pelepasan"("idDok");

-- CreateIndex
CREATE INDEX "Pelepasan_idpenanggungJawab_idx" ON "DataKonservasi"."Pelepasan"("idpenanggungJawab");

-- CreateIndex
CREATE INDEX "Pelepasan_idInkubator_idx" ON "DataKonservasi"."Pelepasan"("idInkubator");

-- AddForeignKey
ALTER TABLE "DataKonservasi"."User" ADD CONSTRAINT "User_idTempat_fkey" FOREIGN KEY ("idTempat") REFERENCES "DataKonservasi"."TempatKonservasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuNaik" ADD CONSTRAINT "PenyuNaik_idZona_fkey" FOREIGN KEY ("idZona") REFERENCES "DataKonservasi"."Zona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuNaik" ADD CONSTRAINT "PenyuNaik_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "DataKonservasi"."User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."TelurDikerami" ADD CONSTRAINT "TelurDikerami_idPenyuNaik_fkey" FOREIGN KEY ("idPenyuNaik") REFERENCES "DataKonservasi"."PenyuNaik"("idDok") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."TelurDikerami" ADD CONSTRAINT "TelurDikerami_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "DataKonservasi"."User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."TelurMenetas" ADD CONSTRAINT "TelurMenetas_idPenyuDikerami_fkey" FOREIGN KEY ("idPenyuDikerami") REFERENCES "DataKonservasi"."TelurDikerami"("idDok") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."TelurMenetas" ADD CONSTRAINT "TelurMenetas_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "DataKonservasi"."JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."TelurMenetas" ADD CONSTRAINT "TelurMenetas_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "DataKonservasi"."User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "DataKonservasi"."Inkubator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idPenyuMenetas_fkey" FOREIGN KEY ("idPenyuMenetas") REFERENCES "DataKonservasi"."TelurMenetas"("idDok") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "DataKonservasi"."JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "DataKonservasi"."User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" ADD CONSTRAINT "PenyuMati_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "DataKonservasi"."Inkubator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" ADD CONSTRAINT "PenyuMati_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "DataKonservasi"."JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."PenyuMati" ADD CONSTRAINT "PenyuMati_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "DataKonservasi"."User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."Pelepasan" ADD CONSTRAINT "Pelepasan_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "DataKonservasi"."Inkubator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKonservasi"."Pelepasan" ADD CONSTRAINT "Pelepasan_idpenanggungJawab_fkey" FOREIGN KEY ("idpenanggungJawab") REFERENCES "DataKonservasi"."User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;
