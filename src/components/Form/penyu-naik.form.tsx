"use client";

import PopUpCustomForm from "@/components/another/custom-popup.component";
import { PenyuNaik } from "@/types";
import { DeleteNaik } from "./delete";
import { NaikView } from "./view";
import { InputNaik, InputDikerami } from "./input";
import { textDetail } from "@/env/description.mjs";
import { Button } from "@/components/ui/button";
import { useCallback, useState, useEffect } from "react";

interface PenyuNaikFormProps {
  isOpen: boolean;
  isOpenView?: boolean;
  isDelete?: boolean;
  onOpenChange: (value: boolean) => void;
  dataPenyuNaik?: PenyuNaik | null;
  Track?: boolean;
  showTrackButton?: boolean;
}

const PenyuNaikForm: React.FC<PenyuNaikFormProps> = ({
  isOpen,
  onOpenChange,
  isDelete = false,
  dataPenyuNaik,
  isOpenView = false,
  Track = false,
  showTrackButton = false,
}) => {
  const { penyuNaik, penyuDikerami } = textDetail;
  const [showDikerami, setShowDikerami] = useState(false);

  const handleShowDikerami = useCallback(() => {
    setShowDikerami(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setShowDikerami(false);
    }
  }, [isOpen])

  const getTitle = () => {
    if (showDikerami) return penyuDikerami.tittle
    if (isOpenView) return `Lihat ${penyuNaik.tittle}`;
    if (Track && dataPenyuNaik) return penyuDikerami.tittle;
    if (dataPenyuNaik) return `Edit ${penyuNaik.tittle}`;
    if (isDelete) return `Hapus ${penyuNaik.tittle}`;
    return penyuNaik.tittle;
  };


  const getDescription = () => {
    if (showDikerami) return penyuDikerami.formDescription;
    if(Track && dataPenyuNaik) penyuDikerami.formDescription;
    if (isDelete || isOpenView || dataPenyuNaik) return penyuNaik.description;

    return penyuNaik.formDescription;
  };

  const RenderContent = () => {
    // Tampilkan form dikerami jika showDikerami true
    if (showDikerami) {
      console.log("yang jalan di show dikerami")
      return (
        <InputDikerami
          DATATRACK={dataPenyuNaik}
          onOpenChange={onOpenChange}
        />
      );
    }

    // Mode view
    if (isOpenView) {
      console.log("yang jalan di show view")

      return (
        <>
          <NaikView DataPenyu={dataPenyuNaik} />
          {showTrackButton && (
            <div className="mt-4 w-full">
              <Button
                onClick={handleShowDikerami}
                variant="default"
                size="default"
                className="w-full"
              >
                Telur Diinkubasi
              </Button>
            </div>
          )}
        </>
      );
    }

    // Mode delete
    if (isDelete) {
      console.log("yang jalan di delete")

      return (
        <DeleteNaik
          Id={dataPenyuNaik?.id as any}
          onOpenChange={onOpenChange}
        />
      );
    }

    // Mode tracking
    if (Track && dataPenyuNaik && dataPenyuNaik) {
      console.log("yang jalan di show dikerami 2 ")
      return (
        <InputDikerami
          DATATRACK={dataPenyuNaik}
          onOpenChange={onOpenChange}
        />
      );
    }

    // Default input form
    return (
      <InputNaik
        Track={Track}
        DATAIN={dataPenyuNaik}
        onOpenChange={onOpenChange}
      />
    );
  };

  return (
    <PopUpCustomForm
      open={isOpen}
      setOpen={onOpenChange}
      tittle={getTitle()}
      Descripton={getDescription()}
    >
      {RenderContent()}
    </PopUpCustomForm>
  );
};

export default PenyuNaikForm;