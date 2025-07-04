"use server";

import {
  createTelurDikerami as telurDikerami,
  createTelurDikeramiTrack,
  getPenyuPengeraman,
  updatePenyuPengeraman,
  DeleteTelurDikerami,
  getPenyuPengeramanTrack,
  getSpesifikPengeramanFromNaik,
  getSpesifikPengeramanByID,
} from "./pendataan-pengeraman.prisma";
import { TambahTelurDikeramiDOT } from "@/types";
import { updateStatusPenyuNaik } from "@/services/naik/pendataan-naik.prisma";

interface ResponseDikerami {
  massage: string;
  kode: string | number;
  data?:
    | Awaited<ReturnType<typeof telurDikerami>>
    | Awaited<ReturnType<typeof getPenyuPengeraman>>
    | Awaited<ReturnType<typeof getPenyuPengeramanTrack>>
    | null;
  forward?: string;
}

export async function getTelurDikerami(Track=false): Promise<ResponseDikerami> {
  try {
    const res = Track?await getPenyuPengeramanTrack():await getPenyuPengeraman();
    return {
      massage:`Data diambil pada waktu ${Date.now()}`,
      kode: 200,
      data:res,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function createTelurDikerami({
  telurBaik,
  idPenanggungJawab,
  date,
  idDok,
  idData,
  jumlahPenyuNaik,
  keterangan
}: TambahTelurDikeramiDOT & {
  idDok?: string | undefined;
  idData?: bigint | undefined;
  jumlahPenyuNaik?:number
}): Promise<ResponseDikerami> {
  try {
    const res = idDok ? await createTelurDikeramiTrack({
      telurBaik,
      idPenanggungJawab,
      date,
      idData:idDok,
      keterangan,
    })  :await telurDikerami({
      telurBaik: telurBaik,
      date: date,
      idPenanggungJawab: idPenanggungJawab,
      keterangan
    });

    if (idData && idDok && jumlahPenyuNaik) {
     
      const checkPenyu = await getSpesifikPengeramanFromNaik({
        idNaik:idDok
      })
      const allDikerami = checkPenyu.reduce((accumulator, item) => {
        return accumulator + (item.telurBaik || 0);
      }, 0);
      if(allDikerami > jumlahPenyuNaik) throw new Error("salah Memasukan Telur") 
        if(allDikerami === jumlahPenyuNaik) {
          const update = updateStatusPenyuNaik({
            idDok: idDok,
            idData: idData,
          });
          if (!update) throw new Error("Data tidak bisa di input");
        }
    }

    if (!res) throw new Error("Data tidak bisa di input");
    return {
      massage: `Data dibuat pada tanggal ${res.create}`,
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

export async function updateTelurDikerami({
  telurBaik,
  idPenanggungJawab,
  date,
  idData,
}: TambahTelurDikeramiDOT & {
  idData: number;
}) {
  try {
    const res = await updatePenyuPengeraman({
      telurBaik: telurBaik,
      idPenanggungJawab: idPenanggungJawab,
      date: date,
      idData: idData,
    });
    if (!res) throw new Error("Data tidak bisa di input");
    return {
      massage: `Data dibuat pada tanggal ${res.create}`,
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

export async function deleteTelurDikerami(id: number) {
  try {
    const checkData = await getSpesifikPengeramanByID(id)
    let res:Awaited<ReturnType<typeof getSpesifikPengeramanByID>>|any = 0
    if(!checkData?.idPenyuNaik) res = await DeleteTelurDikerami(id);
    if (res!==0 || !res) throw new Error("Data tidak bisa di input");
    return {
      massage: `Data dibuat pada tanggal ${res.create}`,
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
