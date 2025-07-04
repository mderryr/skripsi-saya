'use client'

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { TambahReportBulananZod, TambahReportBulananDOT } from '@/types'
import { MonthSelect, YearSelect } from '@/components/another/select-custom-yearMonth.component'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStatusUtils from "@/utils/status-toast.utils";
import { queryKeys } from "@/services/queryKey.factory";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createReportMonth } from '@/services/report'
import { Button } from "@/components/ui/button";

export function InputReportMonth({
  onOpenChange
}: {
  onOpenChange: (value: boolean) => void;
}) {
  const { onCreateSuccess, onRequestError } = useStatusUtils();
  const queryClient = useQueryClient();

  const form = useForm<TambahReportBulananDOT>({
    resolver: zodResolver(TambahReportBulananZod),
    defaultValues: {
      bulan: new Date().getMonth() + 1,
      tahun: new Date().getFullYear(),
    },
    mode: "onChange",
  });

  const createMutation = useMutation({
    mutationFn: async (data: TambahReportBulananDOT) => {
      const { bulan, tahun } = data;
      const result = await createReportMonth(bulan, tahun);
      return result;
    },
    onSuccess: (data) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.tahunan.all,
        massage: "Data Berhasil Diubah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.bulanan.all 
      });
    },
    onError: (error) => {
      onRequestError({
        onOpenChange,
      });
    },
  });

  const handleSubmit = (data: TambahReportBulananDOT) => {
    // Panggil mutation dengan data form
    // console.log(data)
    createMutation.mutate(data);
  };

  return (
    <div className="max-h-screen overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mx-6">
         
            <FormField
              control={form.control}
              name="bulan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bulan</FormLabel>
                  <FormControl>
                    <MonthSelect

                      selectedMonth={field.value}
                      onMonthChange={(month) => field.onChange(month)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              className="w-full"
          >
            {createMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}