import { Prisma } from '@/services/db';
import { z } from 'zod';
import moment from 'moment'

export const TambahPelepasanTukik = z.object({
  date: z
  .date({
    required_error: "Jangan dikosongin dong 😒",
    invalid_type_error: "apakah bener ini tanggal ? 😒",
  })
  .transform((val) => moment(val).format()),
  idInkubator:z.string().optional(),
  JumlahTukik:z.preprocess(data => Number(data), z.number().positive({
    message: "Silahkan Pakai Angka"
  })),
  keterangan:z.string().optional(),
});

export type TambahPelepasanTukikDOT = z.infer<typeof TambahPelepasanTukik>&{
  idPenanggungJawab:string
};

export type Pelepasan = Prisma.PelepasanGetPayload<Prisma.PelepasanDefaultArgs>;
