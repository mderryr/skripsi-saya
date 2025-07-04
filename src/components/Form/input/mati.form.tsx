"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "@/components/another/date-picker-form.component";
import {
  TukikMati,
  Inkubator,
  TambahTukikMatiDOT,
  TambahTukikMatiZod,
  JenisPenyu,
} from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInkubasiMati, updateInkubasiMati } from "@/services/mati";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { getJenisPenyu } from "@/services/penyu";
import { getInkubator } from "@/services/inkubator";
import useStatusUtils from "@/utils/status-toast.utils";
import { queryKeys } from "@/services/queryKey.factory";
import { getSession } from "@/services/login/auth";
import { TIME } from '@/env/time.mjs'

export function InputMati({
  DATAIN = undefined,
  DATATRACK = undefined,
  onOpenChange,
}: {
  DATAIN?: TukikMati | undefined | null;
  DATATRACK?: Inkubator | undefined | null;
  onOpenChange: (value: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const [inkubator, setInkubator] = useState<any>();
  const form = useForm<TambahTukikMatiDOT>({
    resolver: zodResolver(TambahTukikMatiZod),
    defaultValues: {
      penyuMati: 0,
      date: moment().format(),
    },
    mode: "onChange",
  });

  const { data: INKUBATOR, isLoading: LOADINGINKUBATOR } = useQuery({
    queryKey: queryKeys.inkubator.all,
    queryFn: () => getInkubator(),
    gcTime : TIME.CACHE.LONG,

  });

  const { data: JENISPENYU, isLoading: LOADINGPENYU } = useQuery({
    queryKey: queryKeys.dataTukik.all,
    queryFn: () => getJenisPenyu(),
    gcTime : TIME.CACHE.LONG,

  });

  const { data: UserData } = useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
    gcTime : TIME.CACHE.LONG,

  });

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await createInkubasiMati(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.mati.all,
        massage: "Data Berhasil Ditambah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.mati.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await updateInkubasiMati(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onUpdateSuccess({
        newData: data,
        params: queryKeys.mati.all,
        massage: "Data Berhasil Dirubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.mati.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  useEffect(() => {
    if (!LOADINGINKUBATOR) {
      setInkubator(INKUBATOR?.data);
    }
    if (DATAIN) {
      form.reset({
        idInkubator: DATAIN?.idInkubator?.toString(),
        idPenyu: DATAIN.idPenyu || "",
        keterangan: DATAIN?.Keterangan || "",
        penyuMati: Number(DATAIN.penyuMati) || 0,
        date: moment(DATAIN.tanggalData).format(),
      });
    }
    if (DATATRACK) {
      // console.log(DATATRACK)
      form.reset({
        idInkubator: JSON.stringify({ ...DATATRACK, id: DATATRACK.id.toString() }),
        keterangan: "",
      });
    } else {
      form.reset();
    }
  }, [DATATRACK, DATAIN]);

  //*Submit data disini
  const onSubmit: SubmitHandler<TambahTukikMatiDOT> = (values) => {

    let DataInkubator: Inkubator | undefined;
    if (values.idInkubator) {
      DataInkubator = DATATRACK ? DATATRACK : JSON.parse(values.idInkubator) as Inkubator;
      console.log(DataInkubator);

    }
    const createDto: any = {
      idPenanggungJawab: UserData.Saveuser.idUser,
      date: moment(values.date).format(),
      idPenyu: values.idPenyu,
      penyuMati: values.penyuMati,
      idInkubator: DATATRACK ? DATATRACK.idInkubator : DataInkubator?.idInkubator,
      keterangan: values.keterangan,
      hidup: DataInkubator?.tukikHidup&&DATATRACK
        ? DataInkubator?.tukikHidup - values.penyuMati
        : 0,
      mati: DataInkubator?.tukikMati
        ? DataInkubator?.tukikMati + values.penyuMati
        : values.penyuMati,
      Track: DATATRACK?true:false,
    };
    // console.log(createDto);
    if (!DATAIN || DATATRACK) {
      createMutation.mutate(createDto as any);
    } else {
      updateMutation.mutate({ ...createDto, idData: DATAIN.id });
    }
  };

  return (
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

        {!LOADINGPENYU && (
          <FormField
            control={form.control}
            name="idPenyu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Penyu</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={
                    field.value?.toString() || DATAIN?.idPenyu?.toString()
                  }
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

        {!DATATRACK && (
          <FormField
            control={form.control}
            name="idInkubator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat Perawatan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={DATATRACK ? JSON.stringify({ DATATRACK }) : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Silahkan Pilih Tempat Perawatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inkubator?.map((value: Inkubator) => (
                      <SelectItem value={JSON.stringify({ ...value, id: value.id.toString() })}>
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
          name="penyuMati"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Tukik Mati</FormLabel>
              <FormControl>
                <Input placeholder="Jumlah Telur Menetas " {...field} />
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
