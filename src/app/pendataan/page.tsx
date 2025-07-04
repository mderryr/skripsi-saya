// import Navbar from "@/component/navbar-all";
import ViewPedataanAll from "./pendataan-all.view";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "@/components/another/navbar-all.component";
import Footer from "@/components/another/footer";
import ScrollToTop from "@/components/another/scrollToTop.component";
import { ConstructionRedirect } from '@/utils/construction'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "@/services";
import { getReportByYear, getReportMonth } from "@/services/report";


export default async function Pendataan() {
  ConstructionRedirect()

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.tahunan.all,
    queryFn: () => getReportByYear(),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.bulanan.all,
    queryFn: () => getReportMonth(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        {process.env.UNDERCONSTRUCTION ? "" : <Navbar />}
        <ViewPedataanAll />
        <ScrollToTop />
        {process.env.UNDERCONSTRUCTION ? "" : <Footer />}
      </Suspense>
    </HydrationBoundary>
  );
}
