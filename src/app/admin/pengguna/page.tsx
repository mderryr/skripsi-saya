'use server'

import { Suspense } from "react";
import Loading from "./loading";
import PenggunaSendiri from "@/view/data-pengguna.view";
import { ConstructionRedirect } from "@/utils/construction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavbarBottom from "@/components/another/navigation-bottom.component";
import { queryKeys } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSession } from "@/services/login/auth";
import { Logic } from "@/services/user";
import { ChangePassword } from "@/components/Form/input";
import { isMobile } from "@/utils/check-device";
import CustomTabs from '@/components/another/tabs-custom.component'
import NavbarFixed from '@/components/another/navbar-mobile.component'


export default async function Page() {
  ConstructionRedirect();
  // const {penyuNaik} = textDetail
  const mobile = await isMobile()
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
  });

  const { Saveuser } = await getSession();
  const result = await Logic.getUserByUserName(Saveuser.userName);

  const mobileTrackingTabs = [
    {
      label: "Informasi",
      content: (
        <Suspense fallback={<Loading />}>
          {result ? <PenggunaSendiri Pengguna={result} /> : <Loading />}
        </Suspense>
      )
    },
    {
      label: "Rubah Password",
      content: (
        <Suspense fallback={<Loading />}>
          <ChangePassword />
        </Suspense>
      )
    },
  ];

  if (mobile) {
    return (
      <section className="min-h-screen">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NavbarFixed title={"Informasi Pengguna"} />
          <CustomTabs
            tabs={mobileTrackingTabs}
            variant="fullWidth"
            scrollButtons={true}
          />
        </HydrationBoundary>
      </section>
    );
  }


  return (
    <Tabs defaultValue="informasi" className="py-20">
      <Suspense fallback={<Loading />}>
        <div className="">
          <h1 className="mb-6 text-3xl font-bold">Informasi Pengguna </h1>
          <div className="max-md:hidden mb-3">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="informasi">Informasi</TabsTrigger>
                <TabsTrigger value="gantipass">Ganti Password</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TabsContent value="informasi">
              <Suspense fallback={<Loading />}>
                {result ? <PenggunaSendiri Pengguna={result} /> : <Loading />}
              </Suspense>
            </TabsContent>

            <TabsContent value="gantipass">
              <Suspense fallback={<Loading />}>
                <ChangePassword />
              </Suspense>
            </TabsContent>

          </HydrationBoundary>
          <div className=" md:hidden">
            <NavbarBottom>
              <TabsList className={`grid ${Saveuser.admin ? "grid-cols-3" : "grid-cols-2"}`}>
                <TabsTrigger
                  value="informasi"
                  className=" px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                >
                  Informasi
                </TabsTrigger>
                <TabsTrigger
                  value="gantipass"
                  className="px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg"
                >
                  Ganti Password
                </TabsTrigger>
          
              </TabsList>
            </NavbarBottom>
          </div>
        </div>
      </Suspense>
    </Tabs>
  );
}
