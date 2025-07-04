"use server";

import { TambahReportBulananDOT } from "@/types";
import { Logic as DatabseNaik } from "@/services/naik";
import { LOGIC as DatabseDikerami } from "@/services/dikerami";
import { Logic as DatabseMenetas } from "@/services/menetas";
import { LOGIC as DatabaseDiinkubasi } from "@/services/diinkubasi";
import { Logic as DatabaseDilepas } from "@/services/dilepas";
import { Logic as DatabaseMati } from "@/services/mati";

export async function getAllDataMonth({
  bulan,
  tahun,
}: TambahReportBulananDOT) {
  try {
    // Pengambilan data
    const penyuNaik = (await DatabseNaik.getPenyuNaikDate(bulan, tahun)) ?? [];
    const telurDikerami = (await DatabseDikerami.getPenyuPengeramanDate(bulan, tahun)) ?? [];
    const telurMenetas = (await DatabseMenetas.getPenyuMenetasDate(bulan, tahun)) ?? [];
    const inkubasi = (await DatabaseDiinkubasi.getInkubasiPenyuDate(bulan, tahun)) ?? [];
    const tukikMati = (await DatabaseMati.getPenyuMatiDate(bulan, tahun)) ?? [];
    const pelepasan = (await DatabaseDilepas.getPenyuDilepasDate(bulan, tahun)) ?? [];


    return {
      penyuNaik: penyuNaik,
      telurDikerami: telurDikerami,
      telurMenetas: telurMenetas,
      inkubasi: inkubasi,
      tukikMati: tukikMati,
      pelepasan: pelepasan
    }
  } catch (error) {
    console.log(error)
    return {
      penyuNaik: [],
      telurDikerami: [],
      telurMenetas: [],
      inkubasi: [],
      tukikMati: [],
      pelepasan: [],
    }
  }

}

