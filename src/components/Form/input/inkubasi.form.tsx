"use client";

import { Button } from "@/components/ui/button";
import { queryKeys } from "@/services/queryKey.factory";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  crerateInkubasiPenyu,
  updateInkubasiPenyu,
} from "@/services/diinkubasi";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/another/date-picker-form.component";
import {
  Inkubasi,
  TelurMenetas,
  TambahTukikInkubasi,
  TambahTukikInkubasiDOT,
  Inkubator,
  JenisPenyu,
} from "@/types";
import { getJenisPenyu } from "@/services/penyu";
import { getInkubator } from "@/services/inkubator";
import useStatusUtils from "@/utils/status-toast.utils";
import { getSession } from "@/services/login/auth";
import { TIME } from '@/env/time.mjs'


export function InputDiinkubasi({
  DATAIN = undefined,
  DATATRACK = undefined,
  onOpenChange,
}: {
  DATAIN?: Inkubasi | undefined | null;
  DATATRACK?: TelurMenetas | undefined | null;
  onOpenChange: (value: boolean) => void;
}) {
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  // const [inkubator,setInkubator] = useState<any>()
  const queryClient = useQueryClient();

  const form = useForm<TambahTukikInkubasiDOT>({
    resolver: zodResolver(TambahTukikInkubasi),
    defaultValues: {
      date: moment(new Date()).format(),
      jumlahTukik: 0,
      idInkubator: "",
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

  const serializeInkubator = (inkubator: Inkubator) => {
    return {
      ...inkubator,
      id: inkubator.id.toString(), // Convert BigInt to string
    };
  };

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await crerateInkubasiPenyu(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.inkubasi.all,
        massage: "Data Berhasil Ditambah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.inkubasi.all 
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
      const data = await updateInkubasiPenyu(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onUpdateSuccess({
        newData: data,
        params: queryKeys.inkubasi.all,
        massage: "Data Berhasil Dirubah",
        onOpenChange: onOpenChange,
      });
      location.reload();
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  useEffect(() => {
    if (DATAIN) {
      form.reset({
        jumlahTukik: DATAIN.JumlahTukik,
        date: moment(DATAIN.tanggalData).format(),
        idInkubator: DATAIN.idInkubator,
        idPenyu: DATAIN.idPenyu || "",
      });
    }
    if (DATATRACK) {
      form.reset({
        jumlahTukik: DATATRACK.telurMenetas || 0,
        date: moment(DATATRACK.tanggalData).format(),
        idPenyu: DATATRACK.idPenyu || "",
      });
    } else {
      form.reset();
    }
  }, [DATATRACK, DATAIN]);

  //*Submit data disini
  const onSubmit: SubmitHandler<TambahTukikInkubasiDOT> = (values) => {
    console.log("masuk");
  

      let DataInkubator:Inkubator = JSON.parse(values.idInkubator);
      // Convert string back to number if needed
      DataInkubator.id = BigInt(DataInkubator.id);
    
    
    const createDto: any = {
      idPenyu: values.idPenyu,
      date: moment(values.date).format(),
      jumlahTukik: values.jumlahTukik,
      idInkubator: DataInkubator?.idInkubator||undefined,
      idPenanggungJawab: UserData.Saveuser.idUser,
      tukikMati: DataInkubator?.tukikMati ?? 0,
      tukikHidup:
        values.jumlahTukik + (DataInkubator?.tukikHidup || 0) ||
        values.jumlahTukik,
    };
    // console.log(createDto);
    if (DATAIN) {
      updateMutation.mutate({ ...createDto, id: DATAIN.id });
    }
    if (DATATRACK) {
      createMutation.mutate({
        ...createDto,
        idData: DATATRACK.idDok,
        id: DATATRACK.id,
      });
    } else {
      createMutation.mutate(createDto as any);
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

        <FormField
          name="jumlahTukik"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Penyu Dirawat</FormLabel>
              <FormControl>
                <Input
                  disabled={DATATRACK ? true : false}
                  placeholder="Jumlah Telur Menetas "
                  {...field}
                />
              </FormControl>
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
                    field.value || DATATRACK?.idPenyu || DATAIN?.idPenyu || ""
                  }
                  disabled={DATATRACK ? true : false}
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

        <FormField
          control={form.control}
          name="idInkubator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempat Perawatan</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field?.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Silahkan Pilih Tempat Perawatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.isArray(INKUBATOR?.data) &&
                    INKUBATOR.data.map((value: Inkubator) => (
                      <SelectItem
                        key={value.id}
                        value={JSON.stringify(serializeInkubator(value))}
                      >
                        {value.namaInkubator}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

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
