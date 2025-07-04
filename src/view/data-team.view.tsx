"use client";

import { Suspense } from "react";
import { User } from "@/types";
import { DataTable } from "@/components/another/DataTable/DataTable";
import { queryKeys } from "@/services";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "@/components/loading/table.skeleton";
import ErrorView from "@/components/another/error-tryAgain.component";

import { useCallback, useMemo, useState } from "react";
import { columns as Colomns } from "@/components/coloms/pengguna.columns";
import { Card, CardContent} from "@/components/ui/card";
import Loading from "@/app/admin/list-penyu-dikerami/loading";
import PenggunaForm from "@/components/Form/pengguna.form";
import { getPengguna } from "@/services/user";

export default function PenyuDikeramiView() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<User | any | null>(null);
  const [isView, setIsView] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: queryKeys.users.all,
    queryFn:() => getPengguna(),
  });

  const onDeleteOpen = useCallback((data: User) => {
    setSelected(data);
    setIsDialogOpen(true);
    setIsDeleted(true);
  }, []);

  const onEditOpen = useCallback((data: User) => {
    setSelected(data);
    setIsDialogOpen(true);
  }, []);
  const onViewOpen = useCallback((data: User) => {
    setSelected(data);
    setIsDialogOpen(true);
    setIsView(!isView);
  }, []);

  const columns = useMemo(
    () => Colomns({ onEditOpen, onDeleteOpen, onViewOpen }),
    [onEditOpen, onDeleteOpen, onViewOpen]
  );

  if (isLoading) <TableLoading />;
  if (error) <ErrorView />;
  return (
    <>
      <div className="container">
        <Card>
          <CardContent>
            <Suspense fallback={<Loading />}>
              {isFetching && <TableLoading />}
              {!isFetching && (
                <DataTable
                  setOpen={() => setIsDialogOpen(!isDialogOpen)}
                  data={data?.data as any}
                  columns={columns}
                />
              )}
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <Suspense>
        <PenggunaForm
          isOpen={isDialogOpen}
          isOpenView={isView}
          isDelete={isDeleted}
          onOpenChange={(value) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelected(null);
            }
            if (isView || isDeleted) {
              setIsView(false);
              setIsDeleted(false)
            }
          }}
          dataPengguna={selected}
        />
      </Suspense>

    </>
  );
}
