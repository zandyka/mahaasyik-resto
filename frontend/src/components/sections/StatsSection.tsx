import { STATS } from '@/constants';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function StatsSection() {
  return (
    <section id="stats" className="py-16 md:py-20 px-5 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="stat-card flex flex-col items-center gap-3 p-7 rounded-3xl text-center cursor-default hover:-translate-y-1.5"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFE8C8 100%)",
            }}
          >
            <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>{s.emoji}</span>
            <span
              className="font-['Outfit'] font-black leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.value}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#4B5563] leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
