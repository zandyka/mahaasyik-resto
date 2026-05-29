import { Page } from '@/types';
import { MenuItemData } from '@/types';
import { mapMenuFromApi } from '@/utils/helpers';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function MenuSection({ navigate }: { navigate?: (page: Page) => void }) {
  const [menus, setMenus] = useState<MenuItemData[]>([]);

  useEffect(() => {
    api.get('/menus?recommended=1').then(res => {
      setMenus(res.data.data.map(mapMenuFromApi));
    }).catch(console.error);
  }, []);

  return (
    <section id="menu" className="py-20 md:py-24 px-5 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-2 mb-3">
          <h2
            className="font-['Outfit'] font-black text-[#111827] text-center leading-tight"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
          >
            Menu{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Pilihan Kami
            </span>
          </h2>
          <div
            className="w-[60px] h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }}
          />
          <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-base text-center mt-1">
            Hidangan terbaik yang paling disukai pelanggan
          </p>
        </div>
        <div className="mt-10 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 md:pb-0">
          {menus.slice(0, 6).map((item) => (
            <div
              key={item.name}
              className="menu-card shrink-0 w-[85vw] md:w-auto snap-center bg-white rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="relative" style={{ aspectRatio: "4 / 3", background: "#f3f4f6" }}>
                <img
                  src={item.image || `https://placehold.co/600x450/e5e7eb/6b7280.png?text=${encodeURIComponent(item.name)}`}
                  alt={`${item.name} 4:3`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {item.recommended && (
                  <div
                    className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full font-['Outfit'] font-bold text-xs text-white"
                    style={{
                      background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                      boxShadow: "0 2px 8px rgba(211, 15, 37,0.35)",
                    }}
                  >
                    ⭐ Andalan
                  </div>
                )}
              </div>
              <div className="p-5">
                <p
                  className="font-['Plus_Jakarta_Sans'] font-semibold text-[#D30F25] mb-1"
                  style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}
                >
                  {item.category}
                </p>
                <h3 className="font-['Outfit'] font-bold text-[#111827] mb-1.5" style={{ fontSize: "1.1rem" }}>
                  {item.name}
                </h3>
                <p
                  className="font-['Plus_Jakarta_Sans'] text-[#4B5563] mb-4 leading-relaxed overflow-hidden"
                  style={{
                    fontSize: "0.8125rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="font-['Outfit'] font-black"
                    style={{
                      fontSize: "1.125rem",
                      background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.price}
                  </span>
                  <button
                    className="inline-flex items-center px-4 py-1.5 rounded-full font-['Outfit'] font-bold text-xs text-white transition-all duration-200 hover:brightness-110 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                      boxShadow: "0 2px 8px rgba(211, 15, 37,0.28)",
                    }}
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate?.("menu")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-['Outfit'] font-bold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
              boxShadow: "0 4px 20px rgba(211, 15, 37,0.32)",
              fontSize: "0.9375rem",
            }}
          >
            Lihat Semua Menu →
          </button>
        </div>
      </div>
    </section>
  );
}

