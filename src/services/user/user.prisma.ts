import { UserLoginDOT, UserDOT,UpdateUserDOT,changePassword } from "@/types";
import { PrismaClient } from "@prisma/client";
import {customID} from "@/env/codeID"


const prisma = new PrismaClient();

export function getUsernameAndPassword({ userName, password }: UserLoginDOT) {
  return prisma.user.findFirst({
    where: {
      username: userName,
      password: password,
    },
  });
}

// export function getEmailAndPassword({ email, password }: UserLoginDOT) {
//   return prisma.user.findFirst({
//     where: {
//       email: email,
//       password: password,
//     },
//   });
// }

export function getUserByUserName(username: string) {
    return prisma.user.findFirst({
      where: {
        username: username,
      },
    });
}

export function getUserAll(){
  return prisma.user.findMany()
}

export function getUserByPlace(idTempat:string){
    return prisma.user.findMany({
      where: {
        idTempat: idTempat,
      },
    });
}

export function updatePassword({
  password,
  idUser
}:changePassword&{idUser:string}){
  return prisma.user.update({
      where:{
        idUser:idUser
      },
      data:{
        password:password
      }
  })
}

export function createUser({
  username,
  name,
  password,
  admin,
  idTempat,
  nomerTelp
}: UserDOT) {
  return prisma.user.create({
    data: {
      idUser:`${customID("Pengguna")}-${Math.floor(1000 + Math.random() * 9000)}`,
      username: username,
      name: name,
      password: password,
      nomerTelp:nomerTelp,
      admin: admin,
      idTempat: idTempat,
    },
  });
}

export function editUser({
  username,
  name,
  nomerTelp,
  id,admin
}:  UpdateUserDOT&{
  id:string
}) {
  return prisma.user.update({
    data: {
      name: name,
      username:username,
      nomerTelp:nomerTelp, admin:admin
    },
    where: {
      idUser: id,
    },
  });
}

export function deleteUser (id:number|bigint){
    prisma.user.delete({
        where:{
            id:id
        }
    })
}