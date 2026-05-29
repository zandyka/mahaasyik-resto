import { GununganLogo } from '@/components/layout/GununganLogo';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function BrandSection() {
  return (
    <section
      style={{ background: "linear-gradient(160deg,#1A0800 0%,#111827 55%,#1A0A02 100%)" }}
      className="py-24 px-5 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-10">
        <p
          className="font-['Outfit'] font-semibold text-xs tracking-[0.22em] uppercase"
          style={{ color: "rgba(255, 236, 1,0.7)" }}
        >
          Brand Identity
        </p>

        {/* large logo showcase */}
        <div className="relative flex flex-col items-center gap-6">
          <GununganLogo size={180} />
          <div className="flex flex-col items-center gap-1 -mt-2">
            <h2
              className="font-['Outfit'] font-black text-5xl md:text-6xl tracking-tight leading-none"
              style={{
                background: "linear-gradient(135deg,#FFD040 0%,#F5872A 45%,#D30F25 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mahaasyik
            </h2>
            <p
              className="font-['Plus_Jakarta_Sans'] text-sm tracking-[0.18em] uppercase"
              style={{ color: "rgba(255,248,224,0.45)" }}
            >
              Authentic Ayam Pecaknese Cuisine · Est. 2018
            </p>
          </div>
        </div>

        {/* colour swatches */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {[
            { hex: "#FFD040", label: "Emas" },
            { hex: "#D30F25", label: "Bara" },
            { hex: "#2D6A4F", label: "Rimba" },
            { hex: "#1A2B6B", label: "Langit" },
            { hex: "#111827", label: "Tanah" },
          ].map(({ hex, label }) => (
            <div key={hex} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-xl border-2"
                style={{ background: hex, borderColor: "rgba(255,255,255,0.12)" }}
              />
              <span
                className="font-['Outfit'] text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "rgba(255,248,224,0.5)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="font-['Plus_Jakarta_Sans'] text-sm max-w-sm leading-relaxed"
          style={{ color: "rgba(255,248,224,0.38)" }}
        >
          Logo terinspirasi dari Gunungan Wayang — simbol alam semesta dalam budaya Nusantara — dipadukan dengan gaya visual funky yang bold dan penuh warna.
        </p>
      </div>
    </section>
  );
}
