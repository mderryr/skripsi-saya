"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from '@/components/another/DataTable/DataTableRowActions';
import {  ArrowUpDown } from "lucide-react";
import { TukikMati } from "@/types";
import { Button } from "@/components/ui/button";
import moment from "moment";

interface penyuMatiAction {
  onEditOpen: (penyuMati: TukikMati) => void;
  onDeleteOpen: (penyuMati: TukikMati) => void;
  onViewOpen: (penyuMati: TukikMati) => void;
  // onCreate: (telurDikerami: TelurDikerami) => void;
}

export const columns=({ onEditOpen, onDeleteOpen,onViewOpen }: penyuMatiAction): ColumnDef<TukikMati>[] => [
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
        <>
          <div className="font-medium">{date}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {data.idDok}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "penyuMati",
    header: "Jumlah Penyu Mati",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("penyuMati") + " Tukik"}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) =>  <DataTableRowActions row={row} onView={onViewOpen} onEdit={onEditOpen} onDelete={onDeleteOpen} />,
  },
];
