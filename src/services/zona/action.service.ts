"use server";
import {
  getZona as GETZONA,
  createZona as CREATEZONA,
  updateZona as UPDATEZONA,
  deleteZona as DELETEZONA,
  getSpesifikzonaByID,
} from "./zona.prisma";
import { ZonaDOT } from "@/types";

export async function getzona() {
  try {
    const data = await GETZONA();
    return {
      massage: "Data berhasil diambil",
      data: data,
      kode: 202,
    };
  } catch (err: any) {
    return {
      massage: err,
      kode: 500,
    };
  }
}

export async function createZona({ nama, keterangan }: ZonaDOT) {
  try {
    const data = await CREATEZONA({ nama, keterangan });
    if (!data) throw new Error("Data not Found");
    return {
      massage: "Data berhasil diambil",
      data: data,
      kode: 202,
    };
  } catch (err: any) {
    return {
      massage: err,
      kode: 500,
    };
  }
}

export async function updateZona({
  idData,
  nama,
  keterangan,
}: ZonaDOT & {
  idData: number;
}) {
  try {
    const data = await UPDATEZONA({ idData, nama, keterangan });
    if (!data) throw new Error("Data not Found");
    return {
      massage: "Data berhasil diambil",
      data: data,
      kode: 202,
    };
  } catch (err: any) {
    return {
      massage: err,
      kode: 500,
    };
  }
}

export async function deleteZona(id: number | bigint) {
  try {
    const checkData = await getSpesifikzonaByID(id);
    let data;
    if (!checkData?.PenyuNaik) data = await DELETEZONA(id);
    if (!data && checkData?.id) throw new Error("Data tidak ditemukan");
    return {
      massage: `data ${checkData?.id} dihapus`,
      kode: 202,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}
