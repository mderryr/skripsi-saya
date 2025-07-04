import { Suspense } from "react";
import DilepasView from "@/view/dilepas.view";
import { ConstructionRedirect } from "@/utils/construction";
import Loading from "./loading";
import { queryKeys } from "@/services";
import { getTukikPelepasan } from "@/services/dilepas";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {getSession} from '@/services/login/auth'
import { isMobile } from "@/utils/check-device";
import { textDetail } from "@/env/description.mjs";
import NavbarBack from "@/components/another/navbar-list-back.component";
import ViewTukikDilepasMobile from '@/view/mobile/list-data-dilepas.view'

export default async function Page() {
  ConstructionRedirect();
  const {penyuDilepas} = textDetail
  const Mobile = await isMobile()
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dilepas.all,
    queryFn: () => getTukikPelepasan(),
  });

  await queryClient.prefetchQuery({
    queryKey:queryKeys.user.all,
    queryFn:()=>getSession(),
  });

  if (Mobile){ 
    return (
      <section > {/* Tambahkan min-height */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarBack Massage={penyuDilepas.tittle} />
        <ViewTukikDilepasMobile />
      </HydrationBoundary>
    </section>)
  }
  return (
    <section className="py-20">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Penyu Dilepas </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<Loading />}>
            <DilepasView />
          </Suspense>
        </HydrationBoundary>
      </div>
    </section>
  );
}
