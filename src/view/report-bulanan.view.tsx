"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReportMonth } from '@/services/report'
import { queryKeys } from "@/services";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { columns as Coloms } from "@/components/coloms/report-month.columns";
import { FormReportMonth } from "@/components/Form/report-month.form";
import { TIME } from '@/env/time.mjs'

export default function LaporanBlanan() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [Selected, setSelected] = useState<any | null>();
  const [isView, setIsView] = useState<boolean>(false);
  const [isDownload, setIsDownload] = useState<boolean>(false);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: queryKeys.bulanan.all,
    queryFn: () => getReportMonth(),
    gcTime : TIME.CACHE.LONG,
  });

  const onDownload = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    setIsDialogOpen(true);
    setIsDownload(!isDownload);
  }, []);

  const onViewOpen = useCallback((dataPenyu: any) => {
    setSelected(dataPenyu);
    setIsDialogOpen(true);
    setIsView(!isView);
  }, []);

  const columns = useMemo(
    () => Coloms({ onViewOpen, onDownload }),
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
            {!isFetching && (
              <DataTable
                setOpen={() => setIsDialogOpen(!isDialogOpen)}
                data={data?.data as any}
                columns={columns}
                fillter
              // dateSearch
              />
            )}
          </Suspense>

        </CardContent>
      </Card>
      {/* Disini form nya */}
      <FormReportMonth
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
