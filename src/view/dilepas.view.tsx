"use client";

import { useState, useMemo, useCallback,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTelurDikerami } from "@/services/dikerami";
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/dilepas.columns";
import { Pelepasan } from "@/types";
import PenyuDilepasForm from "@/components/Form/penyu-dilepas.form";
import { getTukikPelepasan } from "@/services/dilepas";
import { TIME } from '@/env/time.mjs'

export default function TukikMatiView({Track=false}:{Track?:boolean}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [Selected, setSelected] = useState<Pelepasan|null>();
  const [isView, setIsView] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.dilepas.all,
    queryFn: () => getTukikPelepasan(),
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
    () => Coloms({ onEditOpen, onDeleteOpen, onViewOpen }),
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
      <PenyuDilepasForm 
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDelete={isDeleted}
        dataPelepasan={Selected as any}
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
      />

    </>
  );
}
