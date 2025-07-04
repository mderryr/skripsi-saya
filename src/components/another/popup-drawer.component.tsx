'use client'

import * as React from "react"

import { cn } from "@/utils/cn-tools"
import {useMediaQuery} from '@/utils/mediaquery-hook'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export default function DrawerDialog(
  { children,onHandleChange,Description,Tittle, open, setOpen}: 
  { 
    onHandleChange:React.FormEventHandler<HTMLFormElement> | undefined
    Description?:string,
    Tittle?: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,

  }
) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{Tittle ||"Input Data"}</DialogTitle>
            <DialogDescription>
            {Description || "Silahkan Masukkan Data Dibawah ini"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onHandleChange} className={cn("grid items-start gap-4")}>
            {children}
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{Tittle ||"Input Data"}</DrawerTitle>
          <DrawerDescription>
          {Description || "Silahkan Masukkan Data Dibawah ini"}
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={onHandleChange} className={cn("grid items-start gap-4 px-4")}>
         {children}
          </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

