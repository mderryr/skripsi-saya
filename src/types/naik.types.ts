import { Prisma } from "@/services/db";
import { z } from "zod";
import moment from "moment";

export const TambahPenyuNaikZod = z.object({
  telurBaik: z
    .preprocess(
      (data) => Number(data),
      z.number().optional()
    ).optional(),
  penyuNaik: z.preprocess(
    (data) => Number(data),
    z.number().positive({
      message: "Penyu harus diatas 0",
    })
  ),
  bertelur: z.boolean().default(false).optional(),
  date: z
    .date({
      required_error: "Silahkan pilih tanggal",
      invalid_type_error: "apakah bener ini tanggal ?",
    })
    .transform((val) => moment(val).format()),
  keterangan: z.string().optional(),
  dikerami: z.boolean().default(false).optional(),
  idZone: z.preprocess((data) => Number(data), z.number()).optional(),
});

export type TambahPenyuNaikDOT = z.infer<typeof TambahPenyuNaikZod>&{
  idPenanggungJawab:string
  idData?:number|string
};

export type PenyuNaik = Prisma.PenyuNaikGetPayload<Prisma.PenyuNaikDefaultArgs>;
