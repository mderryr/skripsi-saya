'use client'

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { TambahReportTahunanZod, TambahReportTahunanDOT } from '@/types'
import {  YearSelect } from '@/components/another/select-custom-yearMonth.component'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStatusUtils from "@/utils/status-toast.utils";
import {createReportYear} from '@/services/report'
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/services/queryKey.factory";

export function InputReportYears({
  onOpenChange
}:{
  onOpenChange: (value: boolean) => void;
}) {
  const { onCreateSuccess, onRequestError } = useStatusUtils();
  const queryClient = useQueryClient();
  const form = useForm<TambahReportTahunanDOT>({
    resolver: zodResolver(TambahReportTahunanZod),
    defaultValues: {
      tahun: new Date().getFullYear(),
    },
    mode: "onChange",
  });

  const createMutation = useMutation({
    mutationFn: async (dto: TambahReportTahunanDOT["tahun"]) => {
      const data = await createReportYear(dto);
      return data; // Return the data directly
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.tahunan.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.tahunan.all 
      });
    },
    onError: (error, variables, context) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const handleSubmit = (data: TambahReportTahunanDOT) => {
    createMutation.mutate(data.tahun);
    // console.log(data);
  };

  return (
    <div className="max-h-screen overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="tahun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun</FormLabel>
                  <FormControl>
                    <YearSelect
                      selectedYear={field.value}
                      onYearChange={(year) => field.onChange(year)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button 
            type="submit" 
            disabled={createMutation.isPending}
            className="w-full" >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}