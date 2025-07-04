'use client'

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReportMonth } from '@/services/report';
import { queryKeys } from "@/services";
import { Grid } from "@mui/material";
import ErrorView from "@/components/another/error-tryAgain.component";
import { FormReportMonth } from "@/components/Form/report-month.form";
import { TIME } from '@/env/time.mjs';
import FloatingBottom from '@/components/another/add-bottom.component';
import CardComponent from "@/components/another/DataCard/Card.component";
import EmptyView from '@/components/another/empty-view.component';
import moment from 'moment';
// import {ReportBulanan } from '@/types'
import getNamaBulan from "@/utils/nama-bulan.utils";

export default function ReportMonth() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedReport, setSelectedReport] = useState<any | null>(null);
    const [isView, setIsView] = useState<boolean>(false);
    const [isDownload, setIsDownload] = useState<boolean>(false);

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: queryKeys.bulanan.all,
        queryFn: getReportMonth,
        staleTime: TIME.CACHE.LONG,
    });

    const onDownload = useCallback((report: any) => {
        setSelectedReport(report);
        setIsDialogOpen(true);
        setIsDownload(true);
    }, []);

    const onViewOpen = useCallback((report: any) => {
        setSelectedReport(report);
        setIsDialogOpen(true);
        setIsView(true);
    }, []);

    const handleAddNew = useCallback(() => {
        setIsDialogOpen(true);
        setSelectedReport(null);
        setIsView(false);
        setIsDownload(false);
    }, []);

    // Cek apakah data ada dan merupakan array
    const showEmptyState = !isFetching && (!data || !Array.isArray(data.data) || data.data.length === 0);
    const showGrid = !isFetching && data && Array.isArray(data.data) && data.data.length > 0;

    return (
        <>
            <div className={"p-4 md:p-8"}>
                {isError && <ErrorView />}
                
                {showEmptyState && (
                    <EmptyView
                        Title={`Tidak Ada Laporan Bulanan`}
                        CardDescription={"Anda Belum membuat laporan bulanan, silahkan tambahkan data atau langsung buat"}
                    />
                )}

                {showGrid && (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.isArray(data.data) && data.data.map((item: any) => (
                            <Grid item xs={4} sm={4} md={4} key={item.id}>
                                <CardComponent
                                    Track
                                    onView={() => onViewOpen(item)}
                                    onCustom={() => onDownload(item)}
                                    data={item}
                                    Massage={"Unduh Data"}
                                    item={{
                                        id: item.idDok,
                                        tanggal:item.TanggalUpdate?moment(item.TanggalUpdate).format("dddd, DD MMM YYYY"):
                                         moment(item.tanggalData).format("dddd, DD MMM YYYY"),
                                        jumlah: `Laporan ${getNamaBulan(item.Bulan)} ${item.Tahun}`,
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {!isDialogOpen && (
                    <FloatingBottom handleAddNew={handleAddNew} />
                )}
            </div>

            <FormReportMonth
                isOpen={isDialogOpen}
                isOpenView={isView}
                isDownload={isDownload}
                dataLaporan={selectedReport}
                onOpenChange={(value) => {
                    setIsDialogOpen(value);
                    if (!value) {
                        setSelectedReport(null);
                    }
                    if (isView || isDownload) {
                        setIsView(false);
                        setIsDownload(false);
                    }
                }}
            />
        </>
    );
}