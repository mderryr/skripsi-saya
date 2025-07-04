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
  onView: (value: TData) => void;
  detail: string
}

const DataTableRowActions = <TData,>({
  row,
  onView,
  onEdit,
  detail,
}: DataTableRowActionsProps<TData>) => {
  const isDesktop = useMediaQuery(sizeDevice.Mobile.minQuery);
  return (
    <>
      {isDesktop ? (
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
            {detail}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          className="text-xs"
          variant="outline"
          onClick={() => {
            onEdit(row.original);
          }}
        >
          {detail}
        </Button>
      )}
    </>
  );
};

export default DataTableRowActions;
