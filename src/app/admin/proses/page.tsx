import { Suspense } from "react";
import Loading from "./loading";
import NavbarFixed from '@/components/another/navbar-mobile.component'
import { ConstructionRedirect } from "@/utils/construction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarBottom from "@/components/another/navigation-bottom.component";
import { queryKeys } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getReportByYear,getReportMonth } from "@/services/report";
import {getSession} from '@/services/login/auth'
import { isMobile } from "@/utils/check-device";
import { textDetail } from "@/env/description.mjs";
import CustomTabs from '@/components/another/tabs-custom.component'
import ViewLaporanBUlanan from '@/view/report-bulanan.view'
import ViewLaporanTahunan from '@/view/report-tahunan.view'
import ViewMoblieBulanan from '@/view/mobile/laporan-bulanan.view'
import ViewMoblieTahunan from '@/view/mobile/laporan-tahunan.view'

export default async function Page() {
  ConstructionRedirect();
  const {penyuNaik} = textDetail
const mobile = await isMobile()

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.tahunan.all,
    queryFn: () => getReportByYear(),
  });

  await queryClient.prefetchQuery({
    queryKey: queryKeys.bulanan.all,
    queryFn: () => getReportMonth(),
  });

  await queryClient.prefetchQuery({
    queryKey:queryKeys.user.all,
    queryFn:()=>getSession(),
  });
  

  if (mobile){ 
    const mobileTrackingTabs=[
      {
        label: "Bulanan",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewMoblieBulanan  />
          </Suspense>
        )
      },      {
        label: "Tahunan",
        content: (
          <Suspense fallback={<Loading />}>
            {/* <ViewPenyuTidakBertelurMobile /> */}
            <ViewMoblieTahunan />
          </Suspense>
        )
      },
    ]
    return (
      <section className="min-h-screen"> {/* Tambahkan min-height */}
      <HydrationBoundary state={dehydrate(queryClient)}>
      <NavbarFixed title="List Laporan" />
        <CustomTabs 
          tabs={mobileTrackingTabs}
          variant="fullWidth"
          scrollButtons={true}
        />
      </HydrationBoundary>
    </section>
  );}


  return (
    <Tabs defaultValue="bulan" className="py-20">
      <div className="">
        <h1 className="mb-6 text-3xl font-bold">Laporan </h1>
        <div className="max-md:hidden mb-3">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="bulan">Laporan Bulanan</TabsTrigger>
              <TabsTrigger value="tahun">Laporan Tahunan</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TabsContent value="bulan">
          <ViewLaporanBUlanan />
          </TabsContent>

          <TabsContent value="tahun">
            <ViewLaporanTahunan />
          </TabsContent>
        </HydrationBoundary>
        <div className=" md:hidden">
          <NavbarBottom>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger
                value="bulan"
                className=" px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
              >
                Laporan Bulanan
              </TabsTrigger>
              <TabsTrigger
                value="tahun"
                className="px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
              >
                Laporan Tahunan
              </TabsTrigger>
            </TabsList>
          </NavbarBottom>
        </div>
      </div>
    </Tabs>
  );
}
