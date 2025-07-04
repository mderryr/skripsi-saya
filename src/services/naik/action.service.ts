"use server";

import { type TambahPenyuNaikDOT, type TambahTelurDikeramiDOT } from "@/types";
import {
  createPenyuNaikTidakBertelur,
  createPenyuNaik as createNaik,
  updatePenyuNaik,
  getPenyuNaik as PenyuNaik,
  DeletePenyuNaik,
  updateStatusPenyuNaik,
  getPenyuByID,
  getPenyuNaikTrack,
} from "./pendataan-naik.prisma";
import { createTelurDikeramiTrack } from "@/services/dikerami/pendataan-pengeraman.prisma";

interface ResponseNaik {
  massage: string;
  kode: string | number;
  data?:
    | Awaited<ReturnType<typeof PenyuNaik>>
    | Awaited<ReturnType<typeof createPenyuNaikTidakBertelur>>
    | null;
  forward?: string;
}
export async function getPenyuNaik(Track = false): Promise<ResponseNaik> {
  try {
    const data = Track ? await getPenyuNaikTrack() : await PenyuNaik();

    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
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

export async function createPenyuNaik({
  telurBaik,
  penyuNaik,
  bertelur,
  date,
  idPenanggungJawab,
  dikerami,
  idZone,
  keterangan,
}: TambahPenyuNaikDOT & TambahTelurDikeramiDOT): Promise<ResponseNaik> {
  console.log(dikerami);
  try {
    const response = bertelur
      ? await createNaik({
          telurBaik: telurBaik,
          idPenanggungJawab: idPenanggungJawab,
          date: date,
          penyuNaik: penyuNaik,
          dikerami: dikerami,
          idZone,
          keterangan: keterangan,
        })
      : await createPenyuNaikTidakBertelur({
          idPenanggungJawab: idPenanggungJawab,
          date: date,
          penyuNaik: penyuNaik,
          dikerami: dikerami,
          idZone,
          keterangan: keterangan,
        });

    if (dikerami) {
      const update = await updateStatusPenyuNaik({
        idDok: response.idDok,
        idData: response.id,
      });

      const data = await createTelurDikeramiTrack({
        telurBaik: telurBaik,
        idPenanggungJawab: idPenanggungJawab,
        date: date,
        idData: response.idDok,
        keterangan: keterangan,
      });
      if (!data || !update) throw new Error("Data Tidak Masuk");
    }

    if (!response) throw new Error("Data Tidak Masuk");
    return {
      massage: `data di update pada tanggal ${response.create}`,
      kode: 202,
      data: response,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function updatedPenyuNaik(
  idData: number,
  {
    telurBaik,
    idPenanggungJawab,
    penyuNaik,
    date,
    bertelur,
  }: TambahPenyuNaikDOT
): Promise<ResponseNaik> {
  try {
    const res = await updatePenyuNaik({
      telurBaik: telurBaik,
      idPenanggungJawab: idPenanggungJawab,
      penyuNaik: penyuNaik,
      date: date,
      bertelur: bertelur,

      idData: idData,
    });
    if (!res) throw new Error("Data tidak Masuk");
    return {
      massage: `data di update pada tanggal ${res.update}`,
      kode: 202,
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

export async function deletePenyuNaik(id: bigint): Promise<ResponseNaik> {
  try {
    const searchData = await getPenyuByID(id)
    let data:any = 0
    if (!searchData?.telurDiselamatkan)  data = await DeletePenyuNaik(id);
    if(data!==0||!data) throw Error("Data Tidak DIketahui") 
    return {
      massage: `data ${data.idDok} dihapus`,
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


