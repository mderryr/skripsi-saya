import EmptySide from "@/components/another/empty-view.component";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Dialog } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableValues } from "@/components/another/table-custom-values.component";
import { DiamondPlus } from "lucide-react";

export default function TabsComponent({
  NamaHalaman,
  Deskripsi,
  Head,
  Body,
  children,
  clickActionsAdd,
}: any) {
  return (
    <Dialog>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{NamaHalaman || "Nama Halaman"}</CardTitle>
              <CardDescription>{Deskripsi || "Deskripsi"}</CardDescription>
            </div>
            {clickActionsAdd ? (
              <DrawerTrigger asChild>
                <Button
                  onClick={clickActionsAdd}
                  variant="outline"
                  className="mb-10"
                >
                  <DiamondPlus className="h-6 w-6 mr-3" /> Tambah Data
                </Button>
              </DrawerTrigger>
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardContent>
          {Body ? (
            <TableValues Head={Head}>{children}</TableValues>
          ) : (
            <EmptySide CardDescription="Silahkan Tambah Data di Halaman input" />
          )}
        </CardContent>
        <CardFooter>
          {Body===false?  <div className="text-xs text-muted-foreground">
           Tidak Ada Data yang ditampilkan
          </div>:  <div className="text-xs text-muted-foreground">
            Menampilkan <strong>{ Body}</strong> Data
          </div>}
        
        </CardFooter>
      </Card>
    </Dialog>
  );
}
