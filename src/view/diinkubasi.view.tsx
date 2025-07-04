"use client";

import { useState, useMemo, useCallback,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInkubasi } from "@/services/diinkubasi";
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/dirawat.columns";
import PenyuDirawatForm from "@/components/Form/penyu-dirawat.form";
// import { getzona } from "@/services/zona";
import { TIME } from '@/env/time.mjs'

export default function PenyuDirawat() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPenyu, setSelectedPenyu] = useState(null);
  const [isView, setIsView] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: queryKeys.inkubasi.all,
    queryFn: () => getInkubasi(),
    gcTime : TIME.CACHE.LONG,
  });

  const onEditOpen = useCallback((dataPenyu: any) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
  }, []);

  const onDeleteOpen = useCallback((dataPenyu: any) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
    setIsDeleted(true);
  }, []);

  const onViewOpen = useCallback((dataPenyu: any) => {
    setSelectedPenyu(dataPenyu);
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
              dateSearch
            />
          )}
          </Suspense>
        </CardContent>
      </Card>

      {/* Disini form nya */}
      <PenyuDirawatForm
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDeleted={isDeleted}
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
        Dirawat={selectedPenyu}
      />
    </>
  );
}
