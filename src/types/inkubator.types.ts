import { Prisma } from "@/services/db";
import { z } from "zod";


export const TambahInkubatorZod = z.object({
  namaInkubator: z.string(),
  keterangan: z.string().optional(),
  berfungsi: z.boolean().optional(),
});

export const UpdateTelurZod = z.object({
  idData: z.string(),
  telurBaik: z.preprocess((data) => Number(data), z.number()),
  telurRusak: z.preprocess((data) => Number(data), z.number()),
});

export type UpdateTelurDOT = z.infer<typeof UpdateTelurZod>;
export type TambahInkubatorDOT = z.infer<typeof TambahInkubatorZod>;

export type Inkubator = Prisma.InkubatorGetPayload<Prisma.InkubatorDefaultArgs>;
