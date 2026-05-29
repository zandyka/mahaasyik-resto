import { GununganLogo } from '@/components/layout/GununganLogo';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { NAV_LINKS } from '@/constants';
import { Page } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function Navbar({ navigate }: { navigate?: (page: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Beranda");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-shadow duration-300"
        style={{
          height: 72,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: scrolled
            ? "0 4px 28px rgba(17, 24, 39, 0.11), 0 1px 0 rgba(17, 24, 39, 0.06)"
            : "0 1px 0 rgba(17, 24, 39, 0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-between gap-6">
          <button
            onClick={() => { navigate?.("home"); setActive("Beranda"); }}
            className="flex items-center gap-2.5 shrink-0 group bg-transparent border-0"
          >
            <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              <GununganLogo size={28} />
            </div>
            <span
              className="font-['Outfit'] font-black text-[1.25rem] tracking-tight select-none"
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mahaasyik
            </span>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.page ? undefined : link.href}
                onClick={(e) => {
                  if (link.page && navigate) {
                    e.preventDefault();
                    navigate(link.page);
                  }
                  setActive(link.label);
                }}
                className="relative px-4 py-2 font-['Outfit'] font-semibold text-sm text-[#111827] hover:text-[#D30F25] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
                <span
                  className="absolute bottom-0.5 left-4 right-4 h-[2.5px] rounded-full transition-transform duration-300 origin-left"
                  style={{
                    background: "linear-gradient(90deg, #D30F25, #FFEC01)",
                    transform: active === link.label ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <ButtonPrimary size="sm" className="hidden md:inline-flex" onClick={() => navigate?.("reservasi")}>
              Reservasi Sekarang
            </ButtonPrimary>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#111827] hover:bg-[#D30F25]/10 transition-colors"
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              <span
                className="transition-all duration-200"
                style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {open ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed top-[72px] inset-x-0 z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? 380 : 0,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: open ? "0 12px 32px rgba(17, 24, 39, 0.12)" : "none",
          borderBottom: open ? "1px solid rgba(17, 24, 39, 0.07)" : "none",
        }}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.page ? undefined : link.href}
              onClick={(e) => {
                if (link.page && navigate) {
                  e.preventDefault();
                  navigate(link.page);
                }
                setActive(link.label);
                setOpen(false);
              }}
              className="px-4 py-3 rounded-xl font-['Outfit'] font-semibold text-sm transition-all duration-200 cursor-pointer"
              style={
                active === link.label
                  ? { color: "#D30F25", background: "rgba(211, 15, 37, 0.07)" }
                  : { color: "#111827" }
              }
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 pb-1">
            <ButtonPrimary className="w-full" onClick={() => { navigate?.("reservasi"); setOpen(false); }}>Reservasi Sekarang</ButtonPrimary>
          </div>
        </div>
      </div>
    </>
  );
}
