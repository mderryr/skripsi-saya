import { PrismaClient } from "@prisma/client";
import CustomID from "@/utils/cusromID.utils";
import { TambahTukikMenetasDOT } from "@/types";

const prisma = new PrismaClient();

export async function createTelurMenetasNotTrack({
  telurBaik,
  telurRusak,
  idPenanggungJawab,
  date,
  idPenyu,
}: TambahTukikMenetasDOT) {
  return prisma.telurMenetas.create({
    data: {
      idDok: CustomID("TelurMenetas", date),
      idPenyu: idPenyu,
      idpenanggungJawab: idPenanggungJawab,
      telurMenetas: telurBaik,
      telurRusak: telurRusak,
      tanggalData: date,
    },
  });
}

export function createTelurMenetas({
  telurBaik,
  telurRusak,
  idPenanggungJawab,
  date,
  idPenyu,
  idData,
}: TambahTukikMenetasDOT & {
  idData: string;
}) {
  console.log(idData)
  return prisma.telurMenetas.create({
    data: {
      idDok: CustomID("TelurMenetas", date),
      idPenyu: idPenyu,
      idpenanggungJawab: idPenanggungJawab,
      telurMenetas: telurBaik,
      telurRusak: telurRusak,
      tanggalData: date,
      idPenyuDikerami: idData,
    },
  });
}

export async function getPenyuMenetas() {
  return prisma.telurMenetas.findMany({
    include: {
      penyu: true,
      user: true,
    },
  });
}

export async function getPenyuMenetasDate(month: number, year: number) {
  return prisma.telurMenetas.findMany({
    where: {
      tanggalData: {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0),
      },
   
},
    include: {
      penyu: true,
      user: true,
    },
  });
}

export async function getPenyuMenetasTrack() {
  return prisma.telurMenetas.findMany({
    where: {
      diinkubasi: false,
    },
    include: {
      penyu: true,
      user: true,
    },
  });
}

export async function getSpesifikMenetasByID({
  idData,
}: {
  idData: number|bigint;

}) {
  return prisma.telurMenetas.findFirst({
    where: { id: idData },
  });
}

export async function getSpesifikMenetas({
  idData,
  idDok,
}: {
  idData: number;
  idDok: string;
}) {
  return prisma.telurMenetas.findFirst({
    where: { id: idData, idDok: idDok },
  });
}

export async function updatePenyuMenetas({
  telurBaik,
  telurRusak,
  idPenanggungJawab,
  date,
  idData,
  idPenyu,
}: TambahTukikMenetasDOT & {
  idData: number;
}) {
  return prisma.telurMenetas.update({
    where: {
      id: idData,
    },
    data: {
      idPenyu: idPenyu,
      idpenanggungJawab: idPenanggungJawab,
      telurMenetas: telurBaik,
      telurRusak: telurRusak,
      tanggalData: date,
    },
  });
}

export async function updateStatusPenyuMenetas({
  idDok,
  idData,
}: {
  idDok: string;
  idData: bigint;
}) {
  return prisma.telurMenetas.update({
    where: {
      id: idData,
      idDok: idDok,
    },
    data: {
      diinkubasi: true,
    },
  });
}

export async function deletaPenyuMenetas(id: number) {
  return prisma.telurMenetas.delete({
    where: {
      id: id,
    },
  });
}
