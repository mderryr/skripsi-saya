"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/another/DataTable/DataTableRowActions";
import { ArrowUpDown } from "lucide-react";
import TrackDataTableRowActions from "@/components/another/DataTable/DataTableRowActions.track";
import { TelurDikerami } from "@/types";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import { sizeDevice } from "@/env/size.mjs";

interface penyuInkubasiAction {
  onEditOpen: (telurDikerami: TelurDikerami) => void;
  onDeleteOpen: (telurDikerami: TelurDikerami) => void;
  onViewOpen: (telurDikerami: TelurDikerami) => void;
  Track?: boolean;
}

const clickCell = (
  data: TelurDikerami,
  setOpen: penyuInkubasiAction["onViewOpen"]
) => {
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
  Track = false,
}: penyuInkubasiAction): ColumnDef<TelurDikerami>[] => [
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
      const date = moment(data.tanggalData).format("dddd, DD MMM YYYY");

      return (
        <div onClick={clickCell(row.original, onViewOpen)}>
          <div className="font-medium">{date}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {data.idDok}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "telurBaik",
    header: "Telur yang Baik",
    cell: ({ row }) => {
      return (
        <div
          className="font-medium"
          onClick={clickCell(row.original, onViewOpen)}
        >
          {row.getValue("telurBaik") + " Telur"}
        </div>
      );
    },
  },
  {
    accessorKey: "tanggalData",
    header: "Kemungkinan",
    cell: ({ row }) => {
      moment.locale("id");
      const tanggal = moment(row.original.tanggalData)
        .add(40, "d")
        .format("dddd, DD MMM YYYY");
      return (
        <div
          className="font-medium"
          onClick={clickCell(row.original, onViewOpen)}
        >
          {tanggal}
        </div>
      );
    },
  },
  {
    accessorKey: "menetas",
    header: "Kondisi",
    cell: ({ row }) => (
      <div
        className="font-medium"
        onClick={clickCell(row.original, onViewOpen)}
      >
        {row.getValue("menetas") ? "Sudah Menetas" : "Belum Menetas"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <>
        {Track ? (
          <TrackDataTableRowActions
            row={row}
            onView={onViewOpen}
            onEdit={onEditOpen}
            detail="Menetas"
          />
        ) : (
          <DataTableRowActions
            row={row}
            onView={onViewOpen}
            onEdit={onEditOpen}
            onDelete={onDeleteOpen}
          />
        )}
      </>
    ),
  },
];
