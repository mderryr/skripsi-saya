"use client";

import { Suspense, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "@/components/another/DataCard/Card.component";
import { getzona } from "@/services/zona";
import { Grid } from "@mui/material";
import FloatingBottom from '@/components/another/add-bottom.component'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EmptyView from '@/components/another/empty-view.component';
import { queryKeys } from "@/services";
import moment from 'moment';
import ZonaForm from "@/components/Form/zona.form";
import { TIME } from '@/env/time.mjs'

const TukikList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [Selected, setSelected] = useState<any>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { data, isFetching } = useQuery({
    queryKey: queryKeys.zona.all,
    queryFn: () => getzona(),
    gcTime: TIME.CACHE.LONG,

  });

  const zonaData = data?.data ?? []; // Memberikan nilai default array kosong

  const handleDialog = useCallback((value: any = null, isViewMode = false, isDeleteMode = false) => {
    setIsOpen(!isOpen)
    setSelected(value);
    setIsDialogOpen(true);
    setIsView(isViewMode);
    setIsDeleted(isDeleteMode);
  }, []);

  const handleAddNew = useCallback(() => {
    handleDialog();
  }, [handleDialog]);

  const renderContent = () => {
    if (!isFetching && (!zonaData || zonaData.length === 0)) {
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
        {zonaData.map((item: any) => (
          <Grid item xs={4} sm={4} md={4} key={item.id}>
            <CardComponent
              onView={() => handleDialog(item, true)}
              onDelete={() => handleDialog(item, false, true)}
              onEdit={() => handleDialog(item)}
              onCustom={() => handleDialog(item)}
              data={item}
              Massage="Dirawat"
              item={{
                id: item.nama,
                tanggal: item.keterangan,
                jumlah: item.Keterangan,

              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Suspense>
      <div className="p-4 md:p-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/list">List</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>List Zona</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {renderContent()}
      </div>

      {isOpen && <FloatingBottom handleAddNew={handleAddNew} />}

      <ZonaForm
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDelete={isDeleted}
        onOpenChange={(value) => {
          setIsDialogOpen(value);
          setIsOpen(!isOpen)
          if (!value) {
            setSelected(null);
            setIsView(false);
            setIsDeleted(false);
          }
        }}
        dataZona={Selected}
      />
    </Suspense>
  );
};

export default TukikList;