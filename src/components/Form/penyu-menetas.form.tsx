"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { TelurMenetas } from "@/types";
import { MenetasView } from "@/components/Form/view";
import { InputMenetas, InputDiinkubasi } from "@/components/Form/input";
import { textDetail } from "@/env/description.mjs";
import { DeleteMenetas } from "@/components/Form/delete";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";

interface TukikMenetasFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDeleted?: boolean;
  onOpenChange: (value: boolean) => void;
  dataTelurMenetas: TelurMenetas | null;
  Track?: boolean;
  showTrackButton?: boolean;
}

const PenyuMenetasForm: React.FC<TukikMenetasFormProps> = ({
  isOpen,
  onOpenChange,
  dataTelurMenetas,
  isOpenView = false,
  isDeleted = false,
  Track = false,
  showTrackButton = false,
}: TukikMenetasFormProps) => {
  const { penyuMenetas, penyuDiinkubasi } = textDetail;
  const [showMenetas, setShowMenetas] = useState(false);

  useEffect(() => {
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
    setShowMenetas(true);
  }, []);

  const getTitle = () => {
    if (isOpenView) return `Lihat ${penyuMenetas.tittle}`;
    if (Track && dataTelurMenetas) return `Tambah ${penyuDiinkubasi.tittle}`;
    if (dataTelurMenetas) return `Rubah ${penyuMenetas.tittle}`;
    return `Tambah ${penyuMenetas.tittle}`;
  };

  const renderContent = () => {
    if (showMenetas) {
      return (
        <InputDiinkubasi
          DATATRACK={dataTelurMenetas}
          onOpenChange={handleOpenChange}
        />
      );
    }

    if (isOpenView) {
      return (
        <>
          <MenetasView DataPenyu={dataTelurMenetas} />
          {showTrackButton && (
            <div className="mt-4 w-full">
              <Button
                onClick={handleShowMenetas}
                variant="default"
                size="default"
                className="w-full"
              >
                Tukik Dirawat
              </Button>
            </div>
          )}
        </>
      );
    }

    if (isDeleted && dataTelurMenetas) {
      return (
        <DeleteMenetas
          Id={dataTelurMenetas.id as any}
          onOpenChange={handleOpenChange}
        />
      );
    }

    if (Track && dataTelurMenetas) {
      return (
        <InputDiinkubasi
          DATATRACK={dataTelurMenetas}
          onOpenChange={handleOpenChange}
        />
      );
    }

    return (
      <InputMenetas 
        DATAIN={dataTelurMenetas} 
        onOpenChange={handleOpenChange} 
      />
    );
  };

  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={handleOpenChange}
      tittle={getTitle()}
      Descripton={Track ? penyuDiinkubasi.formDescription : penyuMenetas.formDescription}
    >
      {renderContent()}
    </PopUpCustomForm>
  );
};

export default PenyuMenetasForm;