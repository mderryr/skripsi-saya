"use client";
import { Typography } from "@mui/material";
import moment from "moment";
import { TelurDikerami } from "@/types";

export function DikeramiView({
  DATAIN,
}: {
  DATAIN: TelurDikerami | null | undefined|any;
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
        {DATAIN?.menetas && (
          <div>
            <Typography variant="subtitle1" className="font-bold mb-1">
              Tanggal Kemungkinan Menetas
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              {moment(DATAIN?.tanggalData).add(40, "d").format("dddd DD MMM YYYY")}
            </Typography>
          </div>
        )}
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jumlah Telur Diinkubasi
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DATAIN?.telurBaik} Ekor
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Penanggung Jawab
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {DATAIN?.user?.name || "Tidak Diketahui"}
          </Typography>
        </div>
      </div>
    </section>
  );
}