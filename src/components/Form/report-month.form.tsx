'use client'

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { ReportBulanan } from "@/types";
import { ReportMonthView } from "./view";
import { InputReportMonth } from "./input";
import { textDetail } from "@/env/description.mjs";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { DownloadReportBulanan } from './download'

interface PenyuNaikFormProps {
    isOpen: boolean;
    isOpenView?: boolean;
    isDownload?: boolean;
    onOpenChange: (value: boolean) => void;
    dataLaporan?: ReportBulanan;
    showTrackButton?: boolean;
}

export const FormReportMonth: React.FC<PenyuNaikFormProps> = ({
    isOpen,
    onOpenChange,
    isDownload = false,
    dataLaporan,
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
        if (isOpenView && dataLaporan) return "Lihat Laporan Bulanan";
        if (isDownload) return "Download Laporan Bulanan";
        return "Proses Laporan Bulanan";
    }

    const getDescription = () => {
        if (isOpenView && dataLaporan) return "Berikut detail laporan bulanan yang sudah dibuat";
        if (isDownload) return "Apakah anda yakin ingin mendownload nya";
        return "Proses laporan bulanan";
    }

    const renderContent = () => {
        if (isOpenView && dataLaporan) {
            return (
                <>
                    <ReportMonthView dataReport={dataLaporan} />
                </>
            );
        }

        if (isDownload && dataLaporan) {
            return (
                <>
                    <DownloadReportBulanan
                        idDok={dataLaporan.idDok}
                        onOpenChange={handleOpenChange}
                    />
                </>
            )
        }
        return (

            <InputReportMonth
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

export default FormReportMonth