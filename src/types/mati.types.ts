import { Prisma } from '@/services/db';
import { z } from 'zod';
import moment from 'moment'

export const TambahTukikMatiZod = z.object({
  idPenyu: z.string().optional(),
  idInkubator:z.string().optional(),
  penyuMati:z.preprocess(data=>Number(data),z.number().positive()),
  date: z
  .date({
    required_error: "Jangan dikosongin dong 😒",
    invalid_type_error: "apakah bener ini tanggal ? 😒",
  }) .transform((val) => moment(val).format()),
  keterangan:z.string().optional(),
});

export type TambahTukikMatiDOT = z.infer<typeof TambahTukikMatiZod>&{
  idPenanggungJawab:string
  idData?:bigint
};

export type TukikMati = Prisma.PenyuMatiGetPayload<Prisma.PenyuMatiDefaultArgs>;
