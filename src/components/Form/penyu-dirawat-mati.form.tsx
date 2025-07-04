"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { TukikMati, Inkubator } from "@/types";
import { matiView as ViewMati } from "@/components/Form/view";
import { InputMati } from "@/components/Form/input";
import { DeleteTukikMati } from "@/components/Form/delete";
import { textDetail } from "@/env/description.mjs";

//*Disini property dari props

interface TukikMenetasFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  onOpenChange: (value: boolean) => void;
  MatiDirawat?: TukikMati | null | undefined;
  isDelete?: boolean;
  dataInkubator?: Inkubator | null | undefined;
}

const PenyuMatiDirawatForm: React.FC<TukikMenetasFormProps> = ({
  isOpen,
  onOpenChange,
  MatiDirawat = undefined,
  dataInkubator = undefined,
  isOpenView = false,
  isDelete = false,
}: TukikMenetasFormProps) => {
  const { penyuMati } = textDetail;
  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      // isLoading={isLoading}
      tittle={
        isOpenView
          ? `Lihat ${penyuMati.tittle}`
          : MatiDirawat
          ? `Rubah ${penyuMati.tittle}`
          : isDelete
          ? `Hapus ${penyuMati.tittle}`
          : `Tambah ${penyuMati.tittle}`
      }
      Descripton={penyuMati.formDescription}
    >
      {isOpenView ? (
        <ViewMati dataPenyu={MatiDirawat as any} />
      ) : isDelete && MatiDirawat ? (
        <DeleteTukikMati onOpenChange={onOpenChange} Id={MatiDirawat.id} />
      ) : dataInkubator ? (
        <InputMati onOpenChange={onOpenChange} DATATRACK={dataInkubator} />
      ) : (
        <InputMati onOpenChange={onOpenChange} DATAIN={MatiDirawat} />
      )}
    </PopUpCustomForm>
  );
};

export default PenyuMatiDirawatForm;
