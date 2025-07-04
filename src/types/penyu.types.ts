import { Prisma } from '@/services/db';
import { z } from 'zod';

// export const TambahTukikMenetasZod = z.object({
//   idTukik: z.number(),
//   idInkubator: z.number(),
//   penyuMati:z.number()||z.preprocess(data=>Number(data),z.number()),
//   tanggalData: z.string()||z.date(),
// }); 

// export type TambahTukikMenetasDOT = z.infer<typeof TambahTukikMenetasZod>;

export type JenisPenyu = Prisma.JenisPenyuGetPayload<Prisma.JenisPenyuDefaultArgs>;
