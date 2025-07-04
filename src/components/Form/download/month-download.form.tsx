'use client'

import { useMutation } from '@tanstack/react-query';
import useStatusUtils from "@/utils/status-toast.utils";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export const DownloadReportBulanan = ({
    idDok,
    onOpenChange
}: {
    idDok: string,
    onOpenChange: (value: boolean) => void
}) => {
    const { onCustomMessage } = useStatusUtils();
    const router = useRouter()

    const handleOpenChange = useMutation({
    mutationFn:async()=> {
        onOpenChange(false);
        onCustomMessage({
            Message:"Data Sudah Diproses",
            tittle:"Download",
            variant:"default"
        })
        router.push("/admin/proses/"+idDok)
    },
});
    return (
        <>
           <Button
           disabled={handleOpenChange.isPending}
           onClick={()=>handleOpenChange.mutate()}
           >
            Download
           </Button>
        </>)
};

// export default DownloadReportBulanan;