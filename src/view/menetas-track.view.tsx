"use client";

import { useState, useMemo, useCallback,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTelurMenetas } from "@/services/menetas";
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/menetas.columns";
import { TelurMenetas as Menetas } from "@/types";
import PenyuMenetasForm from "@/components/Form/penyu-menetas.form"
import { TIME } from '@/env/time.mjs'

export default function TelurMenetas({Track=false}:{Track?:boolean}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [Selected, setSelected] = useState<Menetas | null>();
  const [isView, setIsView] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.menetas.all,
    queryFn: () => getTelurMenetas(Track),
    gcTime : TIME.CACHE.LONG,

  });

  const onDeleteOpen = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    setIsDialogOpen(true);
    setIsDeleted(!isDeleted);
  }, []);

  const onEditOpen = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    setIsDialogOpen(true);
  }, []);
  const onViewOpen = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    setIsDialogOpen(true);
    setIsView(!isView);
  }, []);

  const columns = useMemo(
    () => Coloms({ onEditOpen, onDeleteOpen, onViewOpen,Track:Track }),
    [onEditOpen, onDeleteOpen, onViewOpen]
  );

  if (isLoading) <TableLoading />;
  if (isError) <ErrorView />;
  return (
    <>
      <Card>
        <CardContent>
        <Suspense fallback={<TableLoading />} >
        {isFetching && <TableLoading />}
          {!isFetching&&!Track ? (
            <DataTable
              setOpen={() => setIsDialogOpen(!isDialogOpen)}
              data={data?.data  as any}
              columns={columns}
              fillter
              dateSearch
            />
          ):<DataTable
          // setOpen={() => setIsDialogOpen(!isDialogOpen)}
          data={data?.data  as any}
          columns={columns}
        />}
          </Suspense>

        </CardContent>
      </Card>
      {/* Disini form nya */}
          <PenyuMenetasForm 
           isOpen={isDialogOpen}
           isOpenView={isView}
           isDeleted={isDeleted}
           onOpenChange={(value) => {
             setIsDialogOpen(value);
             if (!value) {
               setSelected(null);
             }
             if (isView || isDeleted) {
               setIsView(false);
               setIsDeleted(false);
             }
           }}
           dataTelurMenetas={Selected as any}
           Track={Track}
          />

    </>
  );
}
