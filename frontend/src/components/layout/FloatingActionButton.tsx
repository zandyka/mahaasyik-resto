import { Page } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function FloatingActionButton({ navigate }: { navigate?: (page: Page) => void }) {
  const [open, setOpen] = useState(false);

  const options = [
    { emoji: "🛵", label: "Pesan Delivery" },
    { emoji: "🗓️", label: "Reservasi Meja" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.38)" }}
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        {open && options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              setOpen(false);
              navigate?.(opt.label === "Pesan Delivery" ? "delivery" : "reservasi");
            }}
            className="fab-option flex items-center gap-2 px-5 py-2.5 rounded-full font-['Outfit'] font-bold text-sm text-white whitespace-nowrap hover:brightness-110 active:scale-95 transition-all pointer-events-auto"
            style={{
              background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
              boxShadow: "0 4px 20px rgba(211, 15, 37,0.45)",
              animationDelay: `${i * 0.07}s`,
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{opt.emoji}</span>
            {opt.label}
          </button>
        ))}

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-2xl text-white transition-all duration-200 hover:scale-110 hover:brightness-110 active:scale-95 pointer-events-auto"
          style={{
            background: open
              ? "linear-gradient(135deg, #111827 0%, #7A3A18 100%)"
              : "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
            boxShadow: "0 6px 28px rgba(211, 15, 37,0.55)",
            fontSize: open ? "1.4rem" : "1.6rem",
            transition: "all 0.2s ease",
          }}
          aria-label={open ? "Tutup menu" : "Buka menu pesanan"}
        >
          {open ? "✕" : "🛒"}
        </button>
      </div>
    </>
  );
}
