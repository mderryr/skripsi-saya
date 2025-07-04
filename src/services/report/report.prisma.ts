"use server";

import { PrismaClient } from "@prisma/client";
import CustomID from "@/utils/cusromID.utils";
import {
  ReportBulanan,
  ReportTahunan,
  type updateReportBulanan,
  type CreateReportBulanan,
  type UpdateReportTahunan,
  type CreateReportTahunan,
} from "@/types";
import moment from "moment";
const prisma = new PrismaClient();

export async function createReportMonh({
  Bulan,
  Tahun,
  idUser,
  PenyuNaikTakBertelur,
  PenyuNaikBertelur,
  TotalTelurDiselamatkan,
  TotalTelurMenetas,
  TotalTelurTakMenetas,
  TotalTukikMati,
  TotalTukikDilepaskan,
  Logs
}: CreateReportBulanan) {
  return prisma.penyimpananBulanan.create({
    data: {
      idDok: CustomID("ReportBulanan", moment().format()),
      Bulan,
      Tahun,
      PenyuNaikTakBertelur,
      PenyuNaikBertelur,
      TotalTelurDiselamatkan,
      TotalTelurMenetas,
      TotalTelurTakMenetas,
      TotalTukikMati,
      TotalTukikDilepaskan,
      Tempat: "PL-0001",
      idUser,
      Logs
    },
  });
}

export async function createReportYears({
  PenyuNaikTakBertelur,
  PenyuNaikBertelur,
  TotalTelurDiselamatkan,
  TotalTelurMenetas,
  TotalTelurTakMenetas,
  TotalTukikMati,
  TotalTukikDilepaskan,
  idUser,
  Tahun,
  Logs
}: CreateReportTahunan) {
  return prisma.penyimpananTahunan.create({
    data: {
      idDok: CustomID("ReportTahunan", moment().format()),
      PenyuNaikTakBertelur,
      PenyuNaikBertelur,
      TotalTelurDiselamatkan,
      TotalTelurMenetas,
      TotalTelurTakMenetas,
      TotalTukikMati,
      TotalTukikDilepaskan,
      Tempat: "PL-0001",
      Tahun,
      idUser,
      Logs
    },
  });
}

export async function updateReportBulanan({
  Bulan,
  Tahun,
  PenyuNaikTakBertelur,
  PenyuNaikBertelur,
  TotalTelurDiselamatkan,
  TotalTelurMenetas,
  idUser,
  TotalTelurTakMenetas,
  TotalTukikMati,
  TotalTukikDilepaskan,
  idDok,
  Logs
}: updateReportBulanan) {
  return prisma.penyimpananBulanan.update({
    where: {
      Bulan,
      Tahun,
      idDok,
    },
    data: {
      PenyuNaikTakBertelur,
      PenyuNaikBertelur,
      TotalTelurDiselamatkan,
      TotalTelurMenetas,
      TotalTelurTakMenetas,
      TotalTukikMati,
      TotalTukikDilepaskan,
      TanggalUpdate: moment().toDate(),
      idUser,
      Logs
    },
  });
}

export async function updateReportYears({
  Tahun,
  idDok,
  PenyuNaikTakBertelur,
  PenyuNaikBertelur,
  TotalTelurDiselamatkan,
  TotalTelurMenetas,
  TotalTelurTakMenetas,
  TotalTukikMati,
  TotalTukikDilepaskan,
  idUser,
  Logs
}: UpdateReportTahunan) {
  return prisma.penyimpananTahunan.update({
    where: {
      Tahun,
      idDok,
    },
    data: {
      PenyuNaikTakBertelur,
      PenyuNaikBertelur,
      TotalTelurDiselamatkan,
      TotalTelurMenetas,
      TotalTelurTakMenetas,
      TotalTukikMati,
      TotalTukikDilepaskan,
      idUser,
      Logs
    },
  });
}

export async function getReportMonth() {
  return prisma.penyimpananBulanan.findMany();
}

export async function getReportYear() {
  return prisma.penyimpananTahunan.findMany();
}

export async function getReportMonthByMonth(Bulan: number, Tahun: number) {
  return prisma.penyimpananBulanan.findFirst({
    where: {
      Bulan,
      Tahun,
    },
  });
}
export async function getAllReportMonthByYear( Tahun: number) {
    return prisma.penyimpananBulanan.findMany({
      where: {
        Tahun,
      },
    })
}

export async function getReportByYear(Tahun: number) {
  return prisma.penyimpananTahunan.findFirst({
    where: {
      Tahun,
    },
  });
}

export async function getReportYearByID(idDok: string) {
  return prisma.penyimpananTahunan.findFirst({
    where: {
      idDok,
    },
  });
}


export async function getReportMonthByID(idDok: string) {
  return prisma.penyimpananBulanan.findFirst({
    where: {
      idDok,
    },
  });
}
