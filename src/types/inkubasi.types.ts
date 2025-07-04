import { Prisma } from '@/services/db';
import { z } from 'zod';
import moment from 'moment'

export const TambahTukikInkubasi = z.object({
  idPenyu:z.string().optional(),
  date: z
  .date({
    required_error: "Jangan dikosongin dong 😒",
    invalid_type_error: "apakah bener ini tanggal ? 😒",
  })
  .transform((val) => moment(val).format()),
  idInkubator:z.string(),
  jumlahTukik:z.preprocess(data=>Number(data),z.number().positive({
    message: "Tukik tidak boleh dibawah 0"
  })),
  keterangan:z.string().optional()
});

export type TambahTukikInkubasiDOT = z.infer<typeof TambahTukikInkubasi>&{
  idPenyuMenetas? : string
  idPenanggungJawab:string
  idData?:number|string
};

export type Inkubasi = Prisma.InkubasiPenyuGetPayload<Prisma.InkubasiPenyuDefaultArgs>;
