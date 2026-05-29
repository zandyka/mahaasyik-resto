import { GALLERY_SLIDES } from '@/constants';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function GallerySection() {
  const [active, setActive] = useState(0);
  const slide = GALLERY_SLIDES[active];

  return (
    <section id="galeri" className="py-20 md:py-24 px-5 md:px-8" style={{ background: "#F9FAFB" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-2 mb-12">
          <h2
            className="font-['Outfit'] font-black text-[#111827] text-center leading-tight"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
          >
            Suasana{" "}
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
        </div>

        <div
          className="relative overflow-hidden mb-5"
          style={{ aspectRatio: "16 / 9", borderRadius: 32 }}
        >
          <div className="absolute inset-0 transition-all duration-500 bg-[#E2E8F0]">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
          <div
            className="absolute bottom-0 inset-x-0 px-7 py-6"
            style={{
              background: "linear-gradient(to top, rgba(20,8,4,0.78) 0%, rgba(20,8,4,0.3) 60%, transparent 100%)",
            }}
          >
            <p className="font-['Outfit'] font-bold text-white text-xl md:text-2xl leading-tight mb-1">
              {slide.title}
            </p>
            <p className="font-['Plus_Jakarta_Sans'] text-sm" style={{ color: "rgba(255,255,255,0.78)" }}>
              {slide.subtitle}
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap mb-5">
          {GALLERY_SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="shrink-0 overflow-hidden transition-all duration-200 hover:scale-105 focus:outline-none"
              style={{
                width: 100,
                aspectRatio: "1 / 1",
                borderRadius: 12,
                border: active === i ? "3px solid #D30F25" : "3px solid transparent",
                boxShadow: active === i ? "0 0 0 2px rgba(211, 15, 37,0.25)" : "none",
              }}
            >
              <div className="w-full h-full bg-[#E2E8F0]">
                <img 
                  src={s.image} 
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          {GALLERY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300 focus:outline-none"
              style={{
                height: 8,
                width: active === i ? 28 : 8,
                background:
                  active === i
                    ? "linear-gradient(90deg, #D30F25, #FFEC01)"
                    : "rgba(17, 24, 39,0.22)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
