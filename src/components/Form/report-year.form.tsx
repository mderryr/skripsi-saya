'use client'

import PopUpCustomForm from "@/components/another/custom-popup.component";
// import { ReportBulanan } from "@/types";
import { ReportTahunanView } from "./view";
import { InputReportYears } from "./input";
import { DownloadReportBulanan as DownloadReportTahunan } from './download'
// import { textDetail } from "@/env/description.mjs";
// import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { ReportTahunan } from "@/types";

interface PenyuNaikFormProps {
    isOpen: boolean;
    isOpenView?: boolean;
    isDownload?: boolean;
    onOpenChange: (value: boolean) => void;
    dataLaporan?: ReportTahunan|undefined;
    showTrackButton?: boolean;
}

export const FormReportYear: React.FC<PenyuNaikFormProps> = ({
    isOpen,
    onOpenChange,
    isDownload = false,
    dataLaporan=undefined,
    isOpenView = false,
    showTrackButton = false,
}) => {
    const [showDikerami, setShowDikerami] = useState(false);
    const handleOpenChange = (value: boolean) => {
        if (!value) {
            setShowDikerami(false);
        }
        onOpenChange(value);
    };

    const getTittle = () => {
        if (isOpenView && dataLaporan) return "Lihat Laporan Tahunan";
        if (isDownload) return "Download Laporan Tahunan";
        return "Proses Laporan Tahunan";
    }

    const getDescription = () => {
        if (isOpenView && dataLaporan) return "Berikut detail laporan tahunan yang sudah dibuat";
        if (isDownload) return "Apakah anda yakin ingin mendownload nya";
        return "Proses laporan tahunan";
    }

    const renderContent = () => {
        if (isOpenView && dataLaporan) {
            return (
                <>
                    <ReportTahunanView dataReport={dataLaporan} />
                </>
            );
        }

        if (isDownload && dataLaporan) {
            return (
                <>
                    <DownloadReportTahunan
                        idDok={dataLaporan.idDok}
                        onOpenChange={onOpenChange}
                    />
                    {/* <ReportMonthView dataReport={dataLaporan} /> */}
                </>
            )
        }
        return (
            <InputReportYears
                onOpenChange={onOpenChange}
            />

        )
    }

    return (
        <PopUpCustomForm
            open={isOpen}
            setOpen={handleOpenChange}
            tittle={getTittle()}
            Descripton={getDescription()}
        >
            {renderContent()}

        </PopUpCustomForm>
    )
}

export default FormReportYear