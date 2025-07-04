"use client";

import { Inkubasi, Inkubator,JenisPenyu } from "@/types";
import { Typography } from '@mui/material';
import moment from "moment";

export function inkubasiView({
  DATAIN,
}: {
  DATAIN: (Inkubasi & { Inkubasi: Inkubator
    penyu:JenisPenyu
   }) | undefined | null | any;
}) {
  return (
    <section className="container p-4">
      <div className="space-y-4">
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            ID Dokumen
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DATAIN?.idDok || "ID Dokumen"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tanggal Pengambilan Data
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {moment(DATAIN?.tanggalData).format("dddd DD MMM YYYY")}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jumlah Tukik Dirawat
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DATAIN?.JumlahTukik} Ekor
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jenis Penyu
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DATAIN?.penyu?.nama 
              ? `${DATAIN.penyu?.nama }` 
              : " - "}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Penanggung Jawab
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DATAIN?.user?.name || "Another"}
          </Typography>
        </div>
      </div>
    </section>
  );
}