"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPenyuNaik } from "@/services/naik";
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/naik-bertelur.columns";
import { PenyuNaik as Naik } from "@/types";
import PenyuNaikForm from "@/components/Form/penyu-naik.form";
// import { getzona } from "@/services/zona";
// import {getSession} from '@/services/login/auth'
import { TIME } from '@/env/time.mjs'

export default function PenyuNaik({ Track = false }: { Track?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPenyu, setSelectedPenyu] = useState<Naik | null>(null);
  const [isView, setIsView] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: queryKeys.naik.all,
    queryFn: () => getPenyuNaik(Track),
    gcTime: TIME.CACHE.LONG,

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
        Track: Track,
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
                fillter={!Track}
                dateSearch={!Track}
              />
            )}
          </Suspense>
        </CardContent>
      </Card>

      {/* Disini form nya */}
      <PenyuNaikForm
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDelete={isDeleted}
        onOpenChange={(value) => {
          console.log("onOpenChange called with:", value);
          if (value !== isDialogOpen) {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedPenyu(null);
            }
            if (isView || isDeleted) {
              setIsView(false);
              setIsDeleted(false);
            }
          }
        }}
        dataPenyuNaik={selectedPenyu}
        Track={Track}
      />
    </>
  );
}
