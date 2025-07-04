"use client";
import { Label } from "@/components/ui/label";
import { Pelepasan, Inkubator } from '@/types'
import moment from 'moment'
import { Typography } from "@mui/material";

export function ViewDilepas({
  dataPenyu
}: {
  dataPenyu: Pelepasan & {
    Inkubasi: Inkubator
  }
}) {
  return (
    <section className="container p-4">
      <div className="space-y-4">
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            ID Dokumen
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.idDok || "ID Dokumen"}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tanggal Pengambilan Data
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {moment(dataPenyu?.tanggalData).format("dddd DD MMM YYYY")}
          </Typography>
        </div>
        
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tempat Inkubator
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.Inkubasi?.namaInkubator || "Nama Inkubator"}
          </Typography>
        </div>



        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jumlah Tukik Dilepas
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.JumlahTukik 
              ? `${dataPenyu.JumlahTukik} Tukik` 
              : "Tidak ada Tukik"}
          </Typography>
        </div>
      </div>
    </section>
  );
}