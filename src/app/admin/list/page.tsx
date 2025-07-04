import { redirect } from "next/navigation";
import { isMobile } from "@/utils/check-device";
import ListDataView from "@/view/mobile/list-data.view";
import { Suspense } from "react";
import NavbarFixed from '@/components/another/navbar-mobile.component'

export default async function Page() {
  const Mobile = await isMobile();

  if (!Mobile) redirect("/admin");

  return (
    <Suspense>
          <NavbarFixed title="List Semua Data" />
      <ListDataView />
    </Suspense>
  );
}
