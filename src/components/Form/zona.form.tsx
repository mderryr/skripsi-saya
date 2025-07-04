"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import {Zona } from "@/types";
import { ZonaView } from "@/components/Form/view";
// import {  } from "@/components/Form/delete";
import {InputZOna as InputZona} from '@/components/Form/input'

interface ZonaFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDelete?: boolean;
  onOpenChange: (value: boolean) => void;
  dataZona:
  Zona
    | undefined
    | null;
}

const PelepasanForm:React.FC<ZonaFormProps> = ({
  isOpen,
  onOpenChange,
  isDelete = false,
  dataZona,
  isOpenView = false,
}: ZonaFormProps) => {
  //* Disini component di buat

  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      // isLoading={isLoading}
      tittle={
        isOpenView
          ? "Lihat Data Zona Naik"
          : dataZona
          ? "Rubah Data Zona Naik"
          : "Tambah Data Zona Naik"
      }
      Descripton={
        isOpenView
          ? "Lihat Data Zona Naik"
          : dataZona
          ? "Merubah data Zona naik "
          : "Menambahkan data Zona naik"
      }
    >
      {isOpenView ? (
        <ZonaView DataZona={dataZona as any} />
      ) : isDelete ? (
        "Tidak bisa menghapus Data"
      ) : dataZona ? (
        <InputZona
          DATAIN={dataZona}
          onOpenChange={onOpenChange}
        />
      ) : (
        <InputZona 
          onOpenChange={onOpenChange}
        />
      )}
    </PopUpCustomForm>
  );
};

export default PelepasanForm;
