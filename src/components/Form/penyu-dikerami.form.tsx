"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { TelurDikerami as Dikerami } from "@/types";
import { DikeramiView } from "./view";
import { DeleteDikerami } from "./delete";
import { InputDikerami, InputMenetas } from "./input";
import { textDetail } from "@/env/description.mjs";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface PenyuDikeramiFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDelete?: boolean;
  onOpenChange: (value: boolean) => void;
  dataPenyuDikerami?: Dikerami | null;
  Track?: boolean;
  showTrackButton?: boolean;
}

const FormTelurDikerami: React.FC<PenyuDikeramiFormProps> = ({
  isOpen,
  onOpenChange,
  isDelete = false,
  dataPenyuDikerami,
  isOpenView = false,
  Track = false,
  showTrackButton = false,
}: PenyuDikeramiFormProps) => {
  const { penyuDikerami,penyuMenetas } = textDetail;
  const [showMenetas, setShowMenetas] = useState(false);

  useEffect(() => {
    // console.log({
    //   "isOpen : ":isOpen,
    //   "isOpenView: ": isOpenView,
    //   "isDelete : ":isDelete,
    //   "Data : ":dataPenyuDikerami,
    //   "Track : ":Track,
    //   "Bottom : ":showTrackButton,
    // })
    if (!isOpen) {
      setShowMenetas(false);
    }
  }, [isOpen]);

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setShowMenetas(false);
    }
    onOpenChange(value);
  };

  const handleShowMenetas = useCallback(() => {
    console.log(dataPenyuDikerami);
    setShowMenetas(true);
  }, [dataPenyuDikerami]);

  const getTitle = () => {
    if (showMenetas) return "Telur Menetas";
    if (isOpenView) return `Lihat ${penyuDikerami.tittle}`;
    if (Track && dataPenyuDikerami) return `Tambah ${penyuMenetas.tittle}`;
    if (dataPenyuDikerami) return `Rubah ${penyuDikerami.tittle}`;
    if (isDelete) return `Hapus ${penyuDikerami.tittle}`;
    return `Tambah ${penyuDikerami.tittle}`;
  };

  const getDescription = () => {
    if (showMenetas) return "Form input data telur yang menetas";
    return penyuDikerami.formDescription;
  };

  const renderContent = () => {
    // Tampilan form menetas jika showMenetas true
    if (showMenetas) {
      return (
        <InputMenetas
          DATATRACK={dataPenyuDikerami}
          onOpenChange={handleOpenChange}
        />
      );
    }

    // Mode view
    if (isOpenView) {
      return (
        <>
          <DikeramiView DATAIN={dataPenyuDikerami} />
          {showTrackButton && !dataPenyuDikerami?.menetas && (
            <div className="mt-4 w-full">
              <Button
                onClick={handleShowMenetas}
                variant="default"
                size="default"
                className="w-full"
              >
                Telur Menetas
              </Button>
            </div>
          )}
        </>
      );
    }

    // Mode delete
    if (isDelete) {
      return (
        <DeleteDikerami
          Id={Number(dataPenyuDikerami?.id)}
          onOpenChange={onOpenChange}
        />
      );
    }

    // Mode tracking
    if (dataPenyuDikerami && Track) {
      return (
        <InputMenetas
          DATATRACK={dataPenyuDikerami}
          onOpenChange={onOpenChange}
        />
      );
    }

    // Default input form
    return (
      <InputDikerami 
        DATAIN={dataPenyuDikerami} 
        onOpenChange={onOpenChange} 
      />
    );
  };

  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={handleOpenChange}
      tittle={getTitle()}
      Descripton={getDescription()}
    >
      {renderContent()}
    </PopUpCustomForm>
  );
};

export default FormTelurDikerami;