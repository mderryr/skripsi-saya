import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function getDataPenyu(){
    return prisma.jenisPenyu.findMany()
}