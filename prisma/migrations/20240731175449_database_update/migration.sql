-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisPenyu" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "namaIlmiah" TEXT,

    CONSTRAINT "JenisPenyu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenyuNaik" (
    "id" SERIAL NOT NULL,
    "idDok" TEXT NOT NULL,
    "dikerami" BOOLEAN DEFAULT false,
    "jumlahPenyu" INTEGER DEFAULT 0,
    "penyuBertelur" BOOLEAN NOT NULL DEFAULT true,
    "telurDiselamatkan" INTEGER,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "penanggungJawab" VARCHAR(25) NOT NULL DEFAULT 'anonymous',
    "idPenyu" INTEGER,

    CONSTRAINT "PenyuNaik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelurDikerami" (
    "id" SERIAL NOT NULL,
    "idDok" TEXT NOT NULL,
    "kodePengeraman" TEXT,
    "menetas" BOOLEAN DEFAULT false,
    "telurBaik" INTEGER,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "penanggungJawab" VARCHAR(25) NOT NULL DEFAULT 'anonymous',
    "idPenyu" INTEGER,
    "idPenyuNaik" TEXT,

    CONSTRAINT "TelurDikerami_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelurMenetas" (
    "id" SERIAL NOT NULL,
    "idDok" TEXT NOT NULL,
    "diinkubasi" BOOLEAN DEFAULT false,
    "telurMenetas" INTEGER,
    "telurRusak" INTEGER,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "penanggungJawab" VARCHAR(25) NOT NULL DEFAULT 'anonymous',
    "idPenyu" INTEGER,
    "idPenyuDikerami" TEXT,

    CONSTRAINT "TelurMenetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InkubasiPenyu" (
    "id" SERIAL NOT NULL,
    "idDok" TEXT NOT NULL,
    "JumlahTukik" INTEGER NOT NULL,
    "dilepas" BOOLEAN DEFAULT false,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "penanggungJawab" VARCHAR(25) NOT NULL DEFAULT 'anonymous',
    "idInkubator" INTEGER NOT NULL,
    "idPenyuMenetas" TEXT,

    CONSTRAINT "InkubasiPenyu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenyuMati" (
    "id" SERIAL NOT NULL,
    "idDok" TEXT NOT NULL,
    "penyuMati" INTEGER,
    "dilepas" BOOLEAN NOT NULL DEFAULT false,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3),
    "penanggungJawab" VARCHAR(25) NOT NULL DEFAULT 'anonymous',
    "idPenyu" INTEGER,
    "idInkubator" INTEGER,

    CONSTRAINT "PenyuMati_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelepasan" (
    "id" SERIAL NOT NULL,
    "idDok" TEXT NOT NULL,
    "JumlahTukik" INTEGER NOT NULL,
    "tanggalData" TIMESTAMP(3) NOT NULL,
    "create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "penanggungJawab" VARCHAR(25) NOT NULL DEFAULT 'anonymous',
    "idInkubasi" INTEGER,

    CONSTRAINT "Pelepasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inkubator" (
    "id" SERIAL NOT NULL,
    "namaInkubator" TEXT NOT NULL,
    "tukikHidup" INTEGER DEFAULT 0,
    "tukikMati" INTEGER DEFAULT 0,
    "berfungsi" BOOLEAN NOT NULL DEFAULT true,
    "keterangan" TEXT,
    "tukikAda" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Inkubator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TentangTempat" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "foto" TEXT,

    CONSTRAINT "TentangTempat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PenyuNaik_idDok_key" ON "PenyuNaik"("idDok");

-- CreateIndex
CREATE INDEX "PenyuNaik_idPenyu_idx" ON "PenyuNaik"("idPenyu");

-- CreateIndex
CREATE UNIQUE INDEX "TelurDikerami_idDok_key" ON "TelurDikerami"("idDok");

-- CreateIndex
CREATE INDEX "TelurDikerami_idPenyu_idx" ON "TelurDikerami"("idPenyu");

-- CreateIndex
CREATE INDEX "TelurDikerami_idPenyuNaik_idx" ON "TelurDikerami"("idPenyuNaik");

-- CreateIndex
CREATE UNIQUE INDEX "TelurMenetas_idDok_key" ON "TelurMenetas"("idDok");

-- CreateIndex
CREATE INDEX "TelurMenetas_idPenyu_idx" ON "TelurMenetas"("idPenyu");

-- CreateIndex
CREATE INDEX "TelurMenetas_idPenyuDikerami_idx" ON "TelurMenetas"("idPenyuDikerami");

-- CreateIndex
CREATE UNIQUE INDEX "InkubasiPenyu_idDok_key" ON "InkubasiPenyu"("idDok");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idInkubator_idx" ON "InkubasiPenyu"("idInkubator");

-- CreateIndex
CREATE INDEX "InkubasiPenyu_idPenyuMenetas_idx" ON "InkubasiPenyu"("idPenyuMenetas");

-- CreateIndex
CREATE UNIQUE INDEX "PenyuMati_idDok_key" ON "PenyuMati"("idDok");

-- CreateIndex
CREATE INDEX "PenyuMati_idPenyu_idx" ON "PenyuMati"("idPenyu");

-- CreateIndex
CREATE INDEX "PenyuMati_idInkubator_idx" ON "PenyuMati"("idInkubator");

-- CreateIndex
CREATE UNIQUE INDEX "Pelepasan_idDok_key" ON "Pelepasan"("idDok");

-- CreateIndex
CREATE INDEX "Pelepasan_idInkubasi_idx" ON "Pelepasan"("idInkubasi");

-- AddForeignKey
ALTER TABLE "PenyuNaik" ADD CONSTRAINT "PenyuNaik_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelurDikerami" ADD CONSTRAINT "TelurDikerami_idPenyuNaik_fkey" FOREIGN KEY ("idPenyuNaik") REFERENCES "PenyuNaik"("idDok") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelurDikerami" ADD CONSTRAINT "TelurDikerami_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelurMenetas" ADD CONSTRAINT "TelurMenetas_idPenyuDikerami_fkey" FOREIGN KEY ("idPenyuDikerami") REFERENCES "TelurDikerami"("idDok") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelurMenetas" ADD CONSTRAINT "TelurMenetas_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "Inkubator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InkubasiPenyu" ADD CONSTRAINT "InkubasiPenyu_idPenyuMenetas_fkey" FOREIGN KEY ("idPenyuMenetas") REFERENCES "TelurMenetas"("idDok") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenyuMati" ADD CONSTRAINT "PenyuMati_idInkubator_fkey" FOREIGN KEY ("idInkubator") REFERENCES "Inkubator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenyuMati" ADD CONSTRAINT "PenyuMati_idPenyu_fkey" FOREIGN KEY ("idPenyu") REFERENCES "JenisPenyu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelepasan" ADD CONSTRAINT "Pelepasan_idInkubasi_fkey" FOREIGN KEY ("idInkubasi") REFERENCES "Inkubator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
