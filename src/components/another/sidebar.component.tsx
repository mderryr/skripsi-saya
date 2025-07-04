"use client";

import {Suspense,useEffect,useState} from 'react'
import Link from "next/link";
import {  useQuery } from "@tanstack/react-query";
import {
  ClipboardPenLine,
  Turtle,
  List,
  Menu,
  Box,
  MapPin,
  Users,
  ChevronDown,
  FileText,
  User,
  LayoutDashboard
} from "lucide-react";
import { usePathname } from "next/navigation";
import { TitelAutoSelect } from "@/utils/select-name";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { getSession } from "@/services/login/auth";
import { queryKeys } from "@/services/queryKey.factory";
import {TIME} from '@/env/time.mjs'

const NavbarsLinks = [
  {
    nama: "Beranda",
    logo: <LayoutDashboard className="h-4 w-4" />,
    link: "/admin",
  },
  {
    nama: "List Pendataan Penyu ",
    logo: <List className="h-4 w-4" />,
    link: "",
    dropdown: [
      {
        nama: "Penyu Naik",
        link: "/admin/list-penyu-naik",
      },
      {
        nama: "Data Telur Diinkubasi",
        link: "/admin/list-penyu-dikerami",
      },
      {
        nama: "Data Tukik Menetas",
        link: "/admin/list-penyu-menetas",
      },
      {
        nama: "Data Tukik Dirawat",
        link: "/admin/list-penyu-dirawat",
      },
      {
        nama: "Data Tukik Mati",
        link: "/admin/list-penyu-mati-dirawat",
      },
      {
        nama: "Data Tukik Dilepas",
        link: "/admin/list-penyu-dilepas",
      },
    ],
  },
  {
    nama: "Tempat Perawatan",
    logo: <Box className="h-4 w-4" />,
    link: "/admin/list-inkubator",
  },
  {
    nama: "Pembagian zona",
    logo: <MapPin className="h-4 w-4" />,
    link: "/admin/list-zona",
  },
  {
    nama: "Laporan",
    logo: <FileText className="h-4 w-4" />,
    link: "/admin/proses",
  },
  {
    nama: "Pengguna",
    logo: <User className="h-4 w-4" />,
    link: "/admin/pengguna",
  },
];

const Dashboard =  ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
const [added,setAdded] = useState(false)
  const { data: UserData, isLoading } = useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
    refetchInterval:TIME.REFETCH.INTERVAL_LONG
  });

    // if (UserData?.Saveuser?.admin && !isLoading ) {
    //   if(!added){
    //     NavbarsLinks.splice(5, 0, {
    //     nama: "Anggota",
    //     logo: <Users className="h-4 w-4" />,
    //     link: "/admin/anggota",
    //   })
    //   setAdded(true)
    // }
    // }

  return (
    <div className="flex h-screen w-full">
      <div className="hidden lg:block lg:w-64">
        <div className="h-full flex flex-col justify-between py-4">
          <div className="flex items-center gap-2 font-semibold">
            <Link href="/" className="flex items-center gap-2">
              <Turtle className="h-6 w-6" />
              <span className="">Si Penyu</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {NavbarsLinks.map((value) => {
              if (value.dropdown) {
                return (
                  <Collapsible key={value.nama}>
                    <CollapsibleTrigger asChild>
                      <Link
                        href={value.link}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        {value.logo}
                        {value.nama}
                        <ChevronDown className="h-4 w-4" />
                      </Link>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {value.dropdown.map((item) => (
                        <Link
                          key={item.nama}
                          href={item.link}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pl-8"
                        >
                          {item.nama}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              } else {
                return (
                  <Link
                    key={value.nama}
                    href={value.link}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    {value.logo}
                    {value.nama}
                  </Link>
                );
              }
            })}
          </nav>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <header className="fixed top-0 left-0 right-0 z-10 flex items-center gap-4 border-b p-4 lg:relative">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="flex-1 overflow-y-auto py-4">
                {NavbarsLinks.map((value) => {
                  if (value.dropdown) {
                    return (
                      <Collapsible key={value.nama}>
                        <CollapsibleTrigger asChild>
                          <Link
                            href={value.link}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                          >
                            {value.logo}
                            {value.nama}
                            <ChevronDown className="h-4 w-4" />
                          </Link>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {value.dropdown.map((item) => (
                            <Link
                              key={item.nama}
                              href={item.link}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pl-8"
                            >
                              {item.nama}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  } else {
                    return (
                      <Link
                        key={value.nama}
                        href={value.link}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        {value.logo}
                        {value.nama}
                      </Link>
                    );
                  }
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <h4>{TitelAutoSelect(pathname)}</h4>
        </header>
        <section className="flex-1 overflow-y-auto px-4 ">
        <Suspense> 
          {children}
        </Suspense>
          </section>
      </div>
    </div>
  );
};

export default Dashboard;