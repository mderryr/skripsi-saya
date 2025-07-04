"use client";
import { User } from "@/types";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import { Typography } from "@mui/material";

export function PenggunaView({ Pengguna = undefined }: { Pengguna: User | undefined }) {
  return (
    <section className="container p-4">
      <div className="space-y-4">
        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Username Pengguna
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {Pengguna?.username || "ID Pengguna"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Nama Pengguna
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            {Pengguna?.name || "Nama Pengguna"}
          </Typography>
        </div>

        <div>
          <Typography variant="subtitle1" className="font-bold mb-1">
            Nomer Telephone
          </Typography>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`https://wa.me/62${Pengguna?.nomerTelp?.slice(1)}` || ""}
                  target="_blank"
                  passHref
                  legacyBehavior
                >
                  <span className="flex items-center gap-2 cursor-pointer hover:underline text-gray-700">
                    {Pengguna?.nomerTelp || "Nama Pengguna"} <ExternalLink className="h-4 w-4" />
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Menuju Whatsapp {`wa.me/62${Pengguna?.nomerTelp?.slice(1)}`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}