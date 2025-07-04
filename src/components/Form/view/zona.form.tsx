'use client'
import { Typography } from "@mui/material";
import { Zona } from "@/types";

interface ZonaViewProps {
  DataZona: Zona | null | undefined;
}

export function ZonaView({ DataZona }: ZonaViewProps) {
  if (!DataZona) return null;

  return (
    <div className="space-y-4">
      <div>
        <Typography variant="subtitle1" className="font-bold mb-1">
          Nama
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          {DataZona.nama || "Tidak Tersedia"}
        </Typography>
      </div>
      
      <div>
        <Typography variant="subtitle1" className="font-bold mb-1">
          Keterangan
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          {DataZona.keterangan || "Tidak ada keterangan"}
        </Typography>
      </div>
    </div>
  );
}