import { Prisma } from '@/services/db';
import { z } from 'zod';
// import moment from 'moment'

export const TambahReportTahunanZod = z.object({
    tahun:z.number()
})

export interface UpdateReportTahunan extends CreateReportTahunan{
    idDok:string
}
interface LogData {
    tanggal: string;
    aktivitas: string;
    jumlah: number;
}

export interface CreateReportTahunan{
    Tahun:number
    PenyuNaikTakBertelur:number
    PenyuNaikBertelur:number
    TotalTelurDiselamatkan:number
    TotalTelurMenetas:number
    TotalTelurTakMenetas:number
    TotalTukikMati:number
    TotalTukikDilepaskan:number
    idUser:string 
    Logs:Prisma.JsonObject
}


export type ReportTahunan = Prisma.PenyimpananTahunanGetPayload<Prisma.PenyimpananTahunanDefaultArgs>
export type TambahReportTahunanDOT = z.infer<typeof TambahReportTahunanZod>