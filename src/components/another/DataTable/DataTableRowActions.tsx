import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import { sizeDevice } from "@/env/size.mjs";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
  onDelete: (value: TData) => void;
  onView: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onView,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) => {
    const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
    if(!isDesktop){
      return(
        <div className="flex flex-col">
          <Button
          size="sm"
          className="mb-1"
          onClick={() => onEdit(row.original)}
          variant="outline"
          >
           Edit
          </Button>
          <Button
          size="sm"
          onClick={() => onDelete(row.original)}
          variant="destructive"
          >
           Hapus
          </Button>
        </div>
      )
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onView(row.original)}>
          Lihat Data
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(row.original)}>
          Rubah
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" text-red"
          onClick={() => onDelete(row.original)}
        >
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
