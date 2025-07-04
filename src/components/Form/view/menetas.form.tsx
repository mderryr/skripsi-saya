'use client';
import { Label } from "@/components/ui/label";
import moment from "moment";
import { TelurMenetas } from "@/types";
import { Typography } from '@mui/material';

export function MenetasView({ DataPenyu }: { DataPenyu: TelurMenetas|null|undefined|any }) {
  return (
    <section className="container p-4">
      <div className="space-y-4">
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            ID Dokumen
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DataPenyu?.idDok || "ID Dokumen"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tanggal Pengambilan Data
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {moment(DataPenyu?.tanggalData).format("dddd DD MMM YYYY")}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jumlah Penyu Menetas
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DataPenyu?.telurMenetas} Ekor
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jumlah Telur Tidak Menetas
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DataPenyu?.telurRusak
              ? DataPenyu?.telurRusak + " Telur"
              : "Tidak ada Telur"}
          </Typography>
        </div>
        <div>
        <Typography variant="subtitle1" className="font-bold mb-1">
            Penanggung Jawab
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DataPenyu?.user?.name || "Tidak Diketahui"}
          </Typography>
        </div>
      </div>
    </section>
  );
}