import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface status {
  newData: any;
  params: any;
  massage: string;
  onOpenChange: (value: boolean) => void;
}

const useStatusUtils = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const onCreateSuccess = async ({
    newData,
    params,
    massage,
    onOpenChange,
  }: status) => {
    // console.log("Jalan - 1")
    await queryClient.setQueryData(params, (oldData?: any) => {
      // console.log(oldData)
      if (oldData) {
        return [newData, ...oldData.data];
      }
      // console.log("Jalan - 3")
      return [newData];
    });
    toast({
      description: massage,
    });
    onOpenChange(false);
  };

  const onUpdateSuccess = async ({
    newData,
    params,
    massage,
    onOpenChange,
  }: status) => {
    await queryClient.setQueryData(params, (oldData?: any) => {
      if (oldData.data) {
        return oldData.data.map((values: any) =>
          values.id === newData.id ? newData : values
        );
      }
      return [newData];
    });
    toast({
      description: massage,
    });
    onOpenChange(false);
  };

  const onDeleteSuccess = ({
    massage,
    onOpenChange,
  }: {
    massage: string;
    onOpenChange: (value: boolean) => void;
  }) => {
    toast({
      description: massage,
    });
    onOpenChange(false);
  };

  const onRequestError = ({
    onOpenChange,
  }: {
    onOpenChange: (value: boolean) => void;
  }) => {
    // console.log("Jalan 5")
    toast({
      variant: "destructive",
      title: "Ada yang salah",
      description: "Ada masalah, silahkan coba lagi",
    });
    onOpenChange(false);
  };

  const onCustomMessage = ({
    Message,
    tittle,
    variant,
  }: {
    Message: string;
    tittle: string;
    variant: "default" | "destructive" | null | undefined;
   
  }) => {
    toast({
      variant: variant,
      title: tittle,
      description: Message,
    });
  };

  return {
    onCreateSuccess,
    onUpdateSuccess,
    onDeleteSuccess,
    onRequestError,
    onCustomMessage,
  };
};

export default useStatusUtils;
