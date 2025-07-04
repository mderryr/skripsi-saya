import * as React from "react";

import { useMediaQuery } from "@/utils/mediaquery-hook";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LoadingSkeleton from "@/components/another/skeleton-loading";

interface PopUpCustomFormProps {
  children: React.ReactNode ;
  open: boolean;
  setOpen:(value: boolean) => void;
  tittle: string;
  Descripton: string;
  isLoading?:boolean
}

export default function PopUpCustomForm({
  children,
  open,
  setOpen,
  tittle,
  Descripton,
  isLoading=false
}: PopUpCustomFormProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // console.log("Berjalan")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tittle}</DialogTitle>
            <DialogDescription>
             {Descripton}
            </DialogDescription>
          </DialogHeader>
          {isLoading?<LoadingSkeleton />:children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{tittle}</DrawerTitle>
          <DrawerDescription>
            {Descripton}
          </DrawerDescription>
        </DrawerHeader>
        {isLoading?<LoadingSkeleton />:children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

