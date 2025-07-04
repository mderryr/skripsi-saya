import { Suspense } from "react";
import TukikMati from "@/view/mati.view";
import { ConstructionRedirect } from "@/utils/construction";
import Loading from "./loading";
import { queryKeys } from "@/services";
import { getInkubasiMati } from "@/services/mati";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {getSession} from '@/services/login/auth'
import { textDetail } from "@/env/description.mjs";
import NavbarBack from "@/components/another/navbar-list-back.component";
import { isMobile } from "@/utils/check-device";
import ViewPenyuMatiMobile from "@/view/mobile/list-data-penyuMati.view";


export default async function Page() {
  ConstructionRedirect();
  const mobile = await isMobile();
  const {penyuMati} = textDetail
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.mati.all,
    queryFn: () => getInkubasiMati(),
  });
  await queryClient.prefetchQuery({
    queryKey:queryKeys.user.all,
    queryFn:()=>getSession(),
  });

  if (mobile) {
    return (
      <Suspense>
        <NavbarBack Massage={penyuMati.tittle} />
        <ViewPenyuMatiMobile />
      </Suspense>
    );
  }
  return (
    <section className="py-20">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Penyu Mati Dirawat </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<Loading />}>
            <TukikMati />
          </Suspense>
        </HydrationBoundary>
      </div>
    </section>
  );
}
