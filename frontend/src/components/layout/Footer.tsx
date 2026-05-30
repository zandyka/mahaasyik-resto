import { GununganLogo } from '@/components/layout/GununganLogo';
import { ColHead } from '@/components/ui/ColHead';
import { FOOTER_MENU } from '@/constants';
import { FOOTER_SVC } from '@/constants';
import { FOOTER_CONTACT } from '@/constants';
import { SOCIALS } from '@/constants';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function Footer() {
  return (
    <footer style={{ background: "#111827" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <GununganLogo size={28} />
              <span
                className="font-['Outfit'] font-black text-xl"
                style={{
                  background: "linear-gradient(135deg, #D30F25, #FFEC01)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mahaasyik
              </span>
            </div>
            <p
              className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              Restoran sajian Ayam Pecak autentik sejak 2018. Rasa asli Nusantara yang hangat dan penuh cinta.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((icon) => (
                <button
                  key={icon}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-base transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "#D30F25";
                    el.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(255,255,255,0.08)";
                    el.style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <ColHead>Menu</ColHead>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_MENU.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Plus_Jakarta_Sans'] text-sm transition-colors duration-200 hover:text-[#FFEC01]"
                    style={{ color: "rgba(255,255,255,0.52)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHead>Layanan</ColHead>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_SVC.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-['Plus_Jakarta_Sans'] text-sm transition-colors duration-200 hover:text-[#FFEC01]"
                    style={{ color: "rgba(255,255,255,0.52)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHead>Hubungi Kami</ColHead>
            <ul className="flex flex-col gap-3">
              {FOOTER_CONTACT.map((c) => (
                <li key={c.text} className="flex items-start gap-2.5">
                  <span className="text-base shrink-0 mt-0.5">{c.icon}</span>
                  <p
                    className="font-['Plus_Jakarta_Sans'] text-sm leading-snug"
                    style={{ color: "rgba(255,255,255,0.52)" }}
                  >
                    {c.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex justify-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="font-['Plus_Jakarta_Sans'] text-xs text-center"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            &copy; 2026 Mahaasyik. Dibuat dengan komputer oleh saya
          </p>
        </div>
      </div>
    </footer>
  );
}
