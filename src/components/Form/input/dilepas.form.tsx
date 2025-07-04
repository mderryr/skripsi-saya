"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "@/components/another/date-picker-form.component";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  Inkubator,
  TambahPelepasanTukikDOT,
  TambahPelepasanTukik,
  Pelepasan,
} from "@/types";
import { getInkubator } from "@/services/inkubator";
import useStatusUtils from "@/utils/status-toast.utils";
import { queryKeys } from "@/services/queryKey.factory";
import { createTukikPelepasan, updateTukikPelepasan } from "@/services/dilepas";
import { getSession } from '@/services/login/auth';
import { TIME } from '@/env/time.mjs'

interface InputDilepasProps {
  onOpenChange: (value: boolean) => void;
  DATATRACK?: Inkubator;
  DATAIN?: (Pelepasan & { Inkubasi: Inkubator });
}

export function InputDilepas({ DATAIN, DATATRACK, onOpenChange }: InputDilepasProps) {
  const router = useRouter();
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const [inkubator, setInkubator] = useState<Inkubator[]>([]);
  const queryClient = useQueryClient();

  const form = useForm<TambahPelepasanTukikDOT>({
    resolver: zodResolver(TambahPelepasanTukik),
    defaultValues: {
      JumlahTukik: 0,
      date: moment(new Date()).format(),
      keterangan: "",
    },
    mode: "onChange",
  });

  const { data: INKUBATOR, isLoading: LOADINGINKUBATOR } = useQuery({
    queryKey: queryKeys.inkubator.all,
    queryFn:()=> getInkubator(),
    gcTime : TIME.CACHE.LONG,

  });

  const { data: UserData } = useQuery({
    queryKey: queryKeys.user.all,
    queryFn:()=> getSession(),
    gcTime : TIME.CACHE.LONG,

  });

  const createMutation = useMutation({
    mutationFn: createTukikPelepasan,
    onSuccess: (data) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.dilepas.all,
        massage: "Data Berhasil Ditambah",
        onOpenChange,
      });
      router.refresh();
    },
    onError: () => onRequestError({ onOpenChange }),
  });

  const updateMutation = useMutation({
    mutationFn: updateTukikPelepasan,
    onSuccess: (data) => {
      onUpdateSuccess({
        newData: data,
        params: queryKeys.dilepas.all,
        massage: "Data Berhasil Dirubah",
        onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.dilepas.all 
      });
    },
    onError: () => onRequestError({ onOpenChange }),
  });

  useEffect(() => {
    if (!LOADINGINKUBATOR && INKUBATOR?.data) {
      setInkubator(INKUBATOR.data as any);
    }
    if (DATAIN) {
      form.reset({
        idInkubator: JSON.stringify({...DATAIN.Inkubasi, id: DATAIN.Inkubasi.id.toString()}),
        JumlahTukik: DATAIN.JumlahTukik,
        date: moment(DATAIN.tanggalData).format(),
        keterangan: DATAIN.Keterangan || "",
      });
    } else if (DATATRACK) {
      form.reset({
        idInkubator: JSON.stringify({...DATATRACK, id: DATATRACK.id.toString()}),
        JumlahTukik: DATATRACK.tukikHidup ?? 0,
      });
    } else {
      form.reset();
    }
  }, []);

  const onSubmit: SubmitHandler<TambahPelepasanTukikDOT> = (values) => {
    const getDataInkubator: Inkubator = values.idInkubator 
      ? JSON.parse(values.idInkubator) 
      : DATATRACK || {};

    const createDto = {
      idPenanggungJawab: UserData?.Saveuser.idUser,
      date: moment(values.date).format(),
      JumlahTukik: Number(values.JumlahTukik) === getDataInkubator.tukikHidup
        ? Number(values.JumlahTukik)
        : Number(getDataInkubator?.tukikHidup) - Number(values.JumlahTukik),
      idInkubator: getDataInkubator.idInkubator,
      keterangan: values.keterangan,
      all: getDataInkubator?.tukikHidup === Number(values.JumlahTukik),
      hidup: Number(getDataInkubator?.tukikHidup) - Number(values.JumlahTukik),
      mati: getDataInkubator?.tukikMati||0,
      Track: DATATRACK?true:false
    };

    if (
      DATATRACK &&
      Number(getDataInkubator?.tukikHidup) < Number(values.JumlahTukik)
    ) {
      form.setError("JumlahTukik", {
        type: "manual",
        message: `Jangan melebihi ${Number(getDataInkubator?.tukikHidup)}`,
      });
      return;
    }

    if (!DATAIN || DATATRACK) {
      createMutation.mutate(createDto);
    } else {
      updateMutation.mutate({ ...createDto, idData: DATAIN.idDok });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 mx-6">
        {!DATATRACK && (
          <FormField
            control={form.control}
            name="idInkubator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat Perawatan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field?.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Silahkan Pilih Tempat Perawatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inkubator.map((value: Inkubator) => (
                      <SelectItem key={value.id} value={JSON.stringify({...value, id: value.idInkubator})}>
                        {value.namaInkubator}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Data</FormLabel>
              <DatePicker
                value={moment(field.value).toDate()}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="JumlahTukik"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Tukik Dilepas</FormLabel>
              <FormControl>
                <Input placeholder="Jumlah tukik dilepas " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="keterangan"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Tambahkan Keterangan ....  " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            createMutation.isPending
          }
          onClick={form.handleSubmit(onSubmit)}
        >
          {DATAIN ? "Rubah Data" : "Tambah Data"}
        </Button>
      </form>
    </Form>
  );
}