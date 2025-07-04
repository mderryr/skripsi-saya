"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
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
import { TukikMati as Mati} from "@/types";
import { getInkubasiMati } from "@/services/mati";
import { queryKeys } from "@/services";
import moment from 'moment';
import PenyuMatiForm from "@/components/Form/penyu-dirawat-mati.form";
import { textDetail } from "@/env/description.mjs";
import { DatePicker } from "@/components/another/datepicker";
import { Button as ButtonElement } from "@/components/ui/button";
import { TIME } from '@/env/time.mjs'

const TukikList = ({ Track = false,Button=false }: { Track?: boolean,Button?:boolean }) => {
  const {penyuMati} = textDetail
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPenyu, setSelectedPenyu] = useState<Mati | null>(null);
  const [isView, setIsView] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [initialData, setInitialData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>();

  const handleDateChange = (date: Date) => {
    // console.log("Selected date:", date);
    const filteredData = initialData.filter((item: any) => {
      const itemDate = moment(item.tanggalData);
      const selectedDate = moment(date);
      return (
        itemDate.isSame(selectedDate, "month") &&
        itemDate.isSame(selectedDate, "year")
      );
    });
    // console.log("Filtered data:", filteredData);
    setFilteredData(filteredData);
    setMonth(date.getMonth()); // Update month state
    setYear(date.getFullYear()); // Update year state
  };

  const handleResetData = () => {
    setFilteredData(initialData);
  };

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.mati.all,
    queryFn: () => getInkubasiMati(),
    gcTime : TIME.CACHE.LONG,

  });

  useEffect(() => {
    if (data?.data) {
      setInitialData(data.data);
      setFilteredData(data.data);
    }
  }, [data]);

  const onEditOpen = useCallback((dataPenyu: Mati) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
  }, []);

  const onDeleteOpen = useCallback((dataPenyu: Mati) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
    setIsDeleted(true);
  }, []);

  const onViewOpen = useCallback((dataPenyu: Mati) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
    setIsView(true);
  }, []);

  const handleAddNew = useCallback(() => {
    setIsDialogOpen(true);
    setSelectedPenyu(null);
    setIsView(false);
    setIsDeleted(false);
  },[])

  const showEmptyState = !isFetching && (!filteredData || filteredData.length === 0);
  const showGrid = !isFetching && filteredData && filteredData.length > 0;


   return (
    <Suspense>
      <div className={"p-4 md:p-8"}>
        {!Track && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/list">List</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{penyuMati.tittle}</BreadcrumbPage>
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
            Title={`Tidak Ada ${penyuMati.tittle}`}
            CardDescription={penyuMati.formDescription}
            clickActions={handleAddNew}
          />
        )}

        {showGrid && (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filteredData.map((item: Mati) => (
              <Grid item xs={4} sm={4} md={4} key={item.id}>
                <CardComponent
                  Track={Track}
                  onView={() => onViewOpen(item)}
                  onDelete={() => onDeleteOpen(item)}
                  onEdit={() => onEditOpen(item)}
                  onCustom={() => onEditOpen(item)}
                  data={item}
                  Massage={"Diinkubasi"}
                  item={{
                    id: item.idDok,
                    tanggal: moment(item.tanggalData).format(
                      "dddd, DD MMM YYYY"
                    ),
                    jumlah: `Jumlah Tukik ${item.penyuMati}`,
                    status: Track&&"Mati",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* {Button && !isDialogOpen && (
          <FloatingBottom handleAddNew={handleAddNew} />
        )} */}
      </div>

      <PenyuMatiForm 
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDelete={isDeleted}
        MatiDirawat={selectedPenyu as any}
        onOpenChange={(value) => {
          setIsDialogOpen(value);
          if (!value) {
            setSelectedPenyu(null);
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