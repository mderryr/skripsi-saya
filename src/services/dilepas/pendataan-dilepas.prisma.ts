import { PrismaClient } from "@prisma/client";
import CustomID from "@/utils/cusromID.utils";
import { TambahPelepasanTukikDOT } from "@/types";

const prisma = new PrismaClient();

export async function createPenyuDilepas({
  JumlahTukik,
  idPenanggungJawab,
  date,
  idInkubator,
}: TambahPelepasanTukikDOT) {
  return prisma.pelepasan.create({
    data: {
      idDok: CustomID("TukikDilepas", date),
      idpenanggungJawab: idPenanggungJawab,
      JumlahTukik: Number(JumlahTukik),
      idInkubator: idInkubator,
      tanggalData: date,
    },
  });
}

export async function getPenyuDilepas() {
  return prisma.pelepasan.findMany({
    include: {
      Inkubasi: true,
      user: true,
    },
  });
}

export async function getPenyuDilepasDate(month: number, year: number) {
  const startDate = new Date(year, month - 1, 1); // Awal bulan
  const endDate = new Date(year, month, 0); // Akhir bulan
  return prisma.pelepasan.findMany({
    where: {
      tanggalData: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      Inkubasi: true,
      user: true,
    },
  });
}

export async function getSpesifikPenyuDilepas({
  idData,
  idDok,
}: {
  idData: number;
  idDok: string;
}) {
  return prisma.pelepasan.findFirst({
    where: { id: idData, idDok: idDok },
  });
}

export async function getSpesifikPenyuDilepasById(id:number|bigint) {
  return prisma.pelepasan.findFirst({
    where: { id: id },
  });
}

export async function updatePenyuDilepas({
  JumlahTukik,
  idPenanggungJawab,
  date,
  idData,
  idInkubator,
}: TambahPelepasanTukikDOT & {
  idData: string;
}) {
  return prisma.pelepasan.update({
    where: {
     idDok:idData
    },
    data: {
      idpenanggungJawab: idPenanggungJawab,
      JumlahTukik: JumlahTukik,
      tanggalData: date,
      idInkubator:idInkubator,
    },
  });
}

export async function deleteTukikPelepasan(idData: number | string) {
  return prisma.pelepasan.delete({
    where: {
      id: Number(idData),
    },
  });
}
