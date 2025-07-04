"use client";

import { useState, useMemo, useCallback,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import {getReportByYear} from '@/services/report'
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/report-year.columns";
import { FormReportYear } from "@/components/Form/report-year.form";
import { TIME } from '@/env/time.mjs'

export default function TelurMenetas() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [Selected, setSelected] = useState<any | null>();
  const [isView, setIsView] = useState<boolean>(false);
  const [isDownload, setIsDownload] = useState<boolean>(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.tahunan.all,
    queryFn: () => getReportByYear(),
    gcTime : TIME.CACHE.LONG,
    
  });

  const onDownload = useCallback((dataIn: any) => {
    setSelected(dataIn);
    setIsDialogOpen(true);
    setIsDownload(!isDownload);
  }, []);

  const onViewOpen = useCallback((dataIn: any) => {
    setSelected(dataIn);
    setIsDialogOpen(true);
    setIsView(!isView);
  }, []);

  const columns = useMemo(
    () => Coloms({ onViewOpen,onDownload }),
    [onDownload, onViewOpen]
  );

  if (isLoading) <TableLoading />;
  if (isError) <ErrorView />;
  return (
    <>
      <Card>
        <CardContent>
        <Suspense fallback={<TableLoading />} >
        {isFetching && <TableLoading />}
          {!isFetching&& (
            <DataTable
              setOpen={() => setIsDialogOpen(!isDialogOpen)}
              data={data?.data  as any}
              columns={columns}
              fillter
              // dateSearch
            />
          )}
          </Suspense>

        </CardContent>
      </Card>
      {/* Disini form nya */}
      <FormReportYear
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDownload={isDownload}
        dataLaporan={Selected}
        onOpenChange={
          (value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelected(null);
            }
            if (isView || isDownload) {
              setIsView(false);
              setIsDownload(false);
            }
          }
        }
      />

    </>
  );
}
