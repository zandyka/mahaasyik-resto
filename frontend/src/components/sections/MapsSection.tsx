import { INFO_ROWS } from '@/constants';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function MapsSection() {
  return (
    <section id="lokasi" className="py-20 md:py-24 px-5 md:px-8" style={{ background: "#F9FAFB" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-2 mb-12">
          <h2
            className="font-['Outfit'] font-black text-[#111827] text-center leading-tight"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
          >
            Temukan{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kami
            </span>
            {" "}di Sini
          </h2>
          <div
            className="w-[60px] h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div
            className="relative overflow-hidden flex items-center justify-center w-full"
            style={{
              height: 440,
              borderRadius: 32,
              background: "#E2E8F0",
              boxShadow: "0 8px 32px rgba(17, 24, 39,0.14)",
            }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127423.0140900176!2d98.72436185142409!3d3.5945378109659822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031379314fab3e1%3A0xa32fb1d9afebd9cd!2sMahaasyik!5e0!3m2!1sid!2sid!4v1780068693173!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div
            className="bg-white flex flex-col gap-6 p-10"
            style={{ borderRadius: 32, boxShadow: "0 4px 24px rgba(17, 24, 39,0.09)" }}
          >
            <h3 className="font-['Outfit'] font-black text-[#111827] text-xl">
              📍 Alamat Kami
            </h3>
            <div className="flex flex-col gap-5">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex items-start gap-4">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "rgba(211, 15, 37,0.08)" }}
                  >
                    {row.icon}
                  </span>
                  <div>
                    <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#6B7280] uppercase tracking-wide mb-0.5">
                      {row.label}
                    </p>
                    <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#111827] leading-snug">
                      {row.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.open('https://maps.app.goo.gl/Ackz2QbQeZAuWbU18', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-['Outfit'] font-bold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] self-start mt-2"
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                boxShadow: "0 4px 16px rgba(211, 15, 37,0.32)",
                fontSize: "0.9rem",
              }}
            >
              🗺️ Buka di Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

