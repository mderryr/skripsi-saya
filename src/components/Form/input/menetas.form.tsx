"use client";

import { useEffect,useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import DatePicker from "@/components/another/date-picker-form.component";
import { Switch } from "@/components/ui/switch";
import {
  TambahTukikMenetasDOT,
  TambahTukikMenetasZod,
  JenisPenyu,
  TelurMenetas,
  TelurDikerami,
  Inkubator,
} from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTelurMenetas, updateTelurMenetas } from "@/services/menetas";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import moment from "moment";
import useStatusUtils from "@/utils/status-toast.utils";
import { queryKeys } from "@/services/queryKey.factory";
import {getJenisPenyu} from '@/services/penyu'
import {getInkubator} from '@/services/inkubator'
import {useQuery} from '@tanstack/react-query'
import {getSession} from '@/services/login/auth'
import { TIME } from '@/env/time.mjs'

interface FormInputMenetas {
  DATAIN?: TelurMenetas | null | undefined;
  DATATRACK?: TelurDikerami | null | undefined;
  onOpenChange: (value: boolean) => void;
}
export function InputMenetas({
  DATAIN = undefined,
  DATATRACK = undefined,
  onOpenChange,
}: FormInputMenetas) {
  const queryClient = useQueryClient();
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const [inkubator,setInkubator] = useState<any>()
  const form = useForm<TambahTukikMenetasDOT>({
    resolver: zodResolver(TambahTukikMenetasZod),
    defaultValues: {
      telurBaik: 0,
      telurRusak: 0,
      date: moment().format(),
      keterangan: "",
      diinkubasi: false,
      idInkubator: undefined,
    },
    mode: "onChange",
  });

  const { data:JENISPENYU, isLoading:LOADINGPENYU} = useQuery({
    queryKey: queryKeys.dataTukik.all,
    queryFn:()=>getJenisPenyu(),
    gcTime : TIME.CACHE.LONG,

  });

  const { data:INKUBATOR, isLoading:LOADINGINKUBATOR } = useQuery({
    queryKey: queryKeys.inkubator.all,
    queryFn:()=>getInkubator(),
    gcTime : TIME.CACHE.LONG,

  });

  const { data: UserData } = useQuery({
    queryKey:queryKeys.user.all,
    queryFn:()=>getSession(),
    gcTime : TIME.CACHE.LONG,

  });

  useEffect(() => {
    if(!LOADINGINKUBATOR){
      setInkubator(INKUBATOR?.data)
    }
    if (DATAIN) {
      form.reset({
        telurBaik: DATAIN.telurMenetas ?? 0,
        telurRusak: DATAIN.telurRusak ?? 0,
        idPenyu: DATAIN.idPenyu||"",
        date: moment(DATAIN.tanggalData).format(), 
        keterangan: DATAIN.Keterangan ?? "",
      });
    }if(DATATRACK){
      form.reset({
        telurBaik:DATATRACK.telurBaik||0,
        date:moment(DATATRACK.tanggalData).format(),
        keterangan: "",
      })
    } 
    else {
      form.reset();
    }
  }, []);

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await createTelurMenetas(dto);
      return data; // Return the data directly
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.menetas.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.menetas.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (dto: {
      dto: TambahTukikMenetasDOT & {
        idData: number;
      }
    }) => {
      const data = await updateTelurMenetas(dto as any);
      return {
        newData: data.data,
        params: queryKeys.menetas.all,
        massage: "Data Sudah di Update",
        onOpenChange: onOpenChange,
      };
    },
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
  });

  const onSubmit: SubmitHandler<TambahTukikMenetasDOT> = (
    values: TambahTukikMenetasDOT
  ) => {
    const createDto: TambahTukikMenetasDOT | any = {
      telurBaik: DATATRACK?(values.telurBaik-values.telurRusak):values.telurBaik ,
      telurRusak: values.telurRusak ?? 0,
      idPenyu: values.idPenyu ?? 0,
      date: moment(values.date).format(),
      idPenanggungJawab:UserData.Saveuser.idUser,
      Keterangan: values.keterangan ?? "",
      idInkubator: values.idInkubator,
      track: DATATRACK?true:false,
    };
    // console.log(createDto);
    if (DATAIN) {
      updateMutation.mutate({ ...createDto, idData: DATAIN.id });
    }if(DATATRACK){
      createMutation.mutate({...createDto, idData:DATATRACK.idDok});
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
                <FormLabel>Jumlah Telur Menetas</FormLabel>
                <FormControl>
                  <Input 
                  disabled={DATATRACK?true:false}
                  placeholder="Jumlah Penyu Naik" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="telurRusak"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Telur Tidak Menetas</FormLabel>
                <FormControl>
                  <Input placeholder="Jumlah Penyu Naik" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          { !LOADINGPENYU&& (
            <FormField
              control={form.control}
              name="idPenyu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Penyu</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Silahkan pilih jenis penyu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JENISPENYU?.data?.map((value: JenisPenyu) => (
                        <SelectItem value={value.idJenisPenyu}>
                          {value.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {DATATRACK && (
            <FormField
              control={form.control}
              name="diinkubasi"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Tukik Dipindahkan
                    </FormLabel>
                    <FormDescription>
                      Nyalakan centang jika tukik yang menetas dipindahkan ke
                      tempat perawaatan
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
          { form.watch("diinkubasi") && inkubator && (
              <FormField
                control={form.control}
                name="idInkubator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Perawatan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Silahkan Pilih Tempat Perawatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inkubator.map((value: Inkubator) => (
                          <SelectItem value={value.idInkubator}>
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
            disabled={
              form.formState.isSubmitting ||
              createMutation.isPending ||
              updateMutation.isPending
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            {DATAIN ? "Rubah Data" : "Tambah Data"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
