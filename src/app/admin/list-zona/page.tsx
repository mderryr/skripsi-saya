import { Suspense } from "react";
import Loading from "./loading";
import { ConstructionRedirect } from "@/utils/construction";
import { queryKeys } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getzona } from "@/services/zona";
import ViewZona from '@/view/zona.view'
import { isMobile } from "@/utils/check-device";
import { textDetail } from "@/env/description.mjs";
import NavbarBack from "@/components/another/navbar-list-back.component";
import ViewZonaMobile from '@/view/mobile/list-zona.view'

export default async function Page() {
  ConstructionRedirect();
  const {Zona} = textDetail
  const mobile = await isMobile()
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:queryKeys.zona.all,
    queryFn:()=>getzona()
  });
  
  if (mobile){ 
    return (
      <section > {/* Tambahkan min-height */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarBack Massage={Zona.tittle} />
        <ViewZonaMobile />
      </HydrationBoundary>
    </section>)
  }

  return (
    <section className="py-20">
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">Pembagian Zona Untuk Naik </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Loading />}>
          <ViewZona />
        </Suspense>
      </HydrationBoundary>
    </div>
  </section>
  );
}
