'use client';

import { useEffect, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserZod, UserDOT, User } from "@/types";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useStatusUtils from "@/utils/status-toast.utils";
import { queryKeys } from "@/services/queryKey.factory";
import { UpdateUser, createNewUser } from "@/services/user";
import { D } from "node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o";

interface FormUpdatePengguna {
  DATAIN?: User | undefined | null;
  onOpenChange: (value: boolean) => void;
}
export function InputPengguna({ DATAIN = undefined, onOpenChange }: FormUpdatePengguna) {
  const [isPending, startTransition] = useTransition();
  const { onCreateSuccess, onUpdateSuccess, onRequestError } = useStatusUtils();
  const queryClient = useQueryClient();

  const form = useForm<UserDOT>({
    resolver: zodResolver(UserZod),
    defaultValues: {
      nomerTelp: "",
      username: "",
      name: "",
      password: "",
      admin: true,
      idTempat: "PL-0001"
    },
    mode: "onChange",
  });

  // console.log(form.formState.errors);

  useEffect(() => {
    if (DATAIN) {
      form.reset({
        nomerTelp: DATAIN?.nomerTelp ?? "",
        username: DATAIN.username,
        name: DATAIN.name,
        password: DATAIN.password,
        admin: DATAIN.admin || true,
        idTempat: DATAIN.idTempat || "PL-0001"
      });
    } else form.reset({
      // Default values
      idTempat: "PL-0001",
    });
  }, []);

  const createMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await createNewUser(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onCreateSuccess({
        newData: data,
        params: queryKeys.users.all,
        massage: "Data Berhasil Ditambah",
        onOpenChange: onOpenChange,
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.users.all 
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
      const data = await UpdateUser(dto);
      return data;
    },
    onSuccess: (data, variables, context) => {
      onUpdateSuccess({
        newData: data,
        params: queryKeys.users.all,
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

  const onSubmit: SubmitHandler<UserDOT> = (values) => {
    // console.log("Form submitted with values:", values);

    const createDto: UserDOT & { id?: string } = {
      nomerTelp: values?.nomerTelp ?? "",
      username: values?.username,
      name: values.name,
      password: values?.password,
      admin: values.admin || true,
      id: DATAIN?.idUser || "",
      idTempat: DATAIN?.idTempat || "PL-0001",
    };

    if (!DATAIN) {
      createMutation.mutate(createDto as any);
    } else {
      updateMutation.mutate({ ...createDto, idData: DATAIN.id });
    }

  };

  return (
    <div className="max-h-screen overflow-y-auto">

      <Form {...form}>
        <form

          className="space-y-4 mx-6">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input
                    disabled={DATAIN ? true : false}
                    placeholder="Silahkan Update username ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="idTempat"
            control={form.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input
                    type="hidden"
                    value="PL-0001"
                    onChange={() => onChange("PL-0001")}
                    {...rest}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Silahkan Update Nama ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="nomerTelp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomer Telephone (whatsapp)</FormLabel>
                <FormControl>
                  <Input
                    disabled={DATAIN ? true : false}
                    placeholder="08xxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!DATAIN && (
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={DATAIN ? true : false}
                      placeholder="Ini rahasia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}


          <FormField
            control={form.control}
            name="admin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Hak Akses</FormLabel>
                  <FormDescription>
                    Berikan Hak Ini untuk mengupdate Team
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

          <Button
            className="w-full"
            type="submit"
            disabled={isPending || form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {DATAIN ? "Rubah Data" : "Tambah Anggota"}
          </Button>
        </form>
      </Form>

    </div>
  );
}
