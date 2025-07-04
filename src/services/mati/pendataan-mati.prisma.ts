import { PrismaClient } from "@prisma/client";
import CustomID from "@/utils/cusromID.utils";
import { TambahTukikMatiDOT } from "@/types";

const prisma = new PrismaClient();

export async function createPenyuMati({
  idPenanggungJawab,
  date,
  idPenyu,
  penyuMati,
  idInkubator,
  keterangan,
}: TambahTukikMatiDOT) {
  return prisma.penyuMati.create({
    data: {
      idDok: CustomID("TukikMati", date),
      penyuMati: penyuMati,
      idpenanggungJawab: idPenanggungJawab,
      idInkubator: idInkubator,
      tanggalData: date,
      idPenyu: idPenyu,
      Keterangan: keterangan,
    },
  });
}

export async function getPenyuMati() {
  return prisma.penyuMati.findMany({
    include: {
      penyu: true,
      Inkubasi: true,
      user:true
    },
  });
}

export async function getPenyuMatiDate(month: number, year: number) {
  return prisma.penyuMati.findMany({
    where: {
      tanggalData: {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0),
      },
   
}, include: {
      penyu: true,
      Inkubasi: true,
      user:true
    },
  });
}

export async function getSpesifikPenyuMati({
  idData,
  idDok,
}: {
  idData: number;
  idDok: string;
}) {
  return prisma.penyuMati.findFirst({
    where: { id: idData, idDok: idDok },
  });
}

export async function getSpesifikPenyuMatiByID(idData:number|bigint) {
  return prisma.penyuMati.findFirst({
    where:{
      id:idData
    }
  })
  
}

// export async function updateStatusMatiAll(idInkubator: number) {
//   return prisma.penyuMati.updateMany({
//     where: {
//       idInkubator: idInkubator,
//     },
//     data: {
//       dilepas: true,
//     },
//   });
// }

export async function updatePenyuMati({
  penyuMati,
  idPenanggungJawab,
  date,
  idData,
  idInkubator,
  keterangan,
  idPenyu,
}: TambahTukikMatiDOT) {
  return prisma.penyuMati.update({
    where: {
      id: Number(idData),
    },
    data: {
      idpenanggungJawab: idPenanggungJawab,
      penyuMati: penyuMati,
      tanggalData: date,
      idInkubator: idInkubator,
      Keterangan: keterangan,
      idPenyu: idPenyu,
    },
  });
}

export async function DeletePenyuMati(id: bigint) {
  return prisma.penyuMati.delete({
    where: {
      id: id,
    },
  });
}
