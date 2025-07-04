'use client';
import { Inkubator } from "@/types";
import { Typography } from '@mui/material';
import { Badge } from "@/components/ui/badge";

export function InkubatorView({ dataPenyu }: { dataPenyu: Inkubator | null | undefined }) {
  return (
    <section className="container p-4">
      <div className="space-y-4">
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Nama Inkubator
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.namaInkubator || "ID Dokumen"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Status
          </Typography>
          <Badge
            className="py-2"
            variant={
              dataPenyu?.berfungsi
                ? "default"
                : dataPenyu?.tukikAda
                ? "default"
                : "destructive"
            }
          >
            {dataPenyu?.tukikAda
              ? "Sedang Digunakan"
              : dataPenyu?.berfungsi
              ? "Kosong"
              : "Tidak Berfungsi"}
          </Badge>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tukik Hidup
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.tukikHidup
              ? `${dataPenyu.tukikHidup} Tukik`
              : "Tidak ada Tukik"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Tukik Mati
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.tukikMati
              ? `${dataPenyu.tukikMati} Tukik`
              : "Tidak ada Tukik"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Keterangan
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {dataPenyu?.keterangan || "Keterangan"}
          </Typography>
        </div>
      </div>
    </section>
  );
}