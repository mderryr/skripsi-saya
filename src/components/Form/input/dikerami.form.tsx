"use client";

import { Button } from "@/components/ui/button";
import { createTelurDikerami, updateTelurDikerami } from "@/services/dikerami";
import { queryKeys } from "@/services/queryKey.factory";
import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/another/date-picker-form.component";
import { Switch } from "@/components/ui/switch";
import {
  TambahTelurDikeramiZod,
  TambahTelurDikeramiDOT,
  TelurDikerami,
  PenyuNaik,
} from "@/types";
import useStatusUtils from "@/utils/status-toast.utils";
import { getSession } from '@/services/login/auth'
import { TIME } from '@/env/time.mjs'

export function InputDikerami({
  DATAIN = undefined,
  onOpenChange,
  DATATRACK = undefined,
}: {
  DATAIN?: TelurDikerami | null | undefined;
  DATATRACK?: PenyuNaik | null | undefined;
  onOpenChange: (value: boolean) => void;
}) {
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const queryClient = useQueryClient();


//   const UserData = async() =>{
//   const session = await getSession() || "Anoymous"
//   return session
// }


  const { data: UserData } = useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
    gcTime: TIME.CACHE.VERY_SHORT,
    staleTime: Infinity,
    refetchOnWindowFocus: false, // Matikan refetch saat window fokus
    refetchOnMount: false, // Matikan refetch saat komponen mount
});

  const form = useForm<TambahTelurDikeramiDOT>({
    resolver: zodResolver(TambahTelurDikeramiZod),
    defaultValues: useMemo(() => {
      return DATAIN 
      ? {
        telurBaik: DATAIN.telurBaik ?? 0,
        date: moment(DATAIN.tanggalData).format(),
        keterangan: DATAIN.Keterangan ?? "",
        menetas: DATAIN.menetas ?? false,
    }: DATATRACK? {
      telurBaik: DATATRACK.telurDiselamatkan ?? 0 ,
      date: moment(DATATRACK.tanggalData).format(),
      keterangan: DATATRACK.Keterangan ?? "",
      menetas: false,
    }:{
      telurBaik: 0,
      penyuNaik: 0,
      bertelur: false,
      date: moment().format(),
      dikerami: false,
      idZone: undefined,
      keterangan: undefined,
    }},[DATAIN,DATATRACK]),
    mode: "onChange",
  });



  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await createTelurDikerami(dto);
      return data; // Return the data directly
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.dikerami.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.dikerami.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ dto }: { dto: any }) => {
      const data = await updateTelurDikerami(dto);
      return data;
    },
    onSuccess: (data) =>
      onUpdateSuccess({
        newData: data,
        params: queryKeys.dikerami.all,
        massage: "Data berhasil di ganti",
        onOpenChange: onOpenChange,
      }),
    onError: onRequestError,
  });

  const onSubmit: SubmitHandler<TambahTelurDikeramiDOT> = (
    values: TambahTelurDikeramiDOT
  ) => {
    const createDto: TambahTelurDikeramiDOT = {
      telurBaik: values.telurBaik ?? 0,
      date: moment(values.date).format(),
      idPenanggungJawab:UserData?.Saveuser?.idUser || "Anonymous",
      keterangan: values.keterangan ?? "",
      menetas: values.menetas ?? true,
    };
    if (DATAIN) {
      updateMutation.mutate({
        dto: {
          ...createDto,
          idData: DATAIN.id,
        },
      });
    } if(DATATRACK){
      createMutation.mutate({
        ...createDto,
        idDok:DATATRACK.idDok,
        idData:DATATRACK.id,
        jumlahPenyuNaik:DATATRACK.telurDiselamatkan
      });
    }
    else {
      createMutation.mutate(createDto);
    }
  };

  return (
    <div className="max-h-screen overflow-y-auto">
      <Form {...form}>
        <form className="space-y-4 mx-6">
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
            name="telurBaik"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Telur</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Jumlah Telur Diinkubasi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {DATATRACK&&(
            <FormField
              control={form.control}
              name="menetas"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Telur Menetas</FormLabel>
                    <FormDescription>
                      Nyalakan centang jika penyu bertelur
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          <FormField
            name="keterangan"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Tambah keterangan disini..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting || createMutation.isPending||updateMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {DATAIN ? "Rubah Data" : "Tambah Data"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
