import { FEATURES } from '@/constants';
import { Page } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function AboutSection({ navigate }: { navigate?: (page: Page) => void }) {
  return (
    <section id="about" className="py-20 md:py-28 px-5 md:px-8 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative">
          <div
            className="w-full flex items-center justify-center overflow-hidden bg-white"
            style={{
              aspectRatio: "4 / 3",
              borderRadius: 32,
              border: "1px dashed #D30F25",
            }}
          >
            {/* TODO: Ganti src="/logo.png" dengan lokasi file gambar logo hasil export dari Figma Anda */}
            <img src="/utama.png" alt="Logo Mahaasyik" className="max-w-[80%] max-h-[80%] object-contain" onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%23f0f0f0" width="200" height="200"/><text fill="%23aaa" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%" y="50%" text-anchor="middle">antok ang</text></svg>';
            }} />
          </div>
          <div
            className="absolute bottom-5 right-5 flex items-center gap-2 px-4 py-2.5 rounded-full font-['Outfit'] font-bold text-sm text-white whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
              boxShadow: "0 8px 28px rgba(211, 15, 37, 0.42)",
            }}
          >
            🌿 Sajian Ayam Pecak Asli
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm border-2 border-[#D30F25] text-[#D30F25]">
              Tentang Kami
            </span>
          </div>
          <h2
            className="font-['Outfit'] font-black text-[#111827] leading-[1.1]"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
          >
            Warung{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mahaasyik
            </span>
          </h2>
          <div
            className="w-[60px] h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }}
          />
          <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-base leading-relaxed">
            Berdiri sejak 2018, Warung Mahaasyik hadir sebagai tempat untuk menikmati
            cita rasa asli Ayam Pecak. Kami percaya bahwa makanan yang baik
            dimulai dari bahan-bahan segar berkualitas dan bumbu rempah yang autentik.
          </p>
          <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-base leading-relaxed">
            Setiap hidangan dimasak dengan penuh kehati-hatian oleh tim chef
            berpengalaman yang mencintai kekayaan kuliner Nusantara — dari nasi liwet
            hangat hingga sambal terasi segar, kami hadirkan suasana makan yang nyaman
            dan berkesan.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#111827] transition-colors duration-200 hover:bg-[#E8D5C0]"
                style={{ background: "#F0E6D8" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{f.emoji}</span>
                {f.label}
              </div>
            ))}
          </div>
          <div className="pt-1">
            <button
              onClick={() => navigate?.("about")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-['Outfit'] font-bold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                boxShadow: "0 4px 16px rgba(211, 15, 37, 0.32)",
                fontSize: "0.9375rem",
              }}
            >
              Selengkapnya →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
