'use server'

import { Logic } from '@/services/report'
import WrapperButton from './report'
import { redirect } from 'next/navigation'
import getNamaBulan from '@/utils/nama-bulan.utils'
//------------------------------Disini Halaman Bulanan------------------------
import HalamanPertama from '@/components/template/halamanPertama-month.report'
import HalamanKedua from '@/components/template/halamanKedua-month.report'
//------------------------------Disini Halaman Tahunan------------------------
import HalamanPertamaTahunan from '@/components/template/halamanPertama-years.report'
import HalamanKeduaTahunan from '@/components/template/halamanKedua-years.report'
import HalamanKetigaTahunan from '@/components/template/halamanKetiga-years.report'
interface LogsData {
  json: {
    [month: string]: {
      PenyuNaikBertelur: number;
      PenyuNaikTakBertelur: number;
      TotalTelurDiselamatkan: number;
      TotalTelurMenetas: number;
      TotalTelurTakMenetas: number;
      TotalTukikDilepaskan: number;
      TotalTukikMati: number;
    };
  };
}

interface ReportProps {
  logsData: LogsData;
}

const defaultStyleHalaman: React.CSSProperties = {
  width: '210mm',
  minHeight: '297mm', // Gunakan minHeight
  display: 'flex',
  flexDirection: 'column',
  padding: '10mm',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  pageBreakInside: 'avoid', // Hindari page break di dalam halaman
  pageBreakAfter: 'auto' // Gunakan auto untuk page break
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const idDok = (await params).id

  const prefix = idDok.substring(0, 2);

  function convertToLogsData(reportTahunanLogs: any): LogsData {
    // Pastikan input adalah objek dan tidak null
    if (!reportTahunanLogs || typeof reportTahunanLogs !== 'object') {
      return { json: {} };
    }

    // Buat objek json sesuai dengan struktur LogsData
    const json: {
      [month: string]: {
        PenyuNaikBertelur: number;
        PenyuNaikTakBertelur: number;
        TotalTelurDiselamatkan: number;
        TotalTelurMenetas: number;
        TotalTelurTakMenetas: number;
        TotalTukikDilepaskan: number;
        TotalTukikMati: number;
      }
    } = {};

    // Loop melalui setiap bulan dalam logs
    Object.keys(reportTahunanLogs).forEach(month => {
      const monthData = reportTahunanLogs[month];

      // Pastikan setiap properti memiliki nilai default 0 jika tidak ada
      json[month] = {
        PenyuNaikBertelur: monthData.PenyuNaikBertelur || 0,
        PenyuNaikTakBertelur: monthData.PenyuNaikTakBertelur || 0,
        TotalTelurDiselamatkan: monthData.TotalTelurDiselamatkan || 0,
        TotalTelurMenetas: monthData.TotalTelurMenetas || 0,
        TotalTelurTakMenetas: monthData.TotalTelurTakMenetas || 0,
        TotalTukikDilepaskan: monthData.TotalTukikDilepaskan || 0,
        TotalTukikMati: monthData.TotalTukikMati || 0
      };
    });

    return { json };
  }

  if (prefix === 'RB') {
    const ReportBulanan = await Logic.getReportMonthByID(idDok)
    if (!ReportBulanan) throw new Error("Data Tidak Ada")

    // Konversi objek Logs menjadi array
    const logs = Object.values(ReportBulanan.Logs || {}).map(log => ({
      tanggal: log.tanggal || '',
      aktivitas: log.aktivitas || '',
      jumlah: Number(log.jumlah) || 0
    }));
    const HalamanLaporan = [
      <HalamanPertama
        key="halaman-1"
        data={ReportBulanan} />,
    ]

        // Cek apakah logs ada sebelum menambahkan HalamanKedua
        if (logs.length > 0) {
          HalamanLaporan.push(
            <HalamanKedua
              key="halaman-2"
              dataBulanan={logs}
            />
          );
        }
    
    return (
      <WrapperButton
        halaman={HalamanLaporan}
        namaFile={`Laporan-Bulanan-${getNamaBulan(ReportBulanan.Bulan)}-${ReportBulanan.Tahun}.pdf`}
        styleHalaman={defaultStyleHalaman}
      />
    )
  } else if (prefix === 'RT') {
    // console.log("Data Berjalan")
    const ReportTahunan = await Logic.getReportYearByID(idDok)
    if (!ReportTahunan) throw new Error("Data Tidak Ada")
    const convertData = await convertToLogsData(ReportTahunan.Logs)
    // Pastikan menambahkan HalamanKetigaTahunan
    const HalamanLaporan = [
      <HalamanPertamaTahunan
        key="halaman-1"
        data={ReportTahunan}
      />,
    ]

        // Cek apakah logsData ada sebelum menambahkan HalamanKetigaTahunan
        if (Object.keys(convertData.json).length > 0) {
      
          HalamanLaporan.push(
            <HalamanKeduaTahunan
            key="halaman-2"
            logsData={convertData}
          />,
          );
    
          HalamanLaporan.push(
            <HalamanKetigaTahunan
              dataPenyu={{
                PenyuNaikBertelur: ReportTahunan.PenyuNaikBertelur,
                PenyuNaikTakBertelur: ReportTahunan.PenyuNaikTakBertelur,
                TotalTelurDiselamatkan: ReportTahunan.TotalTelurDiselamatkan,
                TotalTelurMenetas: ReportTahunan.TotalTelurMenetas,
                TotalTelurTakMenetas: ReportTahunan.TotalTelurTakMenetas,
                TotalTukikDilepaskan: ReportTahunan.TotalTukikDilepaskan,
                TotalTukikMati: ReportTahunan.TotalTukikMati,
                TotalTukikDilepas: ReportTahunan.TotalTukikDilepaskan
              }}
              key="halaman-3"
              logsData={ convertData}
            />
          );
        }
    
    return (
      <WrapperButton
        halaman={HalamanLaporan}
        namaFile={`Laporan-Tahunan-${ReportTahunan.Tahun}.pdf`}
        styleHalaman={defaultStyleHalaman}
      />
    )
  } else {
    redirect("admin/proses")
  }
};

