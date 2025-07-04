"use client";

import { useMemo } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "@/components/another/date-picker-form.component";
import { Switch } from "@/components/ui/switch";
import {
  TambahPenyuNaikZod,
  TambahPenyuNaikDOT,
  Zona,
  PenyuNaik,
} from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPenyuNaik, updatedPenyuNaik } from "@/services/naik";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import moment from "moment";
import useStatusUtils from "@/utils/status-toast.utils";
import { queryKeys } from "@/services/queryKey.factory";
import { getzona } from "@/services/zona";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/services/login/auth";
import { TIME } from '@/env/time.mjs'

interface FormInputNaik {
  Track?: boolean;
  DATAIN?: PenyuNaik | null | undefined;
  onOpenChange: (value: boolean) => void;
}
export function InputNaik({
  Track = false,
  DATAIN = undefined,
  onOpenChange,
}: FormInputNaik) {
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const queryClient = useQueryClient();

const form = useForm<TambahPenyuNaikDOT>({
  resolver: zodResolver(TambahPenyuNaikZod),
  defaultValues: useMemo(() => {
    if (DATAIN) {
      return {
        telurBaik: DATAIN.telurDiselamatkan ?? 0,
        penyuNaik: DATAIN.jumlahPenyu ?? 0,
        bertelur: DATAIN.penyuBertelur ?? false,
        date: moment(DATAIN.tanggalData).format() ?? "",
        dikerami: DATAIN.dikerami ?? false,
        idZone: Number(DATAIN.id),
        keterangan: DATAIN.Keterangan ?? undefined,
      };
    }
    return {
      telurBaik: 0,
      penyuNaik: 0,
      bertelur: false,
      date: moment().format(),
      dikerami: false,
      idZone: undefined,
      keterangan: undefined,
    };
  }, [DATAIN]),
  mode: "onChange",
});

  const { data: ZonaData, isLoading: zonaLoading } = useQuery({
    queryKey: queryKeys.zona.all,
    queryFn: () => getzona(),
    gcTime : TIME.CACHE.LONG,

  });

  const { data: UserData } = useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
    gcTime: TIME.CACHE.VERY_SHORT,
    staleTime: Infinity,
    refetchOnWindowFocus: false, // Matikan refetch saat window fokus
    refetchOnMount: false, // Matikan refetch saat komponen mount
});
//   const UserData = async() =>{
//   const session = await getSession() || "Anoymous"
//   return session
// }

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await createPenyuNaik(dto);
      return data; // Return the data directly
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.naik.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.naik.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, dto }: { id: number; dto: any }) => {
      const data = await updatedPenyuNaik(id, dto);
      return {
        newData: data.data,
        params: queryKeys.naik.all,
        massage: "Data Sudah di Update",
        onOpenChange: onOpenChange,
      };
    },
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });

  const onSubmit: SubmitHandler<TambahPenyuNaikDOT> = (
    values: TambahPenyuNaikDOT
  ) => {
    const createDto: any = {
      telurBaik: values.telurBaik,
      penyuNaik: values.penyuNaik,
      bertelur: values.bertelur,
      date: moment(values.date).format(),
      idPenanggungJawab: UserData.Saveuser.idUser,
      dikerami: values.dikerami,
      idZone: values.idZone || undefined,
      keterangan: values.keterangan,
    };
    // console.log(createDto);
    if (!DATAIN) {
      createMutation.mutate(createDto);
    } else {
      updateMutation.mutate({ dto: createDto, id: Number(DATAIN.id) });
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
            name="penyuNaik"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Penyu</FormLabel>
                <FormControl>
                  <Input placeholder="Jumlah Penyu Naik" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {ZonaData?.data?.length ? (
            <FormField
              control={form.control}
              name="idZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Naik (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Silahkan pilih zona naik" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ZonaData.data?.map((value: Zona) => (
                        <SelectItem value={value.id.toString()}>
                          {value.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            ""
          )}

          <FormField
            control={form.control}
            name="bertelur"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Penyu Bertelur</FormLabel>
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
          {form.getValues().bertelur && (
            <div>
              <FormField
                name="telurBaik"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Telur</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jumlah telur diselamatkan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {Track && (
                <FormField
                  control={form.control}
                  name="dikerami"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Langsung Diinkubasi
                        </FormLabel>
                        <FormDescription>
                          Nyalakan centang jika penyu langsung diinkubasi
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
            </div>
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
            disabled={form.formState.isSubmitting || createMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {DATAIN ? "Rubah Data" : "Tambah Data"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
