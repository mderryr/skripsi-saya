'use client'

import { Button } from "@/components/ui/button";
import { createInkubator, updateInkubator } from "@/services/inkubator";
import { useToast } from "@/components/ui/use-toast";
import { queryKeys } from "@/services/queryKey.factory";
import { Inkubator, TambahInkubatorZod, TambahInkubatorDOT } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useStatusUtils from "@/utils/status-toast.utils";

export function InkubatorInput({
  DATAIN,
  onOpenChange,
}: {
  DATAIN?: Inkubator|null|undefined;
  onOpenChange: (value: boolean) => void;
}) {
  const { onCreateSuccess, onUpdateSuccess, onRequestError,onCustomMessage } = useStatusUtils();
  const queryClient = useQueryClient();
  const form = useForm<TambahInkubatorDOT>({
    resolver: zodResolver(TambahInkubatorZod),
    defaultValues: {
      namaInkubator: "",
      keterangan: "",
      berfungsi: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (DATAIN) {
      form.reset({
        namaInkubator:DATAIN.namaInkubator,
        berfungsi:DATAIN.berfungsi,
        keterangan:DATAIN?.keterangan||""
      });
    } else {
      form.reset();
    }
  }, []);

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await 1111;
      return data; // Return the data directly
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.inkubator.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.inkubator.all 
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
      const data = await 111;
      return data;
    },
    onSuccess: (data, variables, context) => {
      onUpdateSuccess({
        newData: data,
        params: queryKeys.inkubasi.all,
        massage: "Data Berhasil Dirubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.inkubator.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const onSubmit: SubmitHandler<TambahInkubatorDOT> = (
    values: TambahInkubatorDOT
  ) => {
    const createDto: TambahInkubatorDOT = {
        namaInkubator: values.namaInkubator,
        berfungsi:values.berfungsi ,
        keterangan: values.keterangan ,
    };
    if(DATAIN?.tukikAda){
      form.setError('berfungsi', { type: 'custom', message: 'Inkubator Sedang Digunakan' });
      onCustomMessage({
        Message:"Tempat Perawatan sedang digunakan",
        tittle:"sedang digunakan",
        variant:"destructive"
      })
    }
    if (!DATAIN) {
      createMutation.mutate(createDto as any);
    } else {
      updateMutation.mutate({ ...createDto, idData: DATAIN.id });
      
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 mx-6">
        <FormField
          name="namaInkubator"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Inkubator</FormLabel>
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
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Input placeholder="Jumlah tukik dilepas " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="berfungsi"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sedang Berfungsi</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={DATAIN?.tukikAda}
                />
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
