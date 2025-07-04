"use client";

import { Suspense, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "@/components/another/DataCard/Card.component";
import { Grid } from "@mui/material";
import { getInkubator } from "@/services/inkubator";
import EmptyView from '@/components/another/empty-view.component';
import { queryKeys } from "@/services";
import moment from 'moment';
import { TelurDikerami,Inkubator } from "@/types";
import PenyuMatiDirawatForm from "@/components/Form/penyu-dirawat-mati.form";
import InkubatorForm from "@/components/Form/inkubator.form";
import PelepasanForm from "@/components/Form/penyu-dilepas.form";
import { TIME } from '@/env/time.mjs'


const TukikList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [Selected, setSelected] = useState<TelurDikerami | null>();
    const [isView, setIsView] = useState<boolean>(false);
    const [released, serReleased] = useState<boolean>(false);
  
    const { data, isFetching } = useQuery({
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

  // Convert data to array if it's not
  const penyuList = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];

  return (
    <Suspense>
      
      <div className={"p-4 md:p-8"}>
        {penyuList.length === 0 ? (
          <EmptyView
            Title="Tidak Ada Data"
            CardDescription="Saat ini tidak ada data penyu naik yang tersedia."
        
          />
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {!isFetching && penyuList.map((item: Inkubator) => (
              <Grid item xs={4} sm={4} md={4} key={item.id}>
                <CardComponent
                  Inkubator
                  onView={() => onViewOpen(item)}
                  onDelete={() => onDeadOpen(item)}
                  onEdit={()=>onReleased(item)}
                  data={item}
                  item={{
                    id: item.namaInkubator,
                    tanggal:`Jumlah Tukik Hidup ${item.tukikHidup}`,
                    jumlah: `Jumlah Tukik Mati ${item.tukikMati}`,
                    status: item.tukikAda ? "Dirawat" :item.berfungsi?"Aktif": "Rusak",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button */}
        {/* {!isDialogOpen&&<FloatingBottom
        handleAddNew={handleAddNew}
        />} */}
      </div>

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
    </Suspense>
  );
};

export default TukikList;