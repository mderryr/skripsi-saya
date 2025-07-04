"use client";

import { useState, useMemo, useCallback,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInkubator } from "@/services/inkubator";
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/inkubator.columns";
import { TelurDikerami } from "@/types";
import PenyuMatiDirawatForm from "@/components/Form/penyu-dirawat-mati.form";
import InkubatorForm from "@/components/Form/inkubator.form";
import PelepasanForm from "@/components/Form/penyu-dilepas.form";
import { TIME } from '@/env/time.mjs'

export default function Inkubator() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [Selected, setSelected] = useState<TelurDikerami | null>();
  const [isView, setIsView] = useState<boolean>(false);
  const [released, serReleased] = useState<boolean>(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.inkubatorTrack.all,
    queryFn: () => getInkubator(true),
    gcTime : TIME.CACHE.LONG,

  });

  const onReleased = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    // setIsDialogOpen(true);
    serReleased(!released);
  }, []);

  const onDeadOpen = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    setIsDialogOpen(true);
  }, []);
  const onViewOpen = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    // setIsDialogOpen(true);
    setIsView(!isView);
  }, []);

  const columns = useMemo(
    () =>
      Coloms({
        onReleased: onReleased,
        onDeadOpen: onDeadOpen,
        onViewOpen: onViewOpen,
      }),
    [onDeadOpen, onReleased, onViewOpen]
  );

  if (isLoading) <TableLoading />;
  if (isError) <ErrorView />;
  return (
    <>
      <Card>
        <CardContent>
        <Suspense fallback={<TableLoading />} >

          {isFetching && <TableLoading />}
          {!isFetching && (
            <DataTable
              // setOpen={() => setIsDialogOpen(!isDialogOpen)}
              data={data?.data as any}
              columns={columns}
            />
          )}
          </Suspense>

        </CardContent>
      </Card>
      {/* Disini form nya */}
      <PenyuMatiDirawatForm
        isOpen={isDialogOpen}
        onOpenChange={(value) => {
          setIsDialogOpen(false);
          if (!value) {
            setSelected(null);
          }
        }}
        dataInkubator={Selected as any}
      />
      <InkubatorForm
        isOpen={isView}
        isOpenView={isView}
        onOpenChange={(value) => {
          setIsView(value);
          if (!value) {
            setSelected(null);
          }
        }}
        dataInkubator={Selected as any}
      />

      <PelepasanForm
        isOpen={released}
        dataPelepasan={Selected as any}
        onOpenChange={(value) => {
          serReleased(false);
          if (!value) {
            setSelected(null);
          }
        }}
        Track
      />
    </>
  );
}
