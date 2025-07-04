"use client";

import { useState, useMemo, useCallback,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getzona } from "@/services/zona";
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/zona.columns";
import ZonaForm from "@/components/Form/zona.form";
// import { getzona } from "@/services/zona";
import { TIME } from '@/env/time.mjs'

export default function Zona() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPenyu, setSelectedPenyu] = useState(null);
  const [isView, setIsView] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey:queryKeys.zona.all,
    queryFn:()=>getzona(),
    gcTime : TIME.CACHE.LONG,
  });

  const onEditOpen = useCallback((data: any) => {
    setSelectedPenyu(data);
    setIsDialogOpen(true);
  }, []);

  const onDeleteOpen = useCallback((data: any) => {
    setSelectedPenyu(data);
    setIsDialogOpen(true);
    setIsDeleted(true);
  }, []);

  const onViewOpen = useCallback((data: any) => {
    setSelectedPenyu(data);
    setIsDialogOpen(true);
    setIsView(true);
  }, []);

  const columns = useMemo(
    () =>
      Coloms({
        onEditOpen,
        onDeleteOpen,
        onViewOpen,
      }),
    [onEditOpen, onDeleteOpen, onViewOpen]
  );

  if (isLoading) <TableLoading />;
  if (error) <ErrorView />;
  return (
    <>
      <Card>
        <CardContent>
          <Suspense fallback={<TableLoading />} >
          {isFetching && <TableLoading />}
          {!isFetching && (
            <DataTable
              setOpen={() => setIsDialogOpen(!isDialogOpen)}
              data={data?.data as any}
              columns={columns}
              fillter
              tittle={"Zona Penyu naik"}
            //   dateSearch
            />
          )}
          </Suspense>
        </CardContent>
      </Card>

      {/* Disini form nya */}
      <ZonaForm
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDelete={isDeleted}
        onOpenChange={(value) => {
          setIsDialogOpen(value);
          if (!value) {
            setSelectedPenyu(null);
          }
          if (isView || isDeleted) {
            setIsView(false);
            setIsDeleted(false);
          }
        }}
        dataZona={selectedPenyu}
      />
    </>
  );
}
