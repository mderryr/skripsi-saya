'use client'

import { Button } from "@/components/ui/button";
import { queryKeys } from "@/services/queryKey.factory";
import { Zona, ZonaZod, ZonaDOT } from "@/types";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {createZona,updateZona} from '@/services/zona'

export function InputZOna({
  DATAIN,
  onOpenChange,
}: {
  DATAIN?: Zona|null|undefined;
  onOpenChange: (value: boolean) => void;
}) {
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const queryClient = useQueryClient();

  const form = useForm<ZonaDOT>({
    resolver: zodResolver(ZonaZod),
    defaultValues: {
        nama: "",
        keterangan: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (DATAIN) {
      form.reset({
        nama: DATAIN.nama,
        keterangan: DATAIN.keterangan||"",
      });
    } else {
      form.reset();
    }
  }, []);

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await createZona(dto);
      return data; // Return the data directly
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.zona.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.zona.all 
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
      const data = await updateZona(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onUpdateSuccess({
        newData: data,
        params: queryKeys.zona.all,
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

  const onSubmit: SubmitHandler<ZonaDOT> = (
    values: ZonaDOT
  ) => {
    const createDto: ZonaDOT = {
        nama: values.nama,
        keterangan: values.keterangan ,
    };

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
          name="nama"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Zona</FormLabel>
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
