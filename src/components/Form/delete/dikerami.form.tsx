"use client";

import { Button } from "@/components/ui/button";
import useStatusUtils from "@/utils/status-toast.utils";
import { deleteTelurDikerami } from "@/services/dikerami";
import { useMutation } from "@tanstack/react-query";

export function DeleteDikerami({
  Id,
  onOpenChange,
}: {
  Id: number;
  onOpenChange: (value: boolean) => void;
}) {
  const { onDeleteSuccess, onRequestError } = useStatusUtils();
  const deletedMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteTelurDikerami(id);
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
