"use client";

import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserZod, UpdateUserDOT, User } from "@/types";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useStatusUtils from "@/utils/status-toast.utils";
import { UpdateUser } from "@/services/user";
import { useRouter } from "next/navigation";

interface FormUpdatePengguna {
  DATAIN: User;
}
export function InputPenggunaSendiri({ DATAIN }: FormUpdatePengguna) {
  const router = useRouter();

  const { onCustomMessage } = useStatusUtils();
  const form = useForm<UpdateUserDOT>({
    resolver: zodResolver(UpdateUserZod),
    defaultValues: {
      nomerTelp: "08",
      username: "",
      name: "",
    },
    mode: "onChange",
  });

  // const { data: UserData } = useQuery({
  //   queryKey: queryKeys.user.all,
  //   queryFn: () => getSession(),
  // });

  const updateMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await UpdateUser(dto);
    },
    onSuccess: () => {
      onCustomMessage({
        Message: "Data Pribadi berhasil dirubah",
        tittle: "Edit Sukses",
        variant: "default",
      });
      router.refresh();
    },
    onError: () =>
      onCustomMessage({
        Message: "Data Pribadi berhasil dirubah",
        tittle: "Edit Gagal",
        variant: "default",
      }),
  });

  useEffect(() => {
    form.reset({
      nomerTelp: DATAIN.nomerTelp ?? "",
      username: DATAIN.username,
      name: DATAIN.name,
    });
  }, []);

  const onSubmit: SubmitHandler<UpdateUserDOT> = (values: UpdateUserDOT) => {
    const createDto: UpdateUserDOT & { id: string } = {
      nomerTelp: values.nomerTelp,
      username: values.username,
      name: values.name,
      id: DATAIN?.idUser,
    };
    // console.log(createDto);

    updateMutation.mutate(createDto);
  };
  return (
    <div className="max-h-screen overflow-y-auto">
      <Form {...form}>
        <form className="space-y-4 mx-6">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Silahkan Update username ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="08xxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting || updateMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {DATAIN ? "Rubah Data" : "Tambah Data"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
