import { Prisma } from "@/services/db";
import { number, z } from "zod";
// import moment from 'moment'

export interface LogItem {
  tanggalData: string;
  penyuBertelur?: boolean;
  jumlahPenyu?: number;
  telurBaik?: number;
  telurMenetas?: number;
  telurRusak?: number;
  JumlahTukik?: number;
  penyuMati?: number;
}

export interface LogData {
  tanggal: string;
  aktivitas: string;
  jumlah: number;
}

export const TambahReportBulananZod = z.object({
  bulan: z.number(),
  tahun: z.number(),
});

export interface updateReportBulanan extends CreateReportBulanan {
  idDok: string;
}

export interface CreateReportBulanan {
  Bulan: number;
  Tahun: number;
  PenyuNaikTakBertelur: number;
  PenyuNaikBertelur: number;
  TotalTelurDiselamatkan: number;
  TotalTelurMenetas: number;
  TotalTelurTakMenetas: number;
  TotalTukikMati: number;
  TotalTukikDilepaskan: number;
  idUser: string;
  Logs: Prisma.JsonObject
  };


export type ReportBulanan =
  Prisma.PenyimpananBulananGetPayload<Prisma.PenyimpananBulananDefaultArgs>;
export type TambahReportBulananDOT = z.infer<typeof TambahReportBulananZod>;
