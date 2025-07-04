import { Suspense } from "react";
import InkubatorView from "@/view/inkubator.view";
import { ConstructionRedirect } from "@/utils/construction";
import Loading from "./loading";
import { queryKeys } from "@/services";
import { getInkubator } from "@/services/inkubator";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isMobile } from "@/utils/check-device";
import { textDetail } from "@/env/description.mjs";
import NavbarBack from "@/components/another/navbar-list-back.component";
import ViewTempatMobile from '@/view/mobile/list-data-tempat.view'

export default async function Page() {
  ConstructionRedirect();
  const {inkubator} = textDetail
  const Mobile = await isMobile()
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.inkubator.all,
    queryFn: () => getInkubator(),
  });

  if (Mobile){ 
    return (
      <section > {/* Tambahkan min-height */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarBack Massage={inkubator.tittle} />
        <ViewTempatMobile />
      </HydrationBoundary>
    </section>)
  }

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">{inkubator.tittle} </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<Loading />}>
            <InkubatorView />
          </Suspense>
        </HydrationBoundary>
      </div>
    </section>
  );
}
