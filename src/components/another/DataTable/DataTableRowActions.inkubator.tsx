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
  onReleased: (value: TData) => void;
  onDead: (value: TData) => void;
  onView: (value: TData) => void;
}

const DataTableRowActions = <TData,>({
  row,
  onDead,
  onReleased,
  onView,
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
            <DropdownMenuItem onClick={() => onDead(row.original)}>
              Tukik Mati
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onReleased(row.original)}>
              Tukik Dilepas
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button
            className="text-xs"
            variant="outline"
            onClick={() => {
              onDead(row.original);
            }}
          >
            Tukik Mati
          </Button>
          <Button
            className="text-xs"
            variant="outline"
            onClick={() => {
              onReleased(row.original);
            }}
          >
            Tukik Dilepas
          </Button>
        </>
      )}
    </>
  );
};

export default DataTableRowActions;
