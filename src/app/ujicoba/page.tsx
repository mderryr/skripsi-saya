"use client";

import { Suspense } from "react";
import CardComponent from "@/components/another/DataCard/Card.component";
import NavbarBack from "@/components/another/navbar-list-back.component";
import { Grid } from "@mui/material";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const data = [
  {
    id: "DOC001",
    tanggal: "2023-06-15",
    tanggalKemungkinan: "2023-07-01",
    jumlah: 50,
    status: "Aktif",
  },
  {
    id: "DOC001",
    tanggal: "2023-06-15",
    tanggalKemungkinan: "2023-07-01",
    jumlah: 50,
    status: "Aktif",
  },
  {
    id: "DOC001",
    tanggal: "2023-06-15",
    tanggalKemungkinan: "2023-07-01",
    jumlah: 50,
    status: "Aktif",
  },
  {
    id: "DOC001",
    tanggal: "2023-06-15",
    tanggalKemungkinan: "2023-07-01",
    jumlah: 50,
    status: "Aktif",
  },
];

const TukikList = () => {
  return (
    <Suspense>
      <NavbarBack Massage="Penyu Naik" />
      <div className="p-4 mt-14 md:p-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/list">List</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Penyu Naik</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.map((item) => (
            <Grid item xs={4} sm={4} md={4} key={item.id}>
              <CardComponent
                onView={(items) => console.log(items)}
                onDelete={(items)=>console.log(items)}
                onEdit={(items)=>console.log(items)}
                data={item}
                item={{
                  id: item.id,
                  tanggal: item.tanggal,
                  tanggalKemungkinan: item.tanggalKemungkinan,
                  jumlah: `Jumlah Tukik ${item.jumlah}`,
                  status: item.status,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Suspense>
  );
};

export default TukikList;