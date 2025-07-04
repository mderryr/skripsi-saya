
"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from '@/components/another/DataTable/DataTableRowActions';
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import {sizeDevice} from '@/env/size.mjs'
import { useMediaQuery } from "@/utils/mediaquery-hook";

interface UserColumns {
  onEditOpen: (data: User) => void;
  onDeleteOpen: (data: User) => void;
  onViewOpen: (data: User) => void;
  // onCreate: (telurDikerami: TelurDikerami) => void;
}

const clickCell = (data:any,setOpen: UserColumns["onViewOpen"]) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  return isDesktop
    ? () => console.log("Click")
    : () => {
        setOpen(data)
      };
};

export const columns=({ onEditOpen, onDeleteOpen,onViewOpen }: UserColumns): ColumnDef<User>[] => [

  {
    accessorKey: "idUser",
    header: "ID User",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("idUser")}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      return (
        <div className="font-medium"  onClick={clickCell(row.original,onViewOpen)}>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "nomerTelp",
    header: "Nomer Telephone",
    cell: ({ row }) => {
      return (
        <div className="font-medium" onClick={clickCell(row.original,onViewOpen)}>
          {row.getValue("nomerTelp")}
        </div>
      );
    },
  },
  {
    accessorKey: "admin",
    header: "Hak Membuat Team",
    cell: ({ row }) => {
      return (
        <div className="font-medium" onClick={clickCell(row.original,onViewOpen)}>
          {row.getValue("admin")?"Akses":"Tidak Ada Akses"}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) =>  <DataTableRowActions row={row} onView={onViewOpen} onEdit={onEditOpen} onDelete={onDeleteOpen} />,
  },
];

