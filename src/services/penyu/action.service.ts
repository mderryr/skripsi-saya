'use server'

import {getDataPenyu} from './data-penyu.prisma'

export async function getJenisPenyu(){
    try{
        const data = await getDataPenyu()
        return {
            data:data,
            massage:"Data jenis penyu berhasil didapatkan",
            kode:202
        }
    }catch (err: any) {
        console.error(err);
        return {
          massage: err.toString(),
          kode: 500,
        };
      }
}