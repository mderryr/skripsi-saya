"use client";
import { useState, Suspense } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "@/components/another/datepicker";
import { Button } from "@/components/ui/button";
import EmptyView from "@/components/another/empty-view.component";
import moment from "moment";
import Loading from "@/components/another/skeleton-loading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setOpen?: () => void;
  fillter?: boolean;
  dateSearch?: boolean;
  tittle?: string;
}

export  function DataTable<TData, TValue>({
  columns,
  data,
  setOpen,
  fillter = false,
  dateSearch = false,
  tittle = "Data sekarang",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [initialData, setInitialData] = useState<TData[]>(data);
  const [filteredData, setFilteredData] = useState<TData[]>(data);

  const handleDateChange = (date: Date) => {
    console.log("Selected date:", date);
    const filteredData = initialData.filter((item: any) => {
      const itemDate = moment(item.tanggalData);
      const selectedDate = moment(date);
      return (
        itemDate.isSame(selectedDate, "month") &&
        itemDate.isSame(selectedDate, "year")
      );
    });
    console.log("Filtered data:", filteredData);
    setFilteredData(filteredData);
    setMonth(date.getMonth()); // Update month state
    setYear(date.getFullYear()); // Update year state
  };

  const handleResetData = () => {
    setFilteredData(initialData);
  };

  const table = useReactTable<TData>({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap mt-[2%]">
        {dateSearch ? (
          <div className="flex items-center max-md:py-4 py-1">
            <Suspense fallback={<Loading />}>
              <DatePicker
                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
                onChange={handleDateChange}
              />
            </Suspense>
            <Button
              onClick={() => handleResetData()}
              variant="outline"
              className="mx-2"
            >
              Reset Data
            </Button>
          </div>
        ) : (
          <h1 className="font-bold">{tittle}</h1>
        )}
        <div className="flex items-center max-md:py-4 py-1 ">
          {setOpen && (
            <Button className="mx-2" size="default" onClick={setOpen}>
              Tambah Data
            </Button>
          )}
          {fillter && (
            // Move the DropdownMenu outside the Table
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="filter-button">
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {table
                    .getAllColumns()
                    .filter((column) => {
                      return column.getCanHide();
                    })
                    .map((column) => {
                      // console.log(column)
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border mt-[2%]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="text-xs max-lg:hover:bg-black/5"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="text-xs max-lg:hover:bg-black/5"
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <EmptyView />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
