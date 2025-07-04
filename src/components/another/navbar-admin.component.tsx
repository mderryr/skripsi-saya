"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  ClipboardPenLine,
  List as IconList,
  Users,
  User,
  //   ChevronDown,
  FileText,
  LayoutDashboard
} from "lucide-react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import { useRouter } from "next/navigation";
import { getSession } from "@/services/login/auth";
import { queryKeys } from "@/services/queryKey.factory";
import {  useQuery } from "@tanstack/react-query";
import { TIME } from '@/env/time.mjs'
// import { usePathname } from 'next/navigation'

export default function FixedBottomNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const pathname = usePathname()


  const { data: UserData } = useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => getSession(),
    gcTime : TIME.CACHE.LONG,

  });



  return (
    <Suspense>
      <Box sx={{ pb: 2 }} ref={ref}>
        <CssBaseline />
        <List >{children}</List>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Input"
              icon={<ClipboardPenLine />}
              onClick={() => router.push("/admin")}
            />
            <BottomNavigationAction
              label="List"
              icon={<IconList />}
              onClick={() => router.push("/admin/list")}
            />
             <BottomNavigationAction
              label="Report"
              icon={<FileText />}
              onClick={() => router.push("/admin/proses")}
            />
            {UserData.Saveuser.admin&&(
              <BottomNavigationAction
              label="Anggota"
              icon={<Users />}
              onClick={() => router.push("/admin/anggota")}
            />
            )}
            <BottomNavigationAction
              label="Pengguna"
              icon={<User />}
              onClick={() => router.push("/admin/pengguna")}
            />

          </BottomNavigation>
        </Paper>
      </Box>
    </Suspense>
  );
}
