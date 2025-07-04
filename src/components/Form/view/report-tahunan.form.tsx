'use client';

import { ReportTahunan } from "@/types";
import { Typography } from '@mui/material';
import { Button } from '@/components/ui/button'; // Pastikan Anda mengimpor Button dari shadcn-ui
import useStatusUtils from "@/utils/status-toast.utils";

export function ReportTahunanView({ dataReport }: { dataReport: ReportTahunan | null | undefined }) {
  
  const { onCustomMessage } = useStatusUtils();

  const handleCopy = () => {
    if (dataReport) {
      const textToCopy = `
        ID Dokumen: ${dataReport.idDok || "ID Dokumen"}
        Tahun: ${dataReport.Tahun || "Tahun tidak tersedia"}
        Penyu Naik Tak Bertelur: ${dataReport.PenyuNaikTakBertelur || 0}
        Penyu Naik Bertelur: ${dataReport.PenyuNaikBertelur || 0}
        Total Telur Diselamatkan: ${dataReport.TotalTelurDiselamatkan || 0}
        Total Telur Menetas: ${dataReport.TotalTelurMenetas || 0}
        Total Telur Tak Menetas: ${dataReport.TotalTelurTakMenetas || 0}
        Total Tukik Mati: ${dataReport.TotalTukikMati || 0}
        Total Tukik Dilepaskan: ${dataReport.TotalTukikDilepaskan || 0}
        Tempat: ${dataReport.Tempat || "Tempat tidak tersedia"}
        Tanggal Dibuat: ${dataReport.TanggalDibuat 
          ? new Date(dataReport.TanggalDibuat).toLocaleDateString() 
          : "Tanggal tidak tersedia"}
        ${dataReport.TanggalUpdate 
          ? `Tanggal Update: ${new Date(dataReport.TanggalUpdate).toLocaleDateString()}` 
          : ""}
      `;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        onCustomMessage({
          tittle: "Salin Data",
          Message: `Data tahun ${dataReport.Tahun} berhasil  disalin ke clipboard`,
          variant: "default",
        });
      }).catch(err => {
        console.error("Gagal menyalin: ", err);
      });
    }
  };

  return (
    <section className="container p-4">
      <div className="space-y-4 max-h-[80vh] overflow-y-auto"> {/* Set max height and overflow */}
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            ID Dokumen
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.idDok || "ID Dokumen"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tahun
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.Tahun || "Tahun tidak tersedia"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Penyu Naik Tak Bertelur
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.PenyuNaikTakBertelur || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Penyu Naik Bertelur
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.PenyuNaikBertelur || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Total Telur Diselamatkan
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.TotalTelurDiselamatkan || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Total Telur Menetas
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.TotalTelurMenetas || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold ```typescriptreact
            mb-1">
            Total Telur Tak Menetas
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.TotalTelurTakMenetas || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Total Tukik Mati
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.TotalTukikMati || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Total Tukik Dilepaskan
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.TotalTukikDilepaskan || 0}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tanggal Dibuat
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataReport?.TanggalDibuat 
              ? new Date(dataReport.TanggalDibuat).toLocaleDateString() 
              : "Tanggal tidak tersedia"}
          </Typography>
        </div>

        {dataReport?.TanggalUpdate && (
          <div>
            <Typography variant="subtitle1" className="font-bold mb-1">
              Tanggal Update
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              {new Date(dataReport.TanggalUpdate).toLocaleDateString()}
            </Typography>
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleCopy}>
          Salin Data
        </Button>
      </div>
    </section>
  );
}