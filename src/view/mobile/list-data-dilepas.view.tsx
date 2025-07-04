"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "@/components/another/DataCard/Card.component";
import NavbarBack from "@/components/another/navbar-list-back.component";
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
import { getTukikPelepasan } from "@/services/dilepas";
import { queryKeys } from "@/services";
import moment from 'moment';
import { Pelepasan as Dilepas } from "@/types";
import PenyuDilepasForm from "@/components/Form/penyu-dilepas.form";
import { DatePicker } from "@/components/another/datepicker";
import { Button as ButtonElement } from "@/components/ui/button";
import { TIME } from '@/env/time.mjs'

const TukikList = ({ Track = false }: { Track?: boolean }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [Selected, setSelected] = useState<Dilepas | null>(null);
    const [isView, setIsView] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [initialData, setInitialData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);

    const { data, isFetching } = useQuery({
      queryKey: queryKeys.dilepas.all,
      queryFn: () => getTukikPelepasan(),
    gcTime : TIME.CACHE.LONG,
      
    });

    useEffect(() => {
      if (data?.data) {
        setInitialData(data?.data);
        setFilteredData(data?.data);
      }
    }, [data]);

    const handleDateChange = (date: Date) => {
      const filtered = initialData.filter((item: Dilepas) => {
        const itemDate = moment(item.tanggalData);
        const selectedDate = moment(date);
        return (
          itemDate.isSame(selectedDate, "month") &&
          itemDate.isSame(selectedDate, "year")
        );
      });
      setFilteredData(filtered);
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    };

    const handleResetData = () => {
      setFilteredData(initialData);
    };
  
    const onDeleteOpen = useCallback((dataPenyu: Dilepas) => {
      setSelected(dataPenyu);
      setIsDialogOpen(true);
      setIsDeleted(true);
    }, []);
  
    const onEditOpen = useCallback((dataPenyu: Dilepas) => {
      setSelected(dataPenyu);
      setIsDialogOpen(true);
    }, []);

    const onViewOpen = useCallback((dataPenyu: Dilepas) => {
      setSelected(dataPenyu);
      setIsDialogOpen(true);
      setIsView(true);
    }, []);

    const handleAddNew = useCallback(() => {
      setIsDialogOpen(true);
      setSelected(null);
      setIsView(false);
      setIsDeleted(false);
    }, []);

    const showEmptyState = !isFetching && (!filteredData || filteredData.length === 0);
    const showGrid = !isFetching && filteredData && filteredData.length > 0;

    return (
      <Suspense>
       
        <div className={"p-4  md:p-8"}>
          {!Track && (
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/list">List</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dilepas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {!Track && (
            <div className="flex items-center max-md:py-4 py-1">
              <DatePicker
                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
                onChange={handleDateChange}
              />
              <ButtonElement
                onClick={handleResetData}
                variant="outline"
                className="mx-2"
              >
                Reset Data
              </ButtonElement>
            </div>
          )}

          {showEmptyState && (
            <EmptyView
              Title="Tidak Ada Data"
              CardDescription="Saat ini tidak ada data yang tersedia."
              clickActions={handleAddNew}
            />
          )}

          {showGrid && (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {filteredData.map((item: Dilepas) => (
                <Grid item xs={4} sm={4} md={4} key={item.id}>
                  <CardComponent
                    Track={Track}
                    onView={() => onViewOpen(item)}
                    onDelete={() => onDeleteOpen(item)}
                    onEdit={() => onEditOpen(item)}
                    onCustom={() => onEditOpen(item)}
                    data={item}
                    Massage={"Dirawat"}
                    item={{
                      id: item.idDok,
                      tanggal: moment(item.tanggalData).format(
                        "dddd, DD MMM YYYY"
                      ),
                      jumlah: `${item.JumlahTukik} Tukik`,
                      
                    }}    
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>

        {/* <FloatingBottom handleAddNew={handleAddNew} /> */}

        <PenyuDilepasForm 
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDelete={isDeleted}
        dataPelepasan={Selected as any}
        onOpenChange={(value) => {
          setIsDialogOpen(value);
          if (!value) {
            setSelected(null);
          }
          if (isView || isDeleted) {
            setIsView(false);
            setIsDeleted(false);
          }
        }}
      />
      </Suspense>
    );
};

export default TukikList;