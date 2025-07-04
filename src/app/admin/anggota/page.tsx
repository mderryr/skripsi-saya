'use server'

import { Suspense } from 'react'
import { getSession } from "@/services/login/auth";
import DaftarTeam from "@/view/data-team.view";
import { redirect } from "next/navigation";
import { ConstructionRedirect } from "@/utils/construction";
import NavbarFixed from '@/components/another/navbar-mobile.component'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { isMobile } from "@/utils/check-device";
import { queryKeys } from "@/services";
import { getPengguna } from "@/services/user";
import DaftarTeamMobile from '@/view/mobile/list-team.view'
import Loading from "./loading";


export default async function Page() {
    ConstructionRedirect();
    const { Saveuser } = await getSession();
    const mobile = await isMobile()
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: queryKeys.users.all,
        queryFn: () => getPengguna(),
    });
    await queryClient.prefetchQuery({
        queryKey: queryKeys.user.all,
        queryFn: () => getSession(),
      });

    if (!Saveuser.admin) redirect("/admin")
    if (mobile) return (
        <section className="min-h-screen">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NavbarFixed title={"Anggota Pokmaswas"} />
                <Suspense fallback={<Loading />}>
                    <DaftarTeamMobile />
                </Suspense>
            </HydrationBoundary>
        </section>
    )
    else {
        return (
            <section className="py-20">
                {/* ada saja */}
                <div className="container">
                    <h1 className="mb-6 text-3xl font-bold">{"Anggota Pokmaswas"} </h1>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <Suspense fallback={<Loading />}>
                            <DaftarTeam />
                        </Suspense>
                    </HydrationBoundary>
                </div>
            </section>
        )
    }
}