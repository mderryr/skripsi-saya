"use server";
import { getPenyuMati,
  updatePenyuMati ,
  createPenyuMati,
  DeletePenyuMati,
  getSpesifikPenyuMatiByID
} from "./pendataan-mati.prisma";
import { TambahTukikMatiDOT } from "@/types";
import {Logic} from '@/services/inkubator'

interface ResponseMati {
  massage: string;
  kode: string | number;
  data?: any | null;
  forward?: string;
}

export async function getInkubasiMati(): Promise<ResponseMati> {
  try {
    const data = await getPenyuMati();
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

export async function createInkubasiMati({  
  idPenanggungJawab,
    date,
    idPenyu,
    penyuMati,
    idInkubator,
    keterangan, 
    hidup,
    mati,
    Track=false
}:TambahTukikMatiDOT&{
    Track?:boolean
    hidup:number
    mati:number
    }): Promise<ResponseMati> {
  try {
    const data = await createPenyuMati({
      idPenanggungJawab,
      date,
      idPenyu,
      penyuMati,
      idInkubator,
      keterangan
    })
    if(Track&&idInkubator){
      const Update = await  Logic.updateTelurInkubator({
        idData:idInkubator,
        telurBaik:hidup,
        telurRusak:mati,
      })
      if(!Update) throw new Error("Data Tidak Masuk")
    }
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

export async function updateInkubasiMati({
  idPenyu,
  idPenanggungJawab,
  idInkubator,
  penyuMati,
  date,
  keterangan,
  idData
}: TambahTukikMatiDOT 
): Promise<ResponseMati> {
  try {
    const data = await updatePenyuMati({
      penyuMati,
      idPenanggungJawab,
      date,
      idData,
      idInkubator,
      keterangan,
      idPenyu
    });
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

export async function deleteInkubasiMati(id:bigint): Promise<ResponseMati> {
  try {
    const checkData = await getSpesifikPenyuMatiByID(id)
    let data
    if(!checkData?.idInkubator) data = await DeletePenyuMati(id)
    if(!data&&checkData?.idDok) throw new Error("Data tidak ada")
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
