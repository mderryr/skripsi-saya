import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/utils/mediaquery-hook";
import { sizeDevice } from "@/env/size.mjs";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onDownload: (value: TData) => void;
  onView: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onView,
  onDownload,
}: DataTableRowActionsProps<TData>) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  if (!isDesktop) {
    return (
      <div className="flex flex-col">
        <Button
          size="sm"
          onClick={() => onDownload(row.original)}
          variant="outline"
        >
          Unduh Data
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
        <DropdownMenuItem
          className=" text-red"
          onClick={() => onDownload(row.original)}
        >
          Unduh Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
