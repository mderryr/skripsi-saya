"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { Inkubasi,Inkubator } from "@/types";
import { InputDiinkubasi } from "@/components/Form/input";
import { DeleteInkubasi } from "@/components/Form/delete";
import { inkubasiView as InkubasiView } from "@/components/Form/view";
import { textDetail } from "@/env/description.mjs";

interface TukikMenetasFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDeleted?: boolean;
  onOpenChange: (value: boolean) => void;
  Dirawat: Inkubasi&{Inkubasi:Inkubator} | null;
}

const PenyuDirawat: React.FC<TukikMenetasFormProps> = ({
  isOpen,
  onOpenChange,
  Dirawat,
  isOpenView = false,
  isDeleted = false,
}: TukikMenetasFormProps) => {
  const {penyuDiinkubasi} = textDetail
  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      tittle={
        isOpenView
          ? `Lihat ${penyuDiinkubasi.tittle}`
          : Dirawat
          ?  `Rubah ${penyuDiinkubasi.tittle}` 
          : `Tambah ${penyuDiinkubasi.tittle}`
      }
      Descripton={
        penyuDiinkubasi.formDescription
      }
    >
      {isOpenView ? (
        <InkubasiView DATAIN={Dirawat} />
      ) : isDeleted ? (
        <DeleteInkubasi onOpenChange={onOpenChange} Id={Number(Dirawat?.id)} />
      ) : Dirawat ? (
        <InputDiinkubasi DATAIN={Dirawat} onOpenChange={onOpenChange} />
      ) : (
        <InputDiinkubasi onOpenChange={onOpenChange} />
      )}
    </PopUpCustomForm>
  );
};

export default PenyuDirawat;
