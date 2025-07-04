"use client";

import { useState, useCallback } from "react";
import { User } from "@/types";
import { PenggunaView } from "@/components/Form/view";
import { Button } from "@/components/ui/button";
import { InputPenggunaSendiri } from "@/components/Form/input";
import { ChevronLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useStatusUtils from "@/utils/status-toast.utils";
import { useRouter } from "next/navigation";
import { logout } from "@/services/login/auth";

export default function DetailPengguna({ Pengguna }: { Pengguna: User }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const { onCustomMessage } = useStatusUtils();
  const LogoutMutation = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      onCustomMessage({
        Message: "Anda sekarang keluar aplikasi, Selamat Jalan",
        tittle: "Berhasil Logout",
        variant: "default",
      });
      router.push("/login");
    },
    onError: (error, variables, context) => {
      onCustomMessage({
        Message: "Ada kesalahan dalam aplikasi, silahkan coba lagi",
        tittle: "Gagal Logout",
        variant: "destructive",
      });
    },
  });

  return (
    <section>
      {edit && (
        <div
          onClick={() => setEdit(!edit)}
          className="flex cursor-pointer gap-2 items-center my-[3%] font-bold text-lg"
        >
          <ChevronLeft className="h-5 w-5" /> Kembali
        </div>
      )}
      {edit ? (
        <InputPenggunaSendiri DATAIN={Pengguna} />
      ) : (
        <PenggunaView Pengguna={Pengguna} />
      )}

      {!edit && (
        <>
        <Button
          variant="outline"
          className="w-full mt-20 "
          onClick={() => setEdit(!edit)}
          >
          {edit ? "Kembali" : "Rubah Data"}
        </Button>
        <Button
          variant="destructive"
          className="w-full mt-[2%] "
          onClick={()=>LogoutMutation.mutate()}
          >
          Keluar
        </Button>
          </>
      )}
    </section>
  );
}
