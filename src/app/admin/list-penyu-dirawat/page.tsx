import { Suspense } from "react";
import PenyuDiinkubasi from "@/view/diinkubasi.view";
import { ConstructionRedirect } from "@/utils/construction";
import Loading from "./loading";
import { queryKeys } from "@/services";
import { getInkubasi } from "@/services/diinkubasi";
import { getInkubator } from "@/services/inkubator";
import { getJenisPenyu } from '@/services/penyu'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSession } from '@/services/login/auth'
import NavbarBack from "@/components/another/navbar-list-back.component";
import { textDetail } from "@/env/description.mjs";
import { isMobile } from "@/utils/check-device";
import ViewPenyuDiinkubasisMobile from '@/view/mobile/list-diinkubasi.view'

export default async function Page() {
  ConstructionRedirect();
  const Mobile = await isMobile();
  const { penyuDiinkubasi } = textDetail

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.inkubasi.all,
    queryFn: () => getInkubasi(),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dataTukik.all,
    queryFn: () => getJenisPenyu()
  })
  await queryClient.prefetchQuery({
    queryKey: queryKeys.inkubator.all,
    queryFn: () => getInkubator()
  })
  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
  });

  if (Mobile) {
    return (
      <Suspense>
        <NavbarBack Massage={penyuDiinkubasi.tittle} />
        <ViewPenyuDiinkubasisMobile />
      </Suspense>
    )
  }

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">{penyuDiinkubasi.tittle} </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<Loading />}>
            <PenyuDiinkubasi />
          </Suspense>
        </HydrationBoundary>
      </div>
    </section>
  );
}
