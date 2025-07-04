"use server";

import { Pelepasan, TambahPelepasanTukikDOT, Inkubator } from "@/types";
import {
  getPenyuDilepas,
  createPenyuDilepas,
  updatePenyuDilepas,
  getSpesifikPenyuDilepasById,
  deleteTukikPelepasan as DeletePelepasan,
} from "./pendataan-dilepas.prisma";
import { Logic } from "@/services/inkubator";

interface ResponsePelepasan {
  massage: string;
  kode: string | number;
  data?:
    | Awaited<ReturnType<typeof getPenyuDilepas>>
    | Awaited<ReturnType<typeof createPenyuDilepas>>
    | Awaited<ReturnType<typeof updatePenyuDilepas>>
    | null;
  forward?: string;
}

export async function getTukikPelepasan(): Promise<ResponsePelepasan> {
  try {
    const res = await getPenyuDilepas();
    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
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

export async function createTukikPelepasan({
  date,
  JumlahTukik,
  idInkubator,
  idPenanggungJawab,
  keterangan,
  all = false,
  hidup,
  mati,
  Track = false,
}: TambahPelepasanTukikDOT & {
  all?: boolean;
  hidup?: number;
  mati?: number;
  Track?: boolean;
}) {
  try {
    const { updateStatusInkubator, updateTelurInkubator } = Logic;
    const res = await createPenyuDilepas({
      date,
      JumlahTukik,
      idInkubator,
      idPenanggungJawab,
      keterangan,
    });
    if (Track) {
      if (all) {
        const update = await updateStatusInkubator(idInkubator||"");
        if (!update.id) throw new Error("Data Tidak Masuk");
      } else {
        const update = await updateTelurInkubator({
          idData: idInkubator||"",
          telurBaik: Number(hidup),
          telurRusak: Number(mati),
        });
        if (!update.id) throw new Error("Data Tidak Masuk");
      }
    }
    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
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

export async function updateTukikPelepasan({
  date,
  JumlahTukik,
  idInkubator,
  idPenanggungJawab,
  keterangan,
  idData,
}: TambahPelepasanTukikDOT & {
  idData: string;
}) {
  try {
    const res = await updatePenyuDilepas({
      date,
      JumlahTukik,
      idInkubator,
      idPenanggungJawab,
      keterangan,
      idData,
    });
    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
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

export async function deleteTukikPelepasan(id: number) {
  try {
    const checkData = await getSpesifikPenyuDilepasById(id)
    let res:any = 0
    if(!checkData?.idInkubator) res = await DeletePelepasan(id);
    if(res !==0 || !res) throw new Error("Data TIdak Ditemukan")
    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
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
