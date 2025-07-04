"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useStatusUtils from "@/utils/status-toast.utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserLoginZod, UserLoginDOT } from "@/types";
import { Button } from "@/components/ui/button";
import { login } from "@/services/login/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { onCustomMessage } = useStatusUtils();
  const form = useForm<UserLoginDOT>({
    resolver: zodResolver(UserLoginZod),
    defaultValues: {
      userName: "",
    },
    mode: "onChange",
  });
  const LoginMutation = useMutation({
    mutationFn: async (dto: any) => await login(dto),
    onSuccess: () => {
      onCustomMessage({
        Message: "Berhasil masuk, Selamat Datang",
        tittle: "Berhasil",
        variant: "default",
      });
      router.push("/admin");
    },
    onError: () =>
      onCustomMessage({
        Message: "Gagal masuk, Silahkan coba lagi",
        tittle: "Gagal",
        variant: "destructive",
      }),
  });

  const onSubmit: SubmitHandler<UserLoginDOT> = (values) => {
    // console.log("masuk");

    const createDto: UserLoginDOT = {
      userName: values.userName,
      password: values.password,
    };
    // console.log(createDto);
    LoginMutation.mutate(createDto);
  };

  return (
    <Card className="mx-auto max-w-sm shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
      <CardHeader>
        <CardTitle className="text-2xl">Masuk</CardTitle>
        <CardDescription>
          Silahkan masukan Username dan Password dibawah
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4 mx-6">
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Silahkan mengisi Username..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Silahkan mengisi password.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting || LoginMutation.isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              Masuk
            </Button>
          </form>
        </Form>
        <div className="mt-5 0space-y-4 mx-6">
          <Link href={"/"}>
            <Button variant="outline" className="w-full">
              Kembali
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
