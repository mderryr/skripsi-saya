"use client";


import Navbar from "@/components/another/navbar-all.component";
import Footer from "@/components/another/footer";
import Hero from '@/components/landing-page/hero'
import Features from "@/components/landing-page/features";
import Sponsors from '@/components/landing-page/sponsors'
import ScrollToTop from "@/components/another/scrollToTop.component";


export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Sponsors />
        <ScrollToTop />
      </main>

      <Footer />
    </>
  );
}

