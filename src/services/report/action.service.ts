"use server";

import { Logic as DatabseNaik } from "@/services/naik";
import { LOGIC as DatabseDikerami } from "@/services/dikerami";
import { Logic as DatabseMenetas } from "@/services/menetas";
import { LOGIC as DatabaseDiinkubasi } from "@/services/diinkubasi";
import { Logic as DatabaseDilepas } from "@/services/dilepas";
import { Logic as DatabaseMati } from "@/services/mati";
import {
  getReportMonthByMonth,
  updateReportBulanan,
  createReportMonh,
  getReportYear,
  getReportMonth as GetReportMonth,
  getReportByYear as GetDataYears,
  createReportYears,
  updateReportYears,
  getAllReportMonthByYear,
} from "./report.prisma";
import { ReportBulanan, ReportTahunan } from "@/types";
import {
  generateLogsBulanan as generateLogs,
  generateLogTahunan as generateLogsYear,
} from "./generateLogs";

interface ResponseReport {
  massage: string;
  kode: string | number;
  data?:
    | Awaited<ReturnType<typeof getReportYear>>
    | Awaited<ReturnType<typeof GetReportMonth>>
    | Awaited<ReturnType<typeof getReportMonthByMonth>>
    | Awaited<ReturnType<typeof getAllReportMonthByYear>>
    | Awaited<ReturnType<typeof createReportMonh>>
    | Awaited<ReturnType<typeof updateReportBulanan>>
    | Awaited<ReturnType<typeof createReportYears>>
    | Awaited<ReturnType<typeof updateReportYears>>
    | null;
  forward?: string;
}

export async function getReportByYear(): Promise<ResponseReport> {
  try {
    const res = await getReportYear();
    if (!res) throw new Error("Error getting report data");
    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
      kode: 202,
      data: res,
    };
  } catch (error) {
    console.log("Error creating report data: ", error);
    return {
      massage: "Error getting report data",
      kode: 500,
    };
  }
}

export async function getReportMonth(): Promise<ResponseReport> {
  try {
    const res = await GetReportMonth();
    // console.log(res)
    if (!res) throw new Error("Error getting report data");
    return {
      massage: `Data diambil pada waktu ${Date.now()}`,
      kode: 202,
      data: res,
    };
  } catch (error) {
    console.log("Error creating report data: ", error);
    return {
      massage: "Error getting report data",
      kode: 500,
    };
  }
}

export async function createReportMonth(
  month: number,
  year: number,
  user: string = "anonymus"
): Promise<ResponseReport> {
  try {
    const penyuNaik = await DatabseNaik.getPenyuNaikDate(month, year);
    const penyuPengeraman = await DatabseDikerami.getPenyuPengeramanDate(
      month,
      year
    );
    const penyuMenetas = await DatabseMenetas.getPenyuMenetasDate(month, year);
    const inkubasiPenyu = await DatabaseDiinkubasi.getInkubasiPenyuDate(
      month,
      year
    );
    const penyuMati = await DatabaseMati.getPenyuMatiDate(month, year);
    const penyuDilepas = await DatabaseDilepas.getPenyuDilepasDate(month, year);

    // Validate data structure
    if (
      !Array.isArray(penyuNaik) ||
      !Array.isArray(penyuPengeraman) ||
      !Array.isArray(penyuMenetas) ||
      !Array.isArray(inkubasiPenyu) ||
      !Array.isArray(penyuMati) ||
      !Array.isArray(penyuDilepas)
    ) {
      throw new Error("Invalid data structure");
    }

    // console.log(penyuDilepas);

    const result = {
      // Penyu Naik Bertelur: Hitung total telur diselamatkan dari penyu yang bertelur
      penyuNaikBertelur: penyuNaik.reduce((acc, curr) => {
        const isLaying = curr.penyuBertelur === true;
        const telurDiselamatkan = Number(curr.telurDiselamatkan) || 0;
        return acc + (isLaying ? telurDiselamatkan : 0);
      }, 0),

      // Penyu Naik Tidak Bertelur: Hitung penyu yang tidak bertelur
      penyuNaikTidakBertelur: penyuNaik.reduce((acc, curr) => {
        const isNotLaying = curr.penyuBertelur === false;
        const jumlahPenyu = Number(curr.jumlahPenyu) || 1;
        // console.log(acc + (isNotLaying ? jumlahPenyu : 0));
        return acc + (isNotLaying ? jumlahPenyu : 0);
      }, 0),

      teluDiselamatkan: penyuNaik.reduce((acc, curr) => {
        const isLaying = curr.penyuBertelur === true;
        const jumlahTelur = Number(curr.telurDiselamatkan) || 0;
        return acc + (isLaying ? Number(jumlahTelur) : 0);
      }, 0),

      // Telur Dikerami: Hitung total telur baik yang dikerami
      telurDikerami: penyuPengeraman.reduce((acc, curr) => {
        const telurBaik = Number(curr.telurBaik) || 0;
        return acc + telurBaik;
      }, 0),

      // Telur Menetas: Hitung total telur yang menetas
      telurMenetas: penyuMenetas.reduce((acc, curr) => {
        const telurMenetas = Number(curr.telurMenetas) || 0;
        return acc + telurMenetas;
      }, 0),

      // Telur Menetas Rusak: Hitung total telur rusak
      telurMenetasRusak: penyuMenetas.reduce((acc, curr) => {
        const telurRusak = Number(curr.telurRusak) || 0;
        return acc + telurRusak;
      }, 0),

      // Tukik Dirawat: Hitung total tukik yang dirawat
      tukikDirawat: inkubasiPenyu.reduce((acc, curr) => {
        const jumlahTukik = Number(curr.JumlahTukik) || 0;
        return acc + jumlahTukik;
      }, 0),

      // Tukik Mati Dirawat: Hitung total tukik yang mati
      tukikMatiDirawat: penyuMati.reduce((acc, curr) => {
        const penyuMati = Number(curr.penyuMati) || 0;
        return acc + penyuMati;
      }, 0),

      // Tukik Dilepaskan: Hitung total tukik yang dilepaskan
      tukikDilepaskan: penyuDilepas.reduce((acc, curr) => {
        const jumlahTukik = Number(curr.JumlahTukik) || 0;
        return acc + jumlahTukik;
      }, 0),
    };

    // console.log(result);
    //
    const LastData = await getReportMonthByMonth(month, year);
    const Logs = await generateLogs(
      penyuNaik,
      penyuPengeraman,
      penyuMenetas,
      inkubasiPenyu,
      penyuMati,
      penyuDilepas
    );

    if (LastData?.idDok) {
      const update = await updateReportBulanan({
        idDok: LastData.idDok,
        idUser: user,
        Bulan: month,
        Tahun: year,
        PenyuNaikTakBertelur: result.penyuNaikTidakBertelur,
        PenyuNaikBertelur: result.penyuNaikBertelur,
        TotalTelurDiselamatkan: result.penyuNaikBertelur,
        TotalTelurMenetas: result.telurMenetas,
        TotalTelurTakMenetas: result.telurMenetasRusak,
        TotalTukikMati: result.tukikMatiDirawat,
        TotalTukikDilepaskan: result.tukikDilepaskan,
        Logs,
      });

      if (!update) throw new Error("Error updating report data");
      return {
        massage: `Data berhasil dirubah pada waktu ${Date.now()}`,
        kode: 202,
        data: update,
      };
    } else {
      const create = await createReportMonh({
        idUser: user,
        Bulan: month,
        Tahun: year,
        PenyuNaikTakBertelur: result.penyuNaikTidakBertelur,
        PenyuNaikBertelur: result.penyuNaikBertelur,
        TotalTelurDiselamatkan: result.penyuNaikBertelur,
        TotalTelurMenetas: result.telurMenetas,
        TotalTelurTakMenetas: result.telurMenetasRusak,
        TotalTukikMati: result.tukikMatiDirawat,
        TotalTukikDilepaskan: result.tukikDilepaskan,
        Logs,
      });

      if (!create) throw new Error("Error creating report data");
      return {
        massage: `Data berhasil dibuat pada waktu ${Date.now()}`,
        kode: 202,
        data: create,
      };
    }
  } catch (error) {
    console.log("Error creating report data:", error);
    return {
      massage: "Error getting report data",
      kode: 500,
    };
  }
}

export async function createReportYear(
  year: number,
  user: string = "anonymus"
): Promise<ResponseReport> {
  try {
    const data: ReportBulanan[] = await getAllReportMonthByYear(year);

    // console.log(data)

    if (!Array.isArray(data)) {
      throw new Error("Invalid data structure");
    }

    const sumByProperty = <T>(data: T[], property: keyof T): number =>
      data.reduce((acc, curr) => acc + (Number(curr[property]) || 0), 0);

    const result = {
      PenyuNaikTakBertelur: sumByProperty(data, "PenyuNaikTakBertelur"),
      PenyuNaikBertelur: sumByProperty(data, "PenyuNaikBertelur"),
      TotalTelurDiselamatkan: sumByProperty(data, "TotalTelurDiselamatkan"),
      TotalTelurMenetas: sumByProperty(data, "TotalTelurMenetas"),
      TotalTelurTakMenetas: sumByProperty(data, "TotalTelurTakMenetas"),
      TotalTukikMati: sumByProperty(data, "TotalTukikMati"),
      TotalTukikDilepaskan: sumByProperty(data, "TotalTukikDilepaskan"),
    };

    // console.log(result);
    const Logs = await generateLogsYear({Report:data})
    const LastData = await GetDataYears(year);
    if (LastData?.idDok) {
    // console.log(Logs)
      const update = await updateReportYears({
        idDok: LastData.idDok,
        idUser: user,
        PenyuNaikTakBertelur: result.PenyuNaikTakBertelur,
        PenyuNaikBertelur: result.PenyuNaikBertelur,
        TotalTelurDiselamatkan: result.TotalTelurDiselamatkan,
        TotalTelurMenetas: result.TotalTelurMenetas,
        TotalTelurTakMenetas: result.TotalTelurTakMenetas,
        TotalTukikMati: result.TotalTukikMati,
        TotalTukikDilepaskan: result.TotalTukikDilepaskan,
        Tahun: year,
        Logs:Logs,
      });
      // console.log(update)
      if (!update) throw new Error("Error updating report data");
      return {
        massage: `Data berhasil dirubah pada waktu ${Date.now()}`,
        kode: 202,
        data: update,
      };
    } else {
      const create = await createReportYears({
        idUser: user,
        PenyuNaikTakBertelur: result.PenyuNaikTakBertelur,
        PenyuNaikBertelur: result.PenyuNaikBertelur,
        TotalTelurDiselamatkan: result.TotalTelurDiselamatkan,
        TotalTelurMenetas: result.TotalTelurMenetas,
        TotalTelurTakMenetas: result.TotalTelurTakMenetas,
        TotalTukikMati: result.TotalTukikMati,
        TotalTukikDilepaskan: result.TotalTukikDilepaskan,
        Tahun: year,
        Logs:Logs,
      });

      if (!create) throw new Error("Error Create Report Data");
      return {
        massage: `Data berhasil dibuat pada waktu ${Date.now()}`,
        kode: 202,
        data: create,
      };
    }
    // return result
  } catch (error) {
    console.log("Error creating report data:", error);
    return {
      massage: "Error getting report data",
      kode: 500,
    };
  }
}
