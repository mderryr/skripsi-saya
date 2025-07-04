"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { Inkubator } from "@/types";
import { InkubatorView } from "@/components/Form/view";
import { InkubatorInput } from "@/components/Form/input";
import {textDetail} from '@/env/description.mjs'

//*Disini property dari props
interface InkubatorFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDelete?: boolean;
  onOpenChange: (value: boolean) => void;
  dataInkubator: Inkubator | null | undefined;
}

const InkubatorForm:React.FC<InkubatorFormProps> = ({
  isOpen,
  onOpenChange,
  dataInkubator,
  isOpenView = false,
  isDelete = false,
}: InkubatorFormProps) => {
  const {inkubator} = textDetail
  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      tittle={
        isOpenView
          ? inkubator.tittle
          : dataInkubator
          ? inkubator.tittle
          : inkubator.tittle
      }
      Descripton={
        isOpenView
          ? inkubator.formDescription
          : dataInkubator
          ? inkubator.description
          : inkubator.formDescription
      }
    >
      {isOpenView ? (
        <InkubatorView dataPenyu={dataInkubator} />
      ) : isDelete ? (
        "Data belum bisa dihapus"
      ) :dataInkubator? (
        <InkubatorInput onOpenChange={onOpenChange} DATAIN={dataInkubator} />
      ): <InkubatorInput onOpenChange={onOpenChange}  />
      }
    </PopUpCustomForm>
  );
};

export default InkubatorForm;
