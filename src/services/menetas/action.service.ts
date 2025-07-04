"use server";
import {
  getPenyuMenetas,
  getPenyuMenetasTrack,
  createTelurMenetas as TelurMenetas,
  createTelurMenetasNotTrack as TelurMenetasNoTrack,
  updateStatusPenyuMenetas,
  updatePenyuMenetas as UpdateMenetas,
  deletaPenyuMenetas,
  getSpesifikMenetasByID
} from "./pendataan-menetas.prisma";
import {
  TambahTukikMenetasDOT,
  TambahTukikInkubasiDOT,
  UpdateTelurDOT,
} from "@/types";
import {updateStatusPenyuPengeraman} from '@/services/dikerami/pendataan-pengeraman.prisma'
import { createInkubasiPenyuTrack } from "@/services/diinkubasi/pendataan-inkubasi.prisma";
import { updateTelurInkubator } from "@/services/inkubator/inkubator.prisma";
import moment from "moment";

interface ResponseMenetas {
  massage: string;
  kode: string | number;
  data?:
    | Awaited<ReturnType<typeof getPenyuMenetas>>
    | Awaited<ReturnType<typeof TelurMenetas>>
    | Awaited<ReturnType<typeof TelurMenetasNoTrack>>
    | Awaited<ReturnType<typeof UpdateMenetas>>
    | Awaited<ReturnType<typeof deletaPenyuMenetas>>
    | null;
  forward?: string;
}

export async function getTelurMenetas(Track=false): Promise<ResponseMenetas> {
  try {
    const res =Track? await getPenyuMenetasTrack() : await getPenyuMenetas();
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

export async function createTelurMenetas({
  telurBaik,
  idPenanggungJawab,
  date,
  idPenyu,
  idData,
  telurRusak,
  idInkubator,
}: TambahTukikMenetasDOT &
  TambahTukikInkubasiDOT &
  TambahTukikInkubasiDOT &
  UpdateTelurDOT & {
    //idPenyuDikerami
    idData?: string;
  }): Promise<ResponseMenetas> {
  try {  
      const res =idData? await TelurMenetas({
        telurBaik: telurBaik,
        idPenanggungJawab: idPenanggungJawab,
        date: date,
        idPenyu: idPenyu,
        idData: idData,
        telurRusak: telurRusak,
      }):await TelurMenetasNoTrack({
        telurBaik: telurBaik,
        telurRusak: telurRusak,
        idPenanggungJawab: idPenanggungJawab,
        date: date,
        idPenyu: idPenyu,
      });
    if(idData){
      const updateMenetas = await updateStatusPenyuPengeraman({
        idDok:idData
      })
      if(idInkubator) {
        const updateStatus = await updateStatusPenyuMenetas({
          idDok: res.idDok,
          idData: res.id,
        });
        const createInkubasi = await createInkubasiPenyuTrack({
          jumlahTukik: telurBaik,
          idPenanggungJawab: idPenanggungJawab,
          date: date,
          idInkubator: idInkubator,
          idData: res.idDok,
        });
        const updateInkubasi = await updateTelurInkubator({
          idData: idInkubator,
          telurBaik: telurBaik,
          telurRusak: telurRusak,
        });
        if (!updateStatus|| !createInkubasi || !updateInkubasi)
          throw new Error("Data tidak masuk");
      }
      if(!updateMenetas) throw new Error("Tidak bisa update menetas")
    }

    if (!res) throw new Error("Data tidak dapat dimasukkan");
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

export async function updateTelurMenetas({
  telurBaik,
  telurRusak,
  idPenanggungJawab,
  date,
  idData,
  idPenyu,
}: TambahTukikMenetasDOT & {
  idData: number;
}): Promise<ResponseMenetas> {
  try {
    const update = await UpdateMenetas({
      telurBaik: telurBaik,
      telurRusak: telurRusak,
      idPenanggungJawab: idPenanggungJawab,
      date: date,
      idData: idData,
      idPenyu: idPenyu,
    });
    if (!update) throw new Error("New Error");
    
    return {
      massage: `Data Diupdate pada tanggal ${moment(Date.now()).format("DD MMMM YYYY")}`,
      kode: 200,
      data: update, 
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function deleteTelurMenetas(id:number) {
  try {
    const checkData = await getSpesifikMenetasByID({idData:id})
    let res:any = 0
    if(!checkData?.idPenyuDikerami) res = await deletaPenyuMenetas(id)
    if(res !==0 || !res) throw new Error("Data tidak dimasukkan")
    return {
      massage: `Data dihapus pada tanggal ${Date.now()}`,
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
