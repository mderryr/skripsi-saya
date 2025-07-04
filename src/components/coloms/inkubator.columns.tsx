"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/another/DataTable/DataTableRowActions";
import DataTableAnother from "@/components/another/DataTable/DataTableRowActions.inkubator";
import { ArrowUpDown } from "lucide-react";
import { Inkubator } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import moment from "moment";

interface penyuInkubasiAction {
  onEditOpen?: (inkubator: Inkubator) => void;
  onDeleteOpen?: (inkubator: Inkubator) => void;
  onViewOpen: (inkubator: Inkubator) => void;
  onDeadOpen?: (inkubator: Inkubator) => void;
  onReleased?: (inkubator: Inkubator) => void;
}

export const columns = ({
  onEditOpen,
  onDeleteOpen,
  onViewOpen,
  onDeadOpen,
  onReleased,
}: penyuInkubasiAction): ColumnDef<Inkubator>[] =>
  onReleased && onDeadOpen
    ? [
        {
          accessorKey: "namaInkubator",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Tanggal Pengambilan Data
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            // console.log(row.getValue("tanggalData"))
            return (
              <div className="font-medium">{row.getValue("namaInkubator")}</div>
            );
          },
        },
        {
          accessorKey: "tukikHidup",
          header: "Tukik Hidup",
          cell: ({ row }) => {
            return (
              <div className="font-medium">
                {row.getValue("tukikHidup")!==0?row.getValue("tukikHidup") + " Tukik":"Tidak Ada"}
              </div>
            );
          },
        },
        {
          accessorKey: "tukikMati",
          header: "Tukik Mati",
          cell: ({ row }) => {
            return (
              <div className="font-medium">
                {row.getValue("tukikMati")!==0?row.getValue("tukikMati") + " Tukik":"Tidak Ada"}
              </div>
            );
          },
        },
        {
          accessorKey: "berfungsi",
          header: "Status",
          cell: ({ row }) => {
            const { berfungsi, tukikAda } = row.original;
            return (
              <div className="font-medium">
                <Badge
                  variant={
                    berfungsi ? "default" : tukikAda ? "default" : "destructive"
                  }
                >
                  {tukikAda
                    ? "Sedang Digunakan"
                    : berfungsi
                    ? "Kosong"
                    : "Tidak Berfungsi"}
                </Badge>
              </div>
            );
          },
        },
        {
          id: "actions",
          cell: ({ row }) => (
            <DataTableAnother
              row={row}
              onView={onViewOpen}
              onDead={onDeadOpen}
              onReleased={onReleased}
            />
          ),
        },
      ]
    : [
        {
          accessorKey: "namaInkubator",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Tanggal Pengambilan Data
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => {
            // console.log(row.getValue("tanggalData"))
            return (
              <div className="font-medium">{row.getValue("namaInkubator")}</div>
            );
          },
        },
        {
          accessorKey: "berfungsi",
          header: "Status",
          cell: ({ row }) => {
            const { berfungsi, tukikAda } = row.original;
            return (
              <div className="font-medium">
                <Badge
                  variant={
                    berfungsi ? "default" : tukikAda ? "default" : "destructive"
                  }
                >
                  {tukikAda
                    ? "Sedang Digunakan"
                    : berfungsi
                    ? "Kosong"
                    : "Tidak Berfungsi"}
                </Badge>
              </div>
            );
          },
        },
        {
          accessorKey: "keterangan",
          header: "Keterangan",
          cell: ({ row }) => {
            return (
              <div className="font-medium">
                {row.getValue("keterangan")
                  ? row.getValue("keterangan")
                  : "Tidak ada"}
              </div>
            );
          },
        },
        {
          id: "actions",
          cell: ({ row }) =>onEditOpen&&onDeleteOpen&& (
            <DataTableRowActions
              row={row}
              onView={onViewOpen}
              onEdit={onEditOpen}
              onDelete={onDeleteOpen}
            />
          ),
        },
      ];
