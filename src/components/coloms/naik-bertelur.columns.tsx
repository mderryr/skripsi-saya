"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/another/DataTable/DataTableRowActions";
import TrackDataTableRowActions from '@/components/another/DataTable/DataTableRowActions.track'
import {  ArrowUpDown } from "lucide-react";
import { PenyuNaik } from "@/types";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import { sizeDevice } from "@/env/size.mjs";

interface ActionColoms {
  onEditOpen: (telurDikerami: PenyuNaik) => void;
  onDeleteOpen: (telurDikerami: PenyuNaik) => void;
  onViewOpen: (telurDikerami: PenyuNaik) => void;
  Track?:boolean;
}
const clickCell = (data: PenyuNaik, setOpen: ActionColoms["onViewOpen"]) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  return isDesktop
    ? () => console.log("Click")
    : () => {
        setOpen(data);
      };
};

export const columns = ({
  onEditOpen,
  onDeleteOpen,
  onViewOpen,
  Track=false,
}: ActionColoms): ColumnDef<PenyuNaik>[] => [
  {
    accessorKey: "tanggalData",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Pengambilan Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      moment.locale()
      const data = row.original;
      const date = moment(data.tanggalData).format("dddd, DD MMM YYYY");
      // console.log(row.getValue("tanggalData"))
      return (
        <div onClick={clickCell(row.original, onViewOpen)}>
          <div className="font-medium max-md:text-xs">{date}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {data.idDok}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "jumlahPenyu",
    header: "Jumlah Penyu Naik",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div onClick={clickCell(row.original, onViewOpen)}>
          <div className="font-medium max-md:text-xs">
            {data.jumlahPenyu + " Penyu"}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline max-md:text-xs">
            {data.penyuBertelur ? "Penyu Bertelur" : "Tidak Ada Telur"}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dikerami",
    header: "Kondisi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div
          className="font-medium max-md:text-xs"
          onClick={clickCell(row.original, onViewOpen)}
        >
          {data.dikerami
            ? "Sudah Diinkubasi"
            : data.penyuBertelur
              ? "Belum Diinkubasi"
              : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <>
      {Track?<TrackDataTableRowActions 
        row={row}
        onView={onViewOpen}
        onEdit={onEditOpen}
        detail="Diinkubasi"
        />:
        <DataTableRowActions
        row={row}
        onView={onViewOpen}
        onEdit={onEditOpen}
        onDelete={onDeleteOpen} />
        }
        </>
    ),
  },
];
