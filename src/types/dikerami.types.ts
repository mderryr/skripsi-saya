import { Prisma } from "@/services/db";
import { z } from "zod";
import moment from "moment";

export const TambahTelurDikeramiZod = z.object({
  telurBaik: z
    .preprocess(
      (data) => Number(data),
      z.number().positive({
        message: "Telur harus diatas 0",
      })
    )
    .optional(),
  date: z
    .date({
      required_error: "Silahkan pilih tanggal",
      invalid_type_error: "apakah bener ini tanggal ?",
    })
    .transform((val) => moment(val).format()),
  menetas: z.boolean().default(false).optional(),
  keterangan: z.string().optional(),
});

export type TelurDikerami =
  Prisma.TelurDikeramiGetPayload<Prisma.TelurDikeramiDefaultArgs>;

export type TambahTelurDikeramiDOT = z.infer<typeof TambahTelurDikeramiZod> & {
  idPenyuNaik?: string;
  idPenanggungJawab:string
};
