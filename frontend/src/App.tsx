import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { AboutSection } from '@/components/sections/AboutSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { HeroSection } from '@/components/sections/HeroSection';
import { MapsSection } from '@/components/sections/MapsSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { INJECTED_CSS } from '@/constants';
import { AboutPage } from '@/pages/AboutPage';
import { DeliveryPage } from '@/pages/DeliveryPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { MenuPage } from '@/pages/MenuPage';
import { ReservasiPage } from '@/pages/ReservasiPage';
import { Page } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [animKey, setAnimKey] = useState(0);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setAnimKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <style>{INJECTED_CSS}</style>
      <Navbar navigate={navigate} />
      <div key={animKey} className="page-enter">
        {page === "home" ? (
          <main>
            <HeroSection navigate={navigate} />
            <StatsSection />
            <AboutSection navigate={navigate} />
            <GallerySection />
            <MenuSection navigate={navigate} />
            <FAQSection />
            <ReviewsSection />
            <MapsSection />
          </main>
        ) : page === "menu" ? (
          <div className="pt-[72px]">
            <MenuPage navigate={navigate} />
          </div>
        ) : page === "reservasi" ? (
          <div className="pt-[72px]">
            <ReservasiPage />
          </div>
        ) : page === "delivery" ? (
          <div className="pt-[72px]">
            <DeliveryPage />
          </div>
        ) : page === "history" ? (
          <div className="pt-[72px]">
            <HistoryPage />
          </div>
        ) : (
          <div className="pt-[72px]">
            <AboutPage />
          </div>
        )}
      </div>
      <Footer />
      <FloatingActionButton navigate={navigate} />
      <WhatsAppButton />
    </div>
  );
}














