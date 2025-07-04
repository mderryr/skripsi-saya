"use server";

import { UserDOT, UpdateUserDOT } from "@/types";
import { createUser, editUser,getUserAll,deleteUser } from "./user.prisma";
import {hash} from '@/services/login/auth'
import { error } from "console";
export async function getPengguna(){
  try{
    const res  = await getUserAll()
   return {
      data: res,
      massage: "Data jenis penyu berhasil didapatkan",
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

// Tambahkan fungsi untuk invalidate cache jika diperlukan
export async function refreshPenggunaCache() {
  try {
    // Implementasi logic refresh cache, misal:
    // - Clear cache
    // - Force refetch
    return {
      message: "Cache pengguna berhasil diperbarui",
      kode: 200
    };
  } catch (err: any) {
    console.error('refreshPenggunaCache error:', err);
    return {
      message: err instanceof Error ? err.message : 'Gagal memperbarui cache',
      kode: 500
    };
  }
}


export async function createNewUser({
  nomerTelp,
  username,
  name,
  password,
  admin,
  idTempat,
}: UserDOT) {
  try {
    const res = await createUser({
      nomerTelp,
      username,
      name,
      password:hash(password).toString(),
      admin,
      idTempat,
    });
    if (!res) throw new Error("Data is not assigned");
    return {
      data: res,
      massage: "Data jenis penyu berhasil didapatkan",
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

export async function UpdateUser({
  id,
  name,
  username,
  nomerTelp,
  admin
}: UpdateUserDOT & {
  id: string;
}) {
  try {
    const res = await editUser({
      id,
      name,
      username,
      nomerTelp,
      admin
    });
    return {
      data: res,
      massage: "Data jenis penyu berhasil didapatkan",
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

export async function DeleteUser(id:number|bigint){
  try {
  let deleteData
    const res = await getUserAll();

    const data = res.map(data=>{
      if(data.admin){
        return data.id
      }
    })
    if(data.length < 1 ) deleteData = await deleteUser(id)
      if (!data&&deleteData) throw new Error("Data tidak ditemukan")
    return {
      data: res,
      massage: "Data jenis penyu berhasil didapatkan",
      kode: 202,
      };
      } catch (err: any) {
        console.error(err);
        return {
          massage: err.toString(),
          kode: 500,
        }
      }
}