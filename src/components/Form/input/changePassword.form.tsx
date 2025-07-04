'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import useStatusUtils from "@/utils/status-toast.utils";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordZod, changePassword } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { changePassword as ChangePasswordFunc } from "@/services/login/auth";

export function ChangePassword() {
  const router = useRouter();
  const { onCustomMessage } = useStatusUtils();


  const form = useForm<changePassword>({
    resolver: zodResolver(ChangePasswordZod),
    defaultValues: {
      password: "",
      anotherPassword: "",
    },
    mode: "onChange",
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (dto: any) => {
      const data = await ChangePasswordFunc(dto);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      onCustomMessage({
        Message: "Berhasil Mengganti Password",
        tittle: "Berhasil",
        variant: "default",
      });
      router.refresh();
    },
    onError: (error, variables, context) => {
      onCustomMessage({
        Message: "Gagal Mengganti Password",
        tittle: "Gagal",
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<changePassword> = (values) => {
    // console.log("masuk");

    const createDto: changePassword = {
      anotherPassword: values.anotherPassword,
      password: values.password,
    };
    changePasswordMutation.mutate(createDto);
  };
  return (
    <div className="max-h-screen overflow-y-auto">
      <Form {...form}>
        <form className="space-y-4 mx-6">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ini rahasia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="anotherPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulangi Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ini rahasia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={
              form.formState.isSubmitting || changePasswordMutation.isPending
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            Masuk
          </Button>
        </form>
      </Form>
    </div>
  );
}
