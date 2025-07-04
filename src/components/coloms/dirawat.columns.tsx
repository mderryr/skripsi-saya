"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/another/DataTable/DataTableRowActions";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Inkubasi, Inkubator } from "@/types";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import { sizeDevice } from "@/env/size.mjs";

interface penyuInkubasiAction {
  onEditOpen: (telurDikerami: Inkubasi) => void;
  onDeleteOpen: (telurDikerami: Inkubasi) => void;
  onViewOpen: (telurDikerami: Inkubasi) => void;
  // onCreate: (telurDikerami: TelurDikerami) => void;
}
const clickCell = (data:Inkubasi,setOpen: penyuInkubasiAction["onViewOpen"]) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  return isDesktop
    ? () => console.log("Click")
    : () => {
        setOpen(data)
      };
};
export const columns = ({
  onEditOpen,
  onDeleteOpen,
  onViewOpen,
}: penyuInkubasiAction): ColumnDef<Inkubasi>[] => [
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
      const data = row.original;
      const date = moment(data.tanggalData).format("dddd, DD MMM YYYY");
      // console.log(row.getValue("tanggalData"));
      return (
        <div  onClick={clickCell(row.original,onViewOpen)}>
          <div className="font-medium">{date}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {data.idDok}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "JumlahTukik",
    header: "Jumlah Tukik",
    cell: ({ row }) => (
      <div className="font-medium"  onClick={clickCell(row.original,onViewOpen)}>
        {row.getValue("JumlahTukik") + " Tukik"}
      </div>
    ),
  },
  {
    accessorKey: "Inkubator",
    header: "Nama Inkubator",
    cell: ({ row }) => {
      const { inkubator }: { inkubator: Inkubator } =
        row.original as unknown as { inkubator: Inkubator };
      return (
        <div  onClick={clickCell(row.original,onViewOpen)}>
          <div className="font-medium">{inkubator.namaInkubator}</div>
          <div className="font-medium">
            <Badge
              variant={
                inkubator.berfungsi
                  ? "default"
                  : inkubator.tukikAda
                  ? "default"
                  : "destructive"
              }
            >
              {inkubator.tukikAda
                ? "Sedang Digunakan"
                : inkubator.berfungsi
                ? "Kosong"
                : "Tidak Berfungsi"}
            </Badge>
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
        onView={onViewOpen}
        onEdit={onEditOpen}
        onDelete={onDeleteOpen}
      />
    ),
  },
];
