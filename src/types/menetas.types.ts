import { Prisma } from '@/services/db';
import { z } from 'zod';
import moment from 'moment'

//! nanti diganti messagenya
export const TambahTukikMenetasZod = z.object({
  idPenyu: z.string().optional(),
  idInkubator: z.preprocess(value => Number(value), z.number().positive({
    message: "Anda Hacker ?? 🤨"
  })).optional(),
  telurBaik: z.preprocess(data => Number(data), z.number().positive({
    message: "Ayolah, masa minus 😒"
  })),
  telurRusak: z.preprocess(data => Number(data), z.number().positive({
    message: "Tidak masuk akal kan 😒"
  })),
  diinkubasi: z.boolean().optional(),
  date: z
    .date({
      required_error: "Jangan dikosongin dong 😒",
      invalid_type_error: "apakah bener ini tanggal ? 😒",
    })
    .transform((val) => moment(val).format()),
  keterangan: z.string().optional(),
}).refine((data) => data.telurBaik >= data.telurRusak, {
  message: 'telur menetas harus lebih besar dari telur yang rusak',
  path: ['telurRusak'], // optional, but recommended to specify the path
});

export type TambahTukikMenetasDOT = z.infer<typeof TambahTukikMenetasZod>&{
  idDikerami?:string|undefined
  idPenanggungJawab:string
};

export type TelurMenetas = Prisma.TelurMenetasGetPayload<Prisma.TelurMenetasDefaultArgs>;
