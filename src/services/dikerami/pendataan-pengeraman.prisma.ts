import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { TambahTelurDikeramiDOT } from "@/types";
import CustomID from "@/utils/cusromID.utils";
import { bigint } from "zod";
const prisma = new PrismaClient();

export async function createTelurDikeramiTrack({
  telurBaik,
  idPenanggungJawab,
  date,
  idData,
  keterangan,
}: TambahTelurDikeramiDOT & {
  idData: string;
}) {
  return prisma.telurDikerami.create({
    data: {
      idDok: CustomID("TelurDikerami", date),
      idpenanggungJawab: idPenanggungJawab,
      telurBaik: telurBaik,
      tanggalData: date,
      idPenyuNaik: idData,
      Keterangan: keterangan,
    },
  });
}

export function createTelurDikerami({
  telurBaik,
  idPenanggungJawab,
  date,
  keterangan,
}: TambahTelurDikeramiDOT) {
  return prisma.telurDikerami.create({
    data: {
      idDok: CustomID("TelurDikerami", date),
      idpenanggungJawab: idPenanggungJawab,
      telurBaik: telurBaik,
      tanggalData: date,
      Keterangan: keterangan,
    },
  });
}

export async function getPenyuPengeraman() {
  return prisma.telurDikerami.findMany({
    include: {
      penyuNaik: true,
      telurMenetas: true,
      user: true,
    },
  });
}

export async function getPenyuPengeramanDate(month: number, year: number) {
  return prisma.telurDikerami.findMany({
    where: {
      tanggalData: {
        gte: new Date(year, month - 1, 1),
        lte: new Date(year, month, 0),
      },
    },
    include: {
      penyuNaik: true,
      telurMenetas: true,
      user: true,
    },
  });
}

export async function getPenyuPengeramanTrack() {
  return prisma.telurDikerami.findMany({
    where: {
      menetas: false,
    },
    include: {
      penyuNaik: true,
      telurMenetas: true,
      user: true,
    },
  });
}

export async function getSpesifikPengeraman({
  idData,
  idDok,
}: {
  idData: number;
  idDok: string;
}) {
  return prisma.telurDikerami.findFirst({
    where: { id: idData, idDok: idDok },
  });
}

export async function getSpesifikPengeramanByID(id:number|bigint){
  return prisma.telurDikerami.findFirst({
    where:{
      id:id
    }
  })
}

export async function getSpesifikPengeramanFromNaik({
  idNaik,
}: {
  idNaik: string;
}) {
  return prisma.telurDikerami.findMany({
    where: { 
      idPenyuNaik: idNaik
     },
  });
}

export async function updatePenyuPengeraman({
  telurBaik,
  idPenanggungJawab,
  date,
  idData,
}: TambahTelurDikeramiDOT & {
  idData: number;
}) {
  return prisma.telurDikerami.update({
    where: {
      id: idData,
    },
    data: {
      idpenanggungJawab: idPenanggungJawab,
      telurBaik: telurBaik,
      tanggalData: date,
    },
  });
}

export async function updateStatusPenyuPengeraman({
  idDok,
}: {
  idDok: string;
}) {
  return prisma.telurDikerami.update({
    where: {
      idDok: idDok,
    },
    data: {
      menetas: true,
    },
  });
}

export async function DeleteTelurDikerami(id: number) {
  return prisma.telurDikerami.delete({
    where: {
      id: id,
    },
  });
}
