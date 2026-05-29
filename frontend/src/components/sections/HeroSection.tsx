import { FLOATING_EMOJIS } from '@/constants';
import { GLASS_STYLE } from '@/constants';
import { HERO_TAGS } from '@/constants';
import { Page } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function HeroSection({ navigate }: { navigate?: (page: Page) => void }) {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(140deg, #111827 0%, #B83A12 35%, #D30F25 62%, #FFEC01 100%)",
      }}
    >
      {FLOATING_EMOJIS.map((e, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: e.top,
            ...(e.left ? { left: e.left } : { right: e.right }),
            fontSize: e.size,
            opacity: 0.28,
            animationName: e.animation,
            animationDuration: e.duration,
            animationDelay: e.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        >
          {e.emoji}
        </span>
      ))}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 236, 1,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-3xl mx-auto gap-7 pt-20">
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm text-white"
          style={GLASS_STYLE}
        >
          🏆 Restoran Sajian Ayam Pecak Terbaik
        </div>

        <h1
          className="font-['Outfit'] font-black text-white leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 6.5vw, 4.5rem)" }}
        >
          Rasakan{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFE066 0%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Cita Rasa
          </span>
          <br />
          Ayam Pecak
        </h1>

        <p
          className="font-['Plus_Jakarta_Sans'] leading-relaxed max-w-[600px]"
          style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.82)" }}
        >
          Nikmati sajian khas Ayam Pecak diolah dengan bumbu rempah pilihan dan cinta yang
          sesungguhnya.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate?.("reservasi")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-['Outfit'] font-bold text-[#D30F25] bg-white transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.97]"
            style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.22)", fontSize: "0.9375rem" }}
          >
            🗓️ Reservasi Sekarang
          </button>
          <button
            onClick={() => navigate?.("menu")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-['Outfit'] font-bold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{ ...GLASS_STYLE, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", fontSize: "0.9375rem" }}
          >
            🍽️ Lihat Menu
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-white px-4 py-2 rounded-full"
              style={GLASS_STYLE}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 88"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <path
            d="M0,28 C180,72 360,8 540,36 C720,64 900,8 1080,38 C1260,68 1380,18 1440,32 L1440,88 L0,88 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
