"use client";
import { Label } from "@/components/ui/label";
import moment from "moment";
import { TukikMati, Inkubator, JenisPenyu} from "@/types";
import { Typography } from "@mui/material";

export function matiView({
  dataPenyu,
}: {
  dataPenyu: TukikMati & {
    Inkubasi: Inkubator;
    user: {
      name: string;
    };
    penyu?:JenisPenyu
  };
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
            Jumlah Telur Menetas
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.penyuMati 
              ? `${dataPenyu.penyuMati} Tukik` 
              : "Tidak ada Tukik"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Jenis Penyu
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.penyu?.nama 
              ? `${dataPenyu.penyu?.nama }` 
              : " - "}
          </Typography>
        </div>


        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Nama Inkubator
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.Inkubasi?.namaInkubator || "Nama Inkubator"}
          </Typography>
        </div>



        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Penanggung Jawab
          </Typography>
          <Typography variant="body1" className="text-gray-700">
          {dataPenyu?.user?.name || "Tidak Diketahui"}
          </Typography>
        </div>
      </div>
    </section>
  );
}