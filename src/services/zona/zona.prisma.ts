"use server";

import { PrismaClient } from "@prisma/client";
import { ZonaDOT } from "@/types";
import {customID} from "@/env/codeID"
const prisma = new PrismaClient();

export async function getZona() {
  return prisma.zona.findMany();
}

export async function getSpesifikzonaByID(id:number|bigint){
  return prisma.zona.findFirst({
    where:{
      id:id
    },
    include:{
      PenyuNaik:true
    }
  })
}

export async function createZona({ nama, keterangan }: ZonaDOT) {
  return prisma.zona.create({
    data: {
      idZona:`${customID("Zona")}-${Math.floor(1000 + Math.random() * 9000)}`,
      nama: nama,
      keterangan: keterangan || "",
    },
  });
}

export async function updateZona({ idData,nama, keterangan }: ZonaDOT&{
    idData:number
}) {
    return prisma.zona.update({
        where:{
            id:idData
        },
      data: {
        nama: nama,
        keterangan: keterangan || "",
      },
    });
  }

  export async function deleteZona(idData:number|bigint) {
    return prisma.zona.delete({
        where:{
            id:idData
        }
    });
  }