import { PrismaClient } from "@prisma/client";
import CustomID from "@/utils/cusromID.utils";
import { TambahTukikInkubasiDOT } from "@/types";

const prisma = new PrismaClient();

export async function createInkubasiPenyu({
  jumlahTukik,
  idPenanggungJawab,
  date,
  idInkubator,
  idPenyu,
  keterangan,
}: TambahTukikInkubasiDOT) {
  return prisma.inkubasiPenyu.create({
    data: {
      idDok: CustomID("TukikDirawat", date),
      idpenanggungJawab: idPenanggungJawab,
      JumlahTukik: jumlahTukik,
      idInkubator: idInkubator,
      tanggalData: date,
      idPenyu: idPenyu,
      Keterangan: keterangan,
    },
  });
}

export function createInkubasiPenyuTrack({
  jumlahTukik,
  idPenanggungJawab,
  date,
  idInkubator,
  idPenyuMenetas,
  idPenyu,
  keterangan,
}: TambahTukikInkubasiDOT) {
  return prisma.inkubasiPenyu.create({
    data: {
      idDok: CustomID("TukikDirawat", date),
      idpenanggungJawab: idPenanggungJawab,
      JumlahTukik: jumlahTukik,
      idInkubator: idInkubator,
      tanggalData: date,
      idPenyuMenetas: idPenyuMenetas,
      idPenyu: idPenyu,
      Keterangan: keterangan,
    },
  });
}

export async function getInkubasiPenyu() {
  return prisma.inkubasiPenyu.findMany({
    include: {
      inkubator: true,
      user: true,
      penyu:true
    },
  });
}
export async function getInkubasiPenyuDate(month: number, year: number) {
  return prisma.inkubasiPenyu.findMany({
    where: {
      tanggalData: {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0),
      },
    },
    include: {
      inkubator: true,
      user: true,
    },
  });
}

export async function getSpesifikInkubasi({
  idData,
  idDok,
}: {
  idData: number;
  idDok: string;
}) {
  return prisma.inkubasiPenyu.findFirst({
    where: { id: idData, idDok: idDok },
  });
}

export async function getSpesifikInkubasiByID({
  idData,
  
}: {
  idData: number;

}) {
  return prisma.inkubasiPenyu.findFirst({
    where: { id: idData,  },
  });
}

// export async function updateStatusDilepasAll(
// {idInkubator}:{idInkubator:number}
// ){
//   return prisma.inkubasiPenyu.updateMany({
//     where:{
//       idInkubator:idInkubator
//     },data:{
//       dilepas:true
//     }
//   })
// }

export async function updatePendataanInkubasi({
  idData,
  jumlahTukik,
  idPenanggungJawab,
  date,
  idInkubator,
}: TambahTukikInkubasiDOT) {
  return prisma.inkubasiPenyu.update({
    where: {
      id: Number(idData),
    },
    data: {
      JumlahTukik: jumlahTukik,
      idpenanggungJawab: idPenanggungJawab,
      tanggalData: date,
      idInkubator:idInkubator
      ,
    },
  });
}

export async function deletePendataanInkubasi(idData: number) {
  return prisma.inkubasiPenyu.delete({
    where: {
      id: idData,
    },
  });
}
