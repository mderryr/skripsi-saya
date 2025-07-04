import moment from "moment";
import {
  PenyuNaik,
  TelurDikerami,
  Inkubasi,
  TukikMati,
  Pelepasan,
  TelurMenetas,
  ReportBulanan,
} from "@/types";
import getNamaBulan,{namaBulanPanjang as NamaBulan} from "@/utils/nama-bulan.utils";

export enum AktivitasPenyu {
  PENYU_NAIK_BERTELUR = "Penyu Naik Bertelur",
  PENYU_NAIK_TIDAK_BERTELUR = "Penyu Naik Tidak Bertelur",
  TELUR_DIKERAMI = "Telur Dikerami",
  TELUR_MENETAS = "Telur Menetas",
  TELUR_TIDAK_MENETAS = "Telur Tidak Menetas",
  DIRAWAT = "Dirawat",
  TUKIK_MATI = "Tukik Mati",
  PELEPASAN_TUKIK = "Pelepasan Tukik",
}

import { Prisma } from "@prisma/client";
export const generateLogsBulanan = (
  penyuNaik?: PenyuNaik[],
  telurDikerami?: TelurDikerami[],
  telurMenetas?: TelurMenetas[],
  inkubasi?: Inkubasi[],
  tukikMati?: TukikMati[],
  pelepasan?: Pelepasan[]
): Prisma.JsonObject => {
  const logs: Array<{
    tanggal: string;
    aktivitas: string;
    jumlah: number;
  }> = [];

  // Log Penyu Naik (Bertelur dan Tidak Bertelur)
  if (penyuNaik) {
    penyuNaik.forEach((item) =>
      logs.push({
        tanggal: moment(item.tanggalData).format("YYYY-MM-DD"),
        aktivitas: item.penyuBertelur
          ? "Penyu Naik Bertelur"
          : "Penyu Naik Tidak Bertelur",
        jumlah: item.jumlahPenyu || 0,
      })
    );
  }

  // Log Telur Dikerami
  if (telurDikerami) {
    telurDikerami.forEach((item) =>
      logs.push({
        tanggal: moment(item.tanggalData).format("YYYY-MM-DD"),
        aktivitas: "Telur Dikerami",
        jumlah: item.telurBaik || 0,
      })
    );
  }

  // Log Telur Menetas dan Tidak Menetas
  if (telurMenetas) {
    telurMenetas.forEach((item) =>
      logs.push({
        tanggal: moment(item.tanggalData).format("YYYY-MM-DD"),
        aktivitas: item.telurMenetas ? "Telur Menetas" : "Telur Tidak Menetas",
        jumlah: item.telurMenetas ? item.telurMenetas : item.telurRusak || 0,
      })
    );
  }

  // Log Inkubasi
  if (inkubasi) {
    inkubasi.forEach((item) =>
      logs.push({
        tanggal: moment(item.tanggalData).format("YYYY-MM-DD"),
        aktivitas: "Dirawat",
        jumlah: item.JumlahTukik || 0,
      })
    );
  }

  // Log Tukik Mati
  if (tukikMati) {
    tukikMati.forEach((item) =>
      logs.push({
        tanggal: moment(item.tanggalData).format("YYYY-MM-DD"),
        aktivitas: "Tukik Mati",
        jumlah: item.penyuMati || 0,
      })
    );
  }

  // Log Pelepasan Tukik
  if (pelepasan) {
    pelepasan.forEach((item) =>
      logs.push({
        tanggal: moment(item.tanggalData).format("YYYY-MM-DD"),
        aktivitas: "Pelepasan Tukik",
        jumlah: item.JumlahTukik || 0,
      })
    );
  }

  // Urutkan log dari tanggal termuda ke tertua
  const sortedLogs = logs.sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );

  return {
    ...sortedLogs,
  } as any;
};

export const generateLogTahunan = async ({
  Report,
}: {
  Report: ReportBulanan[];
}) => {
  const logTahunan: Record<string, Record<string, number>> = {};
  const bulanNames = NamaBulan

  // Inisialisasi semua bulan dengan nilai default
  bulanNames.forEach(bulan => {
    logTahunan[bulan] = {
      PenyuNaikTakBertelur: 0,
      PenyuNaikBertelur: 0,
      TotalTelurDiselamatkan: 0,
      TotalTelurMenetas: 0,
      TotalTelurTakMenetas: 0,
      TotalTukikMati: 0,
      TotalTukikDilepaskan: 0,
    };
  });

  // Iterasi setiap laporan bulanan
  Report.forEach((report) => {
    const namaBulan = getNamaBulan(report.Bulan); // Mengambil nama bulan menggunakan getNamaBulan
    if (logTahunan[namaBulan]) {
      // Menambahkan data ke dalam log tahunan
      logTahunan[namaBulan].PenyuNaikTakBertelur += report.PenyuNaikTakBertelur || 0;
      logTahunan[namaBulan].PenyuNaikBertelur += report.PenyuNaikBertelur || 0;
      logTahunan[namaBulan].TotalTelurDiselamatkan += report.TotalTelurDiselamatkan || 0;
      logTahunan[namaBulan].TotalTelurMenetas += report.TotalTelurMenetas || 0;
      logTahunan[namaBulan].TotalTelurTakMenetas += report.TotalTelurTakMenetas || 0;
      logTahunan[namaBulan].TotalTukikMati += report.TotalTukikMati || 0;
      logTahunan[namaBulan].TotalTukikDilepaskan += report.TotalTukikDilepaskan || 0;
    }
  });

  return logTahunan;
};