import PenyuBertelur from "@/view/naik-track.view";
import PenyuTidakBertelur from "@/view/naik-tidak-bertelur.view";
import { Suspense } from "react";
import Loading from "./loading";
import NavbarBack from "@/components/another/navbar-list-back.component";
import { ConstructionRedirect } from "@/utils/construction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarBottom from "@/components/another/navigation-bottom.component";
import { queryKeys } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPenyuNaik } from "@/services/naik";
import {getSession} from '@/services/login/auth'
import { isMobile } from "@/utils/check-device";
import { textDetail } from "@/env/description.mjs";
import CustomTabs from '@/components/another/tabs-custom.component'
import ViewPenyuBertelurMobile from '@/view/mobile/list-data-penyuNaik.view'
import ViewPenyuTidakBertelurMobile from '@/view/mobile/list-data-PenyuNaikTidakBertelur.view'
export default async function Page() {
  ConstructionRedirect();
  const {penyuNaik} = textDetail
const mobile = await isMobile()

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.naik.all,
    queryFn: () => getPenyuNaik(),
  });


  await queryClient.prefetchQuery({
    queryKey:queryKeys.user.all,
    queryFn:()=>getSession(),
  });
  
  if (mobile){ 
    const mobileTrackingTabs=[
      {
        label: "Bertelur",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewPenyuBertelurMobile  />
          </Suspense>
        )
      },      {
        label: "Tidak Bertelur",
        content: (
          <Suspense fallback={<Loading />}>
            <ViewPenyuTidakBertelurMobile />
          </Suspense>
        )
      },
    ]
    return (
      <section className="min-h-screen"> {/* Tambahkan min-height */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarBack Massage={penyuNaik.tittle} />
        <CustomTabs 
          tabs={mobileTrackingTabs}
          variant="fullWidth"
          scrollButtons={true}
        />
      </HydrationBoundary>
    </section>
  );}


  return (
    <Tabs defaultValue="bertelur" className="py-20">
      <div className="">
        <h1 className="mb-6 text-3xl font-bold">Penyu Naik </h1>
        <div className="max-md:hidden mb-3">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="bertelur">Penyu Bertelur</TabsTrigger>
              <TabsTrigger value="tidakbertelur">Penyu Hanya Naik</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TabsContent value="bertelur">
            <PenyuBertelur />
          </TabsContent>

          <TabsContent value="tidakbertelur">
            <PenyuTidakBertelur />
          </TabsContent>
        </HydrationBoundary>
        <div className=" md:hidden">
          <NavbarBottom>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger
                value="bertelur"
                className=" px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
              >
                Penyu Bertelur
              </TabsTrigger>
              <TabsTrigger
                value="tidakbertelur"
                className="px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
              >
                Penyu Hanya Naik
              </TabsTrigger>
            </TabsList>
          </NavbarBottom>
        </div>
      </div>
    </Tabs>
  );
}
