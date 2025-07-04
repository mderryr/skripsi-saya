"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/another/DataTable/DataTableRowActions.report";
import { ArrowUpDown } from "lucide-react";
import { ReportBulanan } from "@/types";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import { sizeDevice } from "@/env/size.mjs";
import NamaBulanChange from '@/utils/nama-bulan.utils'

interface ReportMonthInterface {
  onDownload : (data:ReportBulanan)=> void
  onViewOpen: (data: ReportBulanan) => void;
  Track?: boolean;
}

const clickCell = (
  data: ReportBulanan,
  setOpen: ReportMonthInterface["onViewOpen"]
) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  return isDesktop
    ? () => console.log("Click")
    : () => {
        setOpen(data);
      };
};
export const columns = ({
  onDownload,
  onViewOpen,
  Track = false,
}: ReportMonthInterface): ColumnDef<ReportBulanan>[] => [
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
      moment.locale();
      const data = row.original;

      return (
        <div onClick={clickCell(row.original, onViewOpen)}>
          <div className="font-medium">  {data.TanggalUpdate? moment(data.TanggalUpdate).format(
              "dddd, DD MMM YYYY"
            ) : moment(data.TanggalDibuat).format(
              "dddd, DD MMM YYYY"
            )}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
          {data.idDok}
          </div>
        </div>
      ); 
    },
  },
  {
    accessorKey: "Bulan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bulan 
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {

      return (
        <div onClick={clickCell(row.original, onViewOpen)}>
          <div className="font-medium"> {NamaBulanChange(row.getValue("Bulan"))} </div>
        </div>
      ); 
    },
  },  {
    accessorKey: "Tahun",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tahun
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div onClick={clickCell(row.original, onViewOpen)}>
          <div className="font-medium">
            {row.getValue("Tahun")}
        </div>
        </div>
      ); 
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions 
      row={row} 
      onDownload={onDownload } 
      onView={onViewOpen}      
      />
    ),
  },
];
