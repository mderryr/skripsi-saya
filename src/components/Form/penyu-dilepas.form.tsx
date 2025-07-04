"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { Pelepasan, Inkubator } from "@/types";
import { ViewDilepas } from "@/components/Form/view";
import { DeleteDilepas } from "@/components/Form/delete";
import { InputDilepas } from "@/components/Form/input";
import { textDetail } from "@/env/description.mjs";

interface PelepasanFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDelete?: boolean;
  onOpenChange: (value: boolean) => void;
  dataPelepasan:
    | (Pelepasan & {
        inkubator: Inkubator;
      })
    | Inkubator
    | undefined
    | null;
  Track?: boolean;
}

const PelepasanForm: React.FC<PelepasanFormProps> = ({
  isOpen,
  onOpenChange,
  isDelete = false,
  dataPelepasan,
  isOpenView = false,
  Track = false,
}: PelepasanFormProps) => {
  //* Disini component di buat
  const { penyuDilepas } = textDetail;
  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      // isLoading={isLoading}
      tittle={
        isOpenView
          ? `Lihat ${penyuDilepas.tittle}`
          : Track
          ? `Tambah ${penyuDilepas.tittle}`
          : dataPelepasan
          ? `Rubah ${penyuDilepas.tittle}`
          : isDelete
          ? `Hapus ${penyuDilepas.tittle}`
          : `Tambah ${penyuDilepas.tittle}`
      }
      Descripton={
        penyuDilepas.formDescription
      }
    >
      {isOpenView ? (
        <ViewDilepas dataPenyu={dataPelepasan as any} />
      ) : isDelete ? (
        <DeleteDilepas
          Id={dataPelepasan?.id as any}
          onOpenChange={onOpenChange}
        />
      ) : Track && dataPelepasan ? (
        <InputDilepas
          DATATRACK={dataPelepasan as Inkubator}
          onOpenChange={onOpenChange}
        />
      ) : (
        <InputDilepas
          DATAIN={dataPelepasan as any}
          onOpenChange={onOpenChange}
        />
      )}
    </PopUpCustomForm>
  );
};

export default PelepasanForm;
