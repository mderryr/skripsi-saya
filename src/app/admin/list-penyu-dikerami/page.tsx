import { Suspense } from "react";
import PenyuDikeramiView from "@/view/dikerami-track.view";
import { ConstructionRedirect } from "@/utils/construction";
import Loading from "./loading";
import { queryKeys } from "@/services";
import { getTelurDikerami } from "@/services/dikerami";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSession } from "@/services/login/auth";
import { isMobile } from "@/utils/check-device";
import NavbarBack from "@/components/another/navbar-list-back.component";
import ViewPenyuDikeramiMobile from "@/view/mobile/list-dikerami.view";
import { textDetail } from "@/env/description.mjs";

export default async function Page() {
  ConstructionRedirect();
  const Mobile = await isMobile();
  const {penyuDikerami} = textDetail

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dikerami.all,
    queryFn: () => getTelurDikerami(),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
  });

  if (Mobile) {
    return (
      <Suspense>
        <NavbarBack Massage={penyuDikerami.tittle} />
        <ViewPenyuDikeramiMobile />
      </Suspense>
    );
  }

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Telur Diinkubasi </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<Loading />}>
            <PenyuDikeramiView />
          </Suspense>
        </HydrationBoundary>
      </div>
    </section>
  );
}
