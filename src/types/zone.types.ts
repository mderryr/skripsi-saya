import { Prisma } from "@/services/db";
import { z } from "zod";

export const ZonaZod = z.object({
    nama:z.string(),
    keterangan:z.string().optional(),
});

export type ZonaDOT = z.infer<typeof ZonaZod>;


export type Zona =Prisma.ZonaGetPayload<Prisma.ZonaDefaultArgs>;
