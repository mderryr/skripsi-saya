"use server";
import { Inkubator, TambahInkubatorDOT } from "@/types";
import {
  getInkubator as GetAllInkubator,
  getOprationInkubator,
  createInkubator as Create,
  updateInkubator as Update,
  DeleteINkubator as Delete,
  getSpesifikInkubator,
} from "./inkubator.prisma";

interface ResponseInkubator {
  massage: string;
  kode: string | number;
  data?:
    | Inkubator[]
    | Awaited<ReturnType<typeof Create>>
    | Awaited<ReturnType<typeof Update>>
    | null;
  forward?: string;
}

export async function getInkubator(
  Track: boolean = false
): Promise<ResponseInkubator> {
  try {
    const res = Track ? await getOprationInkubator() : await GetAllInkubator();
    // console.log(res)
    return {
      massage: `Data dibuat pada tanggal ${Date.now()}`,
      kode: 200,
      data: res,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function createInkubator({
  namaInkubator,
  keterangan,
}: TambahInkubatorDOT): Promise<ResponseInkubator> {
  try {
    const res = await Create({ namaInkubator, keterangan });
    return {
      massage: `Data dibuat pada tanggal ${Date.now()}`,
      kode: 200,
      data: res,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function updateInkubator({
  idData,
  namaInkubator,
  keterangan,
  berfungsi,
}: TambahInkubatorDOT & {
  idData: number;
}): Promise<ResponseInkubator> {
  try {
    const res = await Update({ idData, namaInkubator, keterangan, berfungsi });
    return {
      massage: `Data dibuat pada tanggal ${Date.now()}`,
      kode: 200,
      data: res,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function DeleteINkubator(id: number | bigint) {
  try {
    const checkData = await getSpesifikInkubator(id);
    let data;
    if (!checkData?.tukikAda) data = await Delete(id);
    if (!data && checkData?.tukikAda) throw new Error("Data tidak Ditemukan");
    return {
      massage: `Data dihapus pada waktu ${Date.now()}`,
      kode: 202,
      data: data,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}
