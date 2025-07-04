import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ProviderApp from "./providers-tanstack";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import moment from "moment";

const inter = Poppins({
  weight: "200",
  subsets: ["latin"],
});

// export const runtime = 'edge'

export const metadata: Metadata = {
  title: "Pendataan Tukik Indonesia",
  description:
    "Sebuah sistem informasi untuk mendata tukik di Indonesia. Untuk pendataan pertama digunakan di pantai kili-kili",
  applicationName: "Pendataan Tukik",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  moment.locale();

  return (
    <html data-theme="cupcake" lang="en" suppressHydrationWarning >
      <head>
        <meta property="og:image" content="Link preview image URL" />
        <meta property="og:site_name" content="Link preview site name" />
        <meta property="og:title" content="Link preview title" />
        <meta property="og:description" content="Link preview description" />
        <meta property="og:url" content="Canonical link preview URL" />
      </head>

      <body className=" no-underline ">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        <ProviderApp>
          {children}
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </ProviderApp>
        {/* </ThemeProvider> */}
      </body>
      {/* <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js' 
      integrity='sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm' 
      crossOrigin='anonymous'/>

     <Script async src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js" />
     <Script src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js" />
     <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" /> */}
    </html>
  );
}
