'use client'

import { TelurDikerami } from '@/types'
import { DataTable } from '@/components/another/DataTable/DataTable'
import moment from 'moment'
import {queryKeys} from '@/services'
import {getTelurDikerami} from '@/services/dikerami'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import {columns as Colomns} from '@/components/coloms/dikerami.columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Loading from '../app/admin/list-penyu-dikerami/loading'
import PenyuDikeramiForm from '@/components/Form/penyu-dikerami.form'
import { TIME } from '@/env/time.mjs'

export default function PenyuDikeramiView() {
const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
const [selectedPenyuInkubasi, setSelectedPenyuInkubasi ] = useState<TelurDikerami|any | null>(null);
const [isView, setIsView] = useState<boolean>(false);
const [isDeleted, setIsDeleted] = useState(false);

const { data, isFetching } = useQuery({
    queryKey:queryKeys.dikerami.all,
    queryFn:()=>getTelurDikerami(),
    gcTime : TIME.CACHE.LONG,
  });

  const onDeleteOpen = useCallback((dataPenyu: any) => {
    setSelectedPenyuInkubasi(dataPenyu);
    setIsDialogOpen(true);
    setIsDeleted(true);
  }, []);

  const onEditOpen = useCallback((dataPenyuDikerami: TelurDikerami) => {
    setSelectedPenyuInkubasi(dataPenyuDikerami);
    setIsDialogOpen(true);
  }, []);
  const onViewOpen = useCallback((dataPenyuDikerami: TelurDikerami) => {
    setSelectedPenyuInkubasi(dataPenyuDikerami);
    setIsDialogOpen(true);
    setIsView(!isView)
  }, []);

  
const columns = useMemo(() => Colomns({ onEditOpen, onDeleteOpen,onViewOpen }), [onEditOpen,onDeleteOpen,onViewOpen]);

  moment.locale("id");
  return (
    <section className="py-20">
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">Penyu Diinkubasi </h1>
      <Card>
        <CardContent>
          {isFetching && <Loading />}
          {!isFetching && <DataTable 
          setOpen={() => setIsDialogOpen(!isDialogOpen)}
          data={data as any} 
          columns={columns} />}
        </CardContent>
      </Card>
    </div>
    <PenyuDikeramiForm
          isOpen={isDialogOpen}
          isOpenView={isView}
          isDelete={isDeleted}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedPenyuInkubasi(null);
            }
            if (isView||isDeleted) {
              setIsView(false);
              setIsDeleted(false)
            }
          }}
          dataPenyuDikerami={selectedPenyuInkubasi}
        />

  </section>
  )
}
