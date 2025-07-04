"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "@/components/another/DataCard/Card.component";
import { Grid } from "@mui/material";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EmptyView from '@/components/another/empty-view.component';
import { Inkubasi } from "@/types";
import { getInkubasi } from "@/services/diinkubasi";
import { queryKeys } from "@/services";
import moment from 'moment';
import PenyuDirawatForm from "@/components/Form/penyu-dirawat.form";
import { DatePicker } from "@/components/another/datepicker";
import { Button as ButtonElement } from "@/components/ui/button";
import { textDetail } from '@/env/description.mjs'
import { TIME } from '@/env/time.mjs'

const TukikList = ({ Track = false }: { Track?: boolean }) => {
  const { penyuDiinkubasi } = textDetail
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPenyu, setSelectedPenyu] = useState<Inkubasi | null>(null);
  const [isView, setIsView] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [initialData, setInitialData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);

  const { data, isFetching } = useQuery({
    queryKey: queryKeys.inkubasi.all,
    queryFn: () => getInkubasi(),
    gcTime : TIME.CACHE.LONG,
  });

  useEffect(() => {
    if (data?.data) {
      setInitialData(Array.isArray(data.data) ? data.data : [data.data]);
      setFilteredData(Array.isArray(data.data) ? data.data : [data.data]);
    }
  }, [data]);

  const handleDateChange = (date: Date) => {
    const filtered = initialData.filter((item: Inkubasi) => {
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

  const onEditOpen = useCallback((dataPenyu: Inkubasi) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
  }, []);

  const onDeleteOpen = useCallback((dataPenyu: Inkubasi) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
    setIsDeleted(true);
  }, []);

  const onViewOpen = useCallback((dataPenyu: Inkubasi) => {
    setSelectedPenyu(dataPenyu);
    setIsDialogOpen(true);
    setIsView(true);
  }, []);

  const handleAddNew = useCallback(() => {
    setIsDialogOpen(true);
    setSelectedPenyu(null);
    setIsView(false);
    setIsDeleted(false);
  }, []);

  const showEmptyState = !isFetching && (!filteredData || filteredData.length === 0);
  const showGrid = !isFetching && filteredData && filteredData.length > 0;

  return (
    <Suspense>
      {/* {!Track && <NavbarBack Massage="Penyu Naik" />} */}
      <div className={"p-4  md:p-8"}>
        {!Track && (
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/list">List</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{penyuDiinkubasi.tittle}</BreadcrumbPage>
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
            CardDescription="Saat ini tidak ada data penyu naik yang tersedia."
            clickActions={handleAddNew}
          />
        )}

        {showGrid && (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filteredData.map((item: Inkubasi) => (
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
                    jumlah: `Jumlah Dirawat ${item.JumlahTukik}`,
                    status: Track&&item.idPenyuMenetas ? "Dirawat" : "",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* {Track && !isDialogOpen && (
          <FloatingBottom handleAddNew={handleAddNew} />
        )} */}
      </div>

      <PenyuDirawatForm
        isOpen={isDialogOpen}
        isOpenView={isView}
        isDeleted={isDeleted}
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
        Dirawat={selectedPenyu as any}
      />
    </Suspense>
  );
};

export default TukikList;