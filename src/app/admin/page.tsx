import { Suspense } from "react";
import Loading from "./loading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NavbarBottom from "@/components/another/navigation-bottom.component";
//-------------Halaman Biasa--------------------
import PenyuNaik from "@/view/naik-track.view";
import TelurDikerami from "@/view/dikerami-track.view";
import TelurMenetas from "@/view/menetas-track.view";
import ViewInkubator from "@/view/inkubator-track.view";
//---------------------------------------------
import { ConstructionRedirect } from "@/utils/construction";
import { queryKeys } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPenyuNaik } from "@/services/naik";
import { getJenisPenyu } from "@/services/penyu";
import { getzona } from "@/services/zona";
import { getTelurDikerami } from "@/services/dikerami";
import { getTelurMenetas } from "@/services/menetas";
import { getInkubator } from "@/services/inkubator";
import { getSession } from "@/services/login/auth";
import { isMobile } from "@/utils/check-device";
//-------------Halaman Mobile-----------------
import ViewPenyuBertelurMobile from "@/view/mobile/list-data-penyuNaik.view";
import ViewPenyuDikeramiMobile from '@/view/mobile/list-dikerami.view'
import ViewPenyuMenetasMobile from '@/view/mobile/list-menetas.view'
import ViewInkubatorMobile from '@/view/mobile/list-inkubator-track.view'
//--------------------------------------------
import CustomTabs from '@/components/another/tabs-custom.component'
import NavbarFixed from '@/components/another/navbar-mobile.component'
import CommingSoon from '@/view/asset/coming-soon.view'

export default async function Page() {
  ConstructionRedirect();
  const mobile = await isMobile();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.naik.all,
    queryFn: () => getPenyuNaik(true),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.menetas.all,
    queryFn: () => getTelurMenetas(true),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.zona.all,
    queryFn: () => getzona(),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dataTukik.all,
    queryFn: () => getJenisPenyu(),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.inkubatorTrack.all,
    queryFn: () => getInkubator(true),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.dikerami.all,
    queryFn: () => getTelurDikerami(true),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
  });

  // return <CommingSoon />


  if (mobile){
    const mobileTrackingTabs = [
      {
        label: "Naik",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewPenyuBertelurMobile Track Button />
          </Suspense>
        )
      },
      {
        label: "Inkubasi",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewPenyuDikeramiMobile Track />
          </Suspense>
        )
      },
      {
        label: "Menetas",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewPenyuMenetasMobile Track />
          </Suspense>
        )
      },
      {
        label: "Dirawat",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewInkubatorMobile />
          </Suspense>
        )
      }
    ];
    return (
  
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NavbarFixed title="Halaman Input" />
          <CustomTabs 
            tabs={mobileTrackingTabs}
            variant="fullWidth"
            scrollButtons={false}
          />
        </HydrationBoundary>
      </section>
    );
}
  return (
    <section className="py-20">
      <Suspense fallback={<Loading />}>
        <Tabs defaultValue="penyuNaik">
          {/* tabs ada disini */}
          <div className="max-md:hidden">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="penyuNaik">Penyu Naik</TabsTrigger>
                <TabsTrigger value="telurInkubasi">Inkubasi Telur</TabsTrigger>
                <TabsTrigger value="telurMenetas">Telur Menetas</TabsTrigger>
                <TabsTrigger value="tukikRawat">Rawat Tukik</TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* main ada disini */}
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="mt-[2%] mb-[15%]">
              <TabsContent value="penyuNaik">
                <Suspense fallback={<Loading />}>
                  <PenyuNaik Track />
                </Suspense>
              </TabsContent>
              <TabsContent value="telurInkubasi">
                <Suspense fallback={<Loading />}>
                  <TelurDikerami Track />
                </Suspense>
              </TabsContent>
              <TabsContent value="telurMenetas">
                <Suspense fallback={<Loading />}>
                  <TelurMenetas Track />
                </Suspense>
              </TabsContent>
              <TabsContent value="tukikRawat">
                <Suspense fallback={<Loading />}>
                  <ViewInkubator />
                </Suspense>
              </TabsContent>
            </div>
          </HydrationBoundary>
          {/* tabs ada disini */}
          <div className=" md:hidden">
            <NavbarBottom>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger
                  value="penyuNaik"
                  className=" px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                >
                  Naik
                </TabsTrigger>
                <TabsTrigger
                  value="telurInkubasi"
                  className="px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                >
                  Inkubasi
                </TabsTrigger>
                <TabsTrigger
                  value="telurMenetas"
                  className="px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                >
                  Menetas
                </TabsTrigger>
                <TabsTrigger
                  value="tukikRawat"
                  className="px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                >
                  Dirawat
                </TabsTrigger>
              </TabsList>
            </NavbarBottom>
          </div>
        </Tabs>
      </Suspense>
    </section>
  );
}
