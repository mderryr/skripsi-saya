"use server";
import {
  getInkubasiPenyu,
  createInkubasiPenyu as createInkubasi,
  createInkubasiPenyuTrack,
  updatePendataanInkubasi,
  deletePendataanInkubasi as DeletePendataanInkubasi,
  getSpesifikInkubasiByID
} from "@/services/diinkubasi/pendataan-inkubasi.prisma";
import { updateStatusPenyuMenetas } from "@/services/menetas/pendataan-menetas.prisma";
import { TambahTukikInkubasiDOT } from "@/types";
import {Logic} from '@/services/inkubator'

interface ResponseInkubasi {
  massage: string;
  kode: string | number;
  data?:
    | Awaited<ReturnType<typeof getInkubasiPenyu>>
    | Awaited<ReturnType<typeof createInkubasi>>
    | Awaited<ReturnType<typeof updatePendataanInkubasi>>
    | Awaited<ReturnType<typeof DeletePendataanInkubasi>>
    | null;
  forward?: string;
}

export async function getInkubasi(): Promise<ResponseInkubasi> {
  try {
    const res = await getInkubasiPenyu();
    if (!res) throw new Error("Data tidak bisa di input");
    return {
      massage: `Data dibuat pada tanggal ${res}`,
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

export async function crerateInkubasiPenyu({
  jumlahTukik,
  idPenanggungJawab,
  date,
  idInkubator,
  idData,
  tukikMati,
  idPenyu,
  tukikHidup,
  id,
}: TambahTukikInkubasiDOT & {
  idData?: string;
  tukikMati:number
  tukikHidup:number
 id:number
}) {
  try {
    const res = idData
      ? await createInkubasiPenyuTrack({
        jumlahTukik: jumlahTukik,
        idPenanggungJawab: idPenanggungJawab,
        date: date,
        idInkubator: idInkubator,
        idData: idData,
        idPenyu :idPenyu
      }):await createInkubasi({
          jumlahTukik: jumlahTukik,
          idPenanggungJawab: idPenanggungJawab,
          date: date,
          idInkubator: idInkubator,
          idPenyu :idPenyu
        }) 
    if (idData && id) {
      const updateStatus = await updateStatusPenyuMenetas({
        idDok: idData,
        idData: BigInt(id),
      });
      if(idInkubator){
        const updateTukik = await Logic.updateTelurInkubator({
          idData:idInkubator,
          telurBaik:tukikHidup,
          telurRusak:tukikMati,
        })
        if(!updateTukik) throw new Error("Data tidak masuk");
      }


      if (!updateStatus) throw new Error("Data tidak masuk");
    }
    if (!res) throw new Error("Data tidak masuk");
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

export async function updateInkubasiPenyu({
  idData,
  jumlahTukik,
  idPenanggungJawab,
  date,
  idInkubator,
}: TambahTukikInkubasiDOT & {
  idData: number;
}) {
  try {
    const res = await updatePendataanInkubasi({
      idData: idData,
      jumlahTukik: jumlahTukik,
      idPenanggungJawab: idPenanggungJawab,
      date: date,
      idInkubator: idInkubator,
    });
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}

export async function deletePendataanInkubasi(id: number) {
  try {
    const checkData = await getSpesifikInkubasiByID({idData:id})
    let res:any = 0
    if (!checkData?.idPenyuMenetas) res =  await DeletePendataanInkubasi(id);

    if (res !== 0 || !res) throw new Error(`Data ${id} tidak bisa dihapus`);
    return {
      massage: `Data ${res.idDok} telah dihapus`,
      kode: 200,
    };
  } catch (err: any) {
    console.error(err);
    return {
      massage: err.toString(),
      kode: 500,
    };
  }
}
