

import { PrismaClient } from "@prisma/client";
import CustomID from "@/utils/cusromID.utils";
import moment from "moment";
import { TambahPenyuNaikDOT } from "@/types";

const prisma = new PrismaClient();

export async function createPenyuNaikTidakBertelur({
  idPenanggungJawab,
  date,
  penyuNaik,
  dikerami,
  idZone,
  keterangan
}: TambahPenyuNaikDOT) {
  if(idZone){
    return prisma.penyuNaik.create({
      data: {
        idDok: CustomID("PenyuNaikTidakBertelur", date),
        penyuBertelur: false,
        jumlahPenyu: penyuNaik,
        idpenanggungJawab: idPenanggungJawab,
        tanggalData: date,
        dikerami: dikerami,
        idZona: idZone,
        Keterangan:keterangan
      },
    });
  }
  return prisma.penyuNaik.create({
    data: {
      idDok: CustomID("PenyuNaikTidakBertelur", date),
      penyuBertelur: false,
      jumlahPenyu: penyuNaik,
      idpenanggungJawab: idPenanggungJawab,
      tanggalData: date,
      dikerami: dikerami,
      Keterangan:keterangan
    },
  });
}

export async function createPenyuNaik({
  telurBaik,
  idPenanggungJawab,
  date,
  penyuNaik,
  dikerami,
  idZone,
  keterangan
}: TambahPenyuNaikDOT) {
 if(idZone){
  return prisma.penyuNaik.create({
    data: {
      idDok: CustomID("PenyuNaik", date),
      penyuBertelur: true,
      jumlahPenyu: penyuNaik,
      idpenanggungJawab: idPenanggungJawab,
      telurDiselamatkan: telurBaik,
      tanggalData: date,
      dikerami: dikerami,
      Keterangan:keterangan,
      idZona: idZone,
    },
  });
 }
 return prisma.penyuNaik.create({
  data: {
    idDok: CustomID("PenyuNaik", date),
    penyuBertelur: true,
    jumlahPenyu: penyuNaik,
    idpenanggungJawab: idPenanggungJawab,
    telurDiselamatkan: telurBaik,
    tanggalData: date,
    dikerami: dikerami,
    Keterangan:keterangan
  },
});
}

export async function getPenyuNaik() {
  return prisma.penyuNaik.findMany({
    include:{
      zona:true,
      user: true,
    }
  });
}

export async function getPenyuNaikDate(month: number, year: number) {
  return prisma.penyuNaik.findMany({
    where: {
      tanggalData: {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0),
      },
   
}, include:{
      zona:true,
      user: true,
    }
  });
}

export async function getPenyuByID(id:bigint|number){
 return prisma.penyuNaik.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getPenyuNaikTrack() {
  return prisma.penyuNaik.findMany({
    where:{
      penyuBertelur:true,
      dikerami:false
    },
    include:{
      zona:true,
      user: true,
    }
  });
}

export async function updatePenyuNaik({
  telurBaik,
  idPenanggungJawab,
  penyuNaik,
  date,
  bertelur = false,
  idData,
}: TambahPenyuNaikDOT & {
  idData: Number;
}) {
  if (!bertelur) {
    return prisma.penyuNaik.update({
      where: {
        id: Number(idData),
      },
      data: {
        jumlahPenyu: penyuNaik,
        idpenanggungJawab: idPenanggungJawab,
        tanggalData: date,
      },
    });
  }
  return prisma.penyuNaik.update({
    where: {
      id: Number(idData),
    },
    data: {
      penyuBertelur: true,
      jumlahPenyu: penyuNaik,
      idpenanggungJawab: idPenanggungJawab,
      telurDiselamatkan: telurBaik,
      tanggalData: date,
    },
  });
}

export async function updateStatusPenyuNaik({
  idDok,
  idData,
}: {
  idDok: string;
  idData: bigint;
}) {
  return prisma.penyuNaik.update({
    where: {
      idDok: idDok,
      id: idData,
    },
    data: {
      dikerami: true,
    },
  });
}

export async function DeletePenyuNaik(id: number | bigint) {
  return prisma.penyuNaik.delete({
    where: {
      id: id,
    },
  });
}
