"use client";

import { Suspense } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { textDetail } from "@/env/description.mjs";

import { BookText, MapPin, Box } from "lucide-react";
import { useRouter } from "next/navigation";
export default function MediaCard() {
  const router = useRouter();
   const data = [
    {
      id: 1,
      name: textDetail.penyuNaik.tittle,
      icon: <BookText size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.penyuNaik.link),
      description: textDetail.penyuNaik.description,
    },
    {
      id: 2,
      name: textDetail.penyuDikerami.tittle,
      icon: <BookText size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.penyuDikerami.link),
      description: textDetail.penyuDikerami.description,
    },
    {
      id: 3,
      name: textDetail.penyuMenetas.tittle,
      icon: <BookText size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.penyuMenetas.link),
      description: textDetail.penyuMenetas.description,
    },
    {
      id: 4,
      name: textDetail.penyuDiinkubasi.tittle,
      icon: <BookText size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.penyuDiinkubasi.link),
      description: textDetail.penyuDiinkubasi.description,
    },
    {
      id: 5,
      name: textDetail.penyuMati.tittle,
      icon: <BookText size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.penyuMati.link),
      description: textDetail.penyuMati.description,
    },
    {
      id: 6,
      name: textDetail.penyuDilepas.tittle,
      icon: <BookText size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.penyuDilepas.link),
      description: textDetail.penyuDilepas.description,
    },
    {
      id: 7,
      name: textDetail.Zona.tittle,
      icon: <MapPin size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.Zona.link),
      description: textDetail.Zona.description,
    },
    {
      id: 8,
      name: textDetail.inkubator.tittle,
      icon: <Box size={48} color="#000" style={{ marginBottom: 8 }} />,
      link: () => router.push(textDetail.inkubator.link),
      description: textDetail.inkubator.description,
    },
  ];
  return (
    <Suspense>
      <div className="flex flex-col pb-24">
        <div className="flex flex-wrap justify-center ">
          {data.map((_, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 150, margin: 1, cursor: "pointer" }}
              onClick={_.link}
              className="w-full sm:w-1/2"
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {_.icon}
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {_.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  style={{ marginTop: 4 }}
                >
                  {_.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
