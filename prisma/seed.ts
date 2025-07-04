import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const tempat = await prisma.tempatKonservasi.create({
      data: {
        idTempat:"PL-0001",
        nama: "KEE Pantai Kili Kili",
        alamat: "Wonocoyo, Panggul, Trenggalek Regency, East Java 66364",
      },
    });

    const dataPenyu = await prisma.jenisPenyu.createMany({
      data: [
        {
          idJenisPenyu:"PENYU-1",
          nama: "Penyu Hijau ",
          namaIlmiah: "Chelonia mydas",
        },
        {
        idJenisPenyu:"PENYU-2",
          nama: "Penyu Belimbing",
          namaIlmiah: "Dermochelys coriacea",
        },
        {
        idJenisPenyu:"PENYU-3",
          nama: "Penyu Tempayan",
          namaIlmiah: "Caretta caretta",
        },
        {
        idJenisPenyu:"PENYU-4",
          nama: "Penyu Sisik",
          namaIlmiah: "Eretmochelys imbricata",
        },
        {
          idJenisPenyu:"PENYU-5",
          nama: "Penyu Lekang",
          namaIlmiah: "Lepidochelys olivacea",
        },
        {
          idJenisPenyu:"PENYU-6",
          nama: "Penyu Pipih",
          namaIlmiah: "Natator depressa",
        },
        {
          idJenisPenyu:"PENYU-7",
          nama: "Penyu Lekang Kempi",
          namaIlmiah: "Lepidochelys kempi",
        },
      ],
    });
    const dataInkubasi = await prisma.inkubator.create({
      data: {
        idInkubator:"INK-1",
        namaInkubator: "Penangkaran 1",
      },
    });

    const user = await prisma.user.create({
      data: {
        idUser: "US-4456",
        nomerTelp: "081332160311",
        username: "admin",
        name: "Cuman Admin",
        password:
          "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
        idTempat: tempat.idTempat,
      },
    });

    console.log({  dataPenyu,dataInkubasi,tempat,user });
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
