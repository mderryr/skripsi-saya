'use client'

import { Button } from "@/components/ui/button";
import useStatusUtils from "@/utils/status-toast.utils";
import { deleteTukikPelepasan } from "@/services/dilepas";
import { useMutation } from "@tanstack/react-query";

export function DeleteDilepas({
    Id,
    onOpenChange,
  }: {
    Id: number;
    onOpenChange: (value: boolean) => void;
  }){
    const { onDeleteSuccess, onRequestError } = useStatusUtils();
    const deletedMutation = useMutation({
      mutationFn: async (id: number) => {
        await deleteTukikPelepasan(id);
      },
      onSuccess:()=> onDeleteSuccess({
          massage:"Data Selesai Dihapus",
          onOpenChange:onOpenChange
      }),
      onError: ()=>onRequestError({
          onOpenChange
      }),
    });
  
    return (
      <Button
        className="w-full"
        type="submit"
        variant="destructive"
        disabled={deletedMutation.isPending}
        onClick={() => {
          deletedMutation.mutate(Id);
          location.reload();
        }}
      >
        Hapus
      </Button>
    );
}