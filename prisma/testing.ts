import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
const prisma = new PrismaClient();

async function main() {
  try {
   const user = await prisma.user.findFirst({
    where:{
        username:"admin",
        password:createHash("sha256").update("Admin123").digest("hex")
    }
   })
   const inkubator = await prisma.inkubator.findMany();
    console.log({  user,inkubator });
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
