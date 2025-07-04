"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from '@/components/another/DataTable/DataTableRowActions';
import TrackDataTableRowActions from '@/components/another/DataTable/DataTableRowActions.track'
import {  ArrowUpDown } from "lucide-react";
import { TelurMenetas } from "@/types";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import {sizeDevice} from '@/env/size.mjs'

interface ActionColoms {
  onEditOpen: (dataTukikMenetas: TelurMenetas) => void;
  onDeleteOpen: (dataTukikMenetas: TelurMenetas) => void;
  onViewOpen: (dataTukikMenetas: TelurMenetas) => void;
Track? :boolean
}

const clickCell = (data:TelurMenetas,setOpen: ActionColoms["onViewOpen"]) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  return isDesktop
    ? () => console.log("Click")
    : () => {
        setOpen(data)
      };
};

export const columns=({ onEditOpen, onDeleteOpen,onViewOpen,Track=false }: ActionColoms): ColumnDef<TelurMenetas>[] => [
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
     
      const data = row.original
      const date = moment(data.tanggalData).format(
        "dddd, DD MMM YYYY"
      );
      // console.log(row.getValue("tanggalData"))
      return (
        <div onClick={clickCell(row.original,onViewOpen)}>
          <div className="font-medium">{date}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {data.idDok}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "telurMenetas",
    header: "Tukik Menetas",
    cell: ({ row }) => {
      return (
        <div className="font-medium" onClick={clickCell(row.original,onViewOpen)}>
          {row.getValue("telurMenetas") + " Telur"}
        </div>
      );
    },
  },
  {
    accessorKey: "telurRusak",
    header: "Telur TIdak Menetas",
    cell: ({ row }) => {
      return (
        <div className="font-medium" onClick={clickCell(row.original,onViewOpen)}>
          {row.getValue("telurRusak") === 0
            ? "Tidak Ada"
            : row.getValue("telurRusak") + " Telur"}
        </div>
      );
    },
  },
  {
    accessorKey: "diinkubasi",
    header: "Kondisi",
    cell: ({ row }) =>  (
        <div className="font-medium" onClick={clickCell(row.original,onViewOpen)}>
          {row.getValue("diinkubasi")?"Sedang Dirawat":"-"}
        </div>
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <>
      {Track?<TrackDataTableRowActions 
        row={row}
        onView={onViewOpen}
        onEdit={onEditOpen}
        detail="Dirawat"
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
