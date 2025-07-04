"use client";

import { Suspense, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "@/components/another/DataCard/UserCard.component";
import { Grid } from "@mui/material";
import FloatingBottom from '@/components/another/add-bottom.component'
import EmptyView from '@/components/another/empty-view.component';
import { queryKeys } from "@/services";
import PenggunaForm from "@/components/Form/pengguna.form";
import { getPengguna } from "@/services/user";
import { TIME } from '@/env/time.mjs'


const TeamPengguna = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [Selected, setSelected] = useState<any>(null);
    const [isView, setIsView] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { data, isFetching } = useQuery({
        queryKey: queryKeys.users.all,
        queryFn: () => getPengguna(),
    gcTime : TIME.CACHE.LONG,

    });

    const inkubatorData = Array.isArray(data?.data) ? data?.data : [];

    const handleDialog = useCallback((value: any = null, isViewMode = false, isDeleteMode = false) => {
      setSelected(value);
      setIsDialogOpen(true);
      setIsOpen(!isOpen)
      setIsView(isViewMode);
      setIsDeleted(isDeleteMode);
    }, []);

    const handleAddNew = useCallback(() => {
      handleDialog();
    }, [handleDialog]);

    const renderContent = () => {
      if (!isFetching && (!inkubatorData || inkubatorData.length === 0)) {
        return (
          <EmptyView
            Title="Tidak Ada Data"
            CardDescription="Saat ini tidak ada data yang tersedia."
            clickActions={handleAddNew}
          />
        );
      }

      return (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {inkubatorData.map((item: any) => (
            <Grid item xs={4} sm={4} md={4} key={item.id}>
              <CardComponent
                onView={() => handleDialog(item, true)}
                onDelete={() => handleDialog(item, false, true)}
                onEdit={() => handleDialog(item)}
                data={item}
                nama={item.name}
                userName={item.username}
                noTelephone={item.nomerTelp}                                                    
              />
            </Grid>
          ))}
        </Grid>
      );
    };

    return (
      <Suspense>
        <div className="p-4 md:p-8">

          {renderContent()}

          {isOpen && <FloatingBottom handleAddNew={handleAddNew} />}

          
          <PenggunaForm
          isOpen={isDialogOpen}
          isOpenView={isView}
          isDelete={isDeleted}
          onOpenChange={(value) => {
      setIsOpen(!isOpen)

            setIsDialogOpen(value);
            if (!value) {
                setSelected(null);
            }
            if (isView||isDeleted) {
              setIsView(false);
              setIsDeleted(false)
            }
          }}
          dataPengguna={Selected}
        />
        </div>
      </Suspense>
    );
};

export default TeamPengguna;