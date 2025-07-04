import { PrismaClient } from "@prisma/client";
import { TambahInkubatorDOT, UpdateTelurDOT } from "@/types";
import {customID} from "@/env/codeID"

const prisma = new PrismaClient();

export async function createInkubator({
  namaInkubator,
  keterangan,
}: TambahInkubatorDOT) {
  return prisma.inkubator.create({
    data: {
      idInkubator:`${customID("Inkubator")}-${Math.floor(1000 + Math.random() * 9000)}`,
      namaInkubator: namaInkubator || "Inkubator ?",
      keterangan: keterangan,
    },
  });
}

export async function getInkubator() {
  return prisma.inkubator.findMany();
}

export async function getOprationInkubator() {
  return prisma.inkubator.findMany({
    where:{
      tukikAda:true,
      berfungsi:true
    }
  });
}

export async function getInkubatorAll() {
  return prisma.inkubator.findMany({
    include: {
      penyuInkubasi: {
        select: {
          id: true,
          idDok: true,
          JumlahTukik: true,
        },
      },
      penyumati: {
        select: {
          id: true,
          idDok: true,
          penyuMati: true,
        },
      },
    },
  });
}

export async function getSpesifikInkubator(idData: number|bigint) {
  return prisma.inkubator.findFirst({
    where: { id: idData },
  });
}

export async function updateTelurInkubator({
  idData,
  telurBaik,
  telurRusak,
}: UpdateTelurDOT) {
  return prisma.inkubator.update({
    where: {
      idInkubator: idData,
    },
    data: {
      tukikHidup: telurBaik,
      tukikMati: telurRusak,
      tukikAda: true,
    },
  });
}
export async function updateStatusInkubator(idInkubator: string) {
  return prisma.inkubator.update({
    where: {
      idInkubator: idInkubator,
    },
    data: {
      tukikAda: false,
      tukikHidup: 0,
      tukikMati: 0,
    },
  });
}

export async function updateInkubator({
  idData,
  namaInkubator,
  keterangan,
  berfungsi,
}: TambahInkubatorDOT & {
  idData: number;
}) {
  return prisma.inkubator.update({
    where: {
      id: idData,
    },
    data: {
      namaInkubator: namaInkubator,
      keterangan: keterangan,
      berfungsi: berfungsi,
    },
  });
}


export async function DeleteINkubator(id:bigint|number) {
  return prisma.inkubator.delete({
    where:{
      id:id
    }
  })
}