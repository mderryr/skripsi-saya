// import 'dotenv/config'

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// interface konservasi{
// id?:number
// namaTempat:string
// alamat:string
// foto?:string
// }
// interface login{
// username?:string
// email:string
// password:string
// }

// export async function getKonservasi(){
//   return await prisma.tempatKonservasi.findMany()
// }

// export async function CreateKonservasi({namaTempat,alamat,foto}:konservasi){
//   return await prisma.tempatKonservasi.create({
//     data:{
//       nama:namaTempat,
//       alamat:alamat,
//       foto:foto||"Tidak ada"
//     }
//   })
// }

// export async function Update({id,namaTempat,alamat,foto}:konservasi){
//   return await prisma.tempatKonservasi.update({
//     where:{
//       id:id
//     },
//     data:{
//       nama:namaTempat,
//       alamat:alamat,
//       foto:foto||"Tidak ada"
//     }
//   })
// }

