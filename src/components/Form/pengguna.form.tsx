"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { User } from "@/types";
import { PenggunaView } from "@/components/Form/view";
import { InputPengguna } from "@/components/Form/input";
import { textDetail } from "@/env/description.mjs";

interface PenggunaProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDelete?: boolean;
  onOpenChange: (value: boolean) => void;
  dataPengguna: User | undefined | null;
}

const PenggunaForm: React.FC<PenggunaProps> = ({
  isOpen,
  onOpenChange,
  isDelete = false,
  dataPengguna,
  isOpenView = false,
}: PenggunaProps) => {
  const { pengguna } = textDetail;
  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      // isLoading={isLoading}
      tittle={
        isOpenView
          ? `Lihat ${pengguna.tittle}`
          : dataPengguna
          ? `Rubah ${pengguna.tittle}`
          : isDelete
          ? `Hapus ${pengguna.tittle}`
          : `Tambah ${pengguna.tittle}`
      }
      Descripton={pengguna.formDescription}
    >
      {isOpenView ? (
        <PenggunaView Pengguna={dataPengguna as User} />
      ) : isDelete ? (
        "Sementara Tidak Bisa Menghapus"
      ) : dataPengguna ? (
        <InputPengguna DATAIN={dataPengguna} onOpenChange={onOpenChange} />
      ) : (
        <InputPengguna onOpenChange={onOpenChange} />
      )}
    </PopUpCustomForm>
  );
};

export default PenggunaForm;
