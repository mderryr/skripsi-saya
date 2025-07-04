"use client";

import { Suspense, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "@/components/another/DataCard/Card.component";
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
import InkubatorForm from "@/components/Form/inkubator.form";
import { getInkubator } from "@/services/inkubator";
import { TIME } from '@/env/time.mjs'

const TukikList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [Selected, setSelected] = useState<any>(null);
    const [isView, setIsView] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { data, isFetching } = useQuery({
        queryKey: queryKeys.inkubator.all,
        queryFn: () => getInkubator(),
        gcTime : TIME.CACHE.LONG,
    });

    const inkubatorData = Array.isArray(data?.data) ? data?.data : [];

    const handleDialog = useCallback((value: any = null, isViewMode = false, isDeleteMode = false) => {
      setSelected(value);
      setIsOpen(!isOpen)
      setIsDialogOpen(true);
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
                item={{
                    id: item.namaInkubator,
                    tanggal:`Jumlah Tukik Hidup ${item.tukikHidup}`,
                    jumlah: `Jumlah Tukik Mati ${item.tukikMati}`,
                    status: "",
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
                <BreadcrumbPage>List Inkubator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {renderContent()}

          {isOpen && <FloatingBottom handleAddNew={handleAddNew} />}

          
          <InkubatorForm 
            isOpen={isDialogOpen}
            isOpenView={isView}
            isDelete={isDeleted}
            dataInkubator={Selected}
            onOpenChange={(value) => {
              setIsDialogOpen(value);
          setIsOpen(!isOpen)

              if (!value) {
                setSelected(null);
              }
              if (isView || isDeleted) {
                setIsView(false);
                setIsDeleted(false);
              }
            }}
          />
        </div>
      </Suspense>
    );
};

export default TukikList;