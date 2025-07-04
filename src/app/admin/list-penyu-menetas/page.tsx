import { Suspense } from "react";
import PenyuMenetas from "@/view/menetas-track.view";
import { ConstructionRedirect } from "@/utils/construction";
import Loading from "./loading";
import { queryKeys } from "@/services";
import { getTelurMenetas } from "@/services/menetas";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {getSession} from '@/services/login/auth'
import { textDetail } from "@/env/description.mjs";
import { isMobile } from "@/utils/check-device";
import NavbarBack from "@/components/another/navbar-list-back.component";
import ViewPenyuMenetasMobile from '@/view/mobile/list-menetas.view'


export default async function Page() {
  ConstructionRedirect();
  const {penyuMenetas} = textDetail
  const mobile = await isMobile()

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:queryKeys.menetas.all,
    queryFn:()=>  getTelurMenetas(),
  });
  await queryClient.prefetchQuery({
    queryKey:queryKeys.user.all,
    queryFn:()=>getSession(),
  });

  if (mobile) return (
    <Suspense>
    <NavbarBack Massage={penyuMenetas.tittle} />
    <ViewPenyuMenetasMobile  />
    </Suspense>
  );
  
  return (
    <section className="py-20">
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold">{penyuMenetas.tittle} </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Loading />}>
          <PenyuMenetas />
        </Suspense>
      </HydrationBoundary>
    </div>
  </section>
  );
}
