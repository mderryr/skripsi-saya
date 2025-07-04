'use server'

import { Suspense } from "react";
import Sidebar from "@/components/another/sidebar.component";
import LoadingSkeleton from "@/components/another/skeleton-loading";
import { isMobile } from "@/utils/check-device";
import NavbarMobileAdmin from "@/components/another/navbar-admin.component";
import { queryKeys } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSession } from "@/services/login/auth";

export default async function admin({
  children,
}: {
  children: React.ReactNode;
}) {
  const mobile = await isMobile();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
  });

  if (mobile) return <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavbarMobileAdmin>{children}</NavbarMobileAdmin>;
      </HydrationBoundary>
  </Suspense>

  return (
    <section className="grid grid-flow-col">
      <Suspense fallback={<LoadingSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar>{children}</Sidebar>
      </HydrationBoundary>
      </Suspense>
    </section>
  );
}
