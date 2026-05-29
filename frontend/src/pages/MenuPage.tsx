import { MenuCard } from '@/components/ui/MenuCard';
import { CATEGORIES } from '@/constants';
import { Page } from '@/types';
import { MenuItemData } from '@/types';
import { mapMenuFromApi } from '@/utils/helpers';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function MenuPage({ navigate }: { navigate?: (page: Page) => void }) {
  const [menus, setMenus] = useState<MenuItemData[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    api.get('/menus').then(res => {
      setMenus(res.data.data.map(mapMenuFromApi));
    }).catch(console.error);
  }, []);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { Semua: menus.length };
    menus.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return map;
  }, [menus]);

  const filteredItems = useMemo(() => {
    let items = menus;
    if (activeCategory !== "Semua") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, activeCategory, menus]);

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      {/* Page header banner */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center px-5"
        style={{
          paddingTop: 120,
          paddingBottom: 72,
          background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(17, 24, 39,0.6) 0%, transparent 70%)",
            transform: "translate(-20%, 30%)",
          }}
        />

        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm mb-5"
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          🍽️ Warung Mahaasyik
        </div>

        <h1
          className="font-['Outfit'] font-black text-white leading-tight"
          style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}
        >
          Menu{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FFE066 0%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Kami
          </span>
        </h1>
        <p
          className="font-['Plus_Jakarta_Sans'] mt-4 max-w-md"
          style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.7 }}
        >
          Temukan hidangan Ayam Pecak autentik favoritmu — dari nasi liwet hangat hingga minuman tradisional yang segar.
        </p>

        {/* Wavy divider */}
        <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" style={{ display: "block" }} aria-hidden="true">
            <path
              d="M0,12 C240,44 480,4 720,24 C960,44 1200,8 1440,20 L1440,48 L0,48 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      {/* Sticky search + filters bar */}
      <div
        className="sticky z-30 px-5 md:px-8 py-5"
        style={{
          top: 72,
          background: "rgba(255, 255, 255,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(17, 24, 39,0.08)",
        }}
      >
        {/* Search bar */}
        <div className="max-w-[520px] mx-auto mb-4">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-full bg-white"
            style={{ boxShadow: "0 2px 16px rgba(17, 24, 39,0.10)", border: "1.5px solid rgba(211, 15, 37,0.15)" }}
          >
            <Search size={18} style={{ color: "#6B7280", flexShrink: 0 }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari menu favorit kamu..."
              className="search-input flex-1 bg-transparent font-['Plus_Jakarta_Sans'] text-sm text-[#111827] placeholder-[#9CA3AF]"
              style={{ border: "none", outline: "none" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white transition-all hover:scale-110"
                style={{ background: "rgba(17, 24, 39,0.25)" }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category filter pills */}
        <div className="cat-scroll flex gap-2.5 overflow-x-auto pb-1 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-['Outfit'] font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                        color: "white",
                        boxShadow: "0 3px 12px rgba(211, 15, 37,0.35)",
                      }
                    : {
                        background: "rgba(17, 24, 39,0.06)",
                        color: "#4B5563",
                      }
                }
              >
                {cat}
                <span
                  className="inline-flex items-center justify-center rounded-full font-semibold"
                  style={{
                    fontSize: "0.65rem",
                    minWidth: "1.2rem",
                    height: "1.2rem",
                    padding: "0 0.3rem",
                    background: isActive ? "rgba(255,255,255,0.25)" : "rgba(17, 24, 39,0.1)",
                    color: isActive ? "white" : "#6B7280",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        {/* Result count */}
        <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#6B7280] mb-6">
          Menampilkan <span className="font-semibold text-[#111827]">{filteredItems.length}</span> menu
          {activeCategory !== "Semua" && (
            <> dalam kategori <span className="font-semibold text-[#D30F25]">{activeCategory}</span></>
          )}
          {search && (
            <> untuk pencarian <span className="font-semibold text-[#D30F25]">&ldquo;{search}&rdquo;</span></>
          )}
        </p>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span style={{ fontSize: "4.5rem" }}>🍽️</span>
            <p className="font-['Outfit'] font-black text-[#111827] text-2xl">
              Menu tidak ditemukan
            </p>
            <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-sm max-w-xs">
              Coba kata kunci lain atau pilih kategori yang berbeda
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("Semua"); }}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full font-['Outfit'] font-bold text-sm text-white transition-all hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                boxShadow: "0 4px 16px rgba(211, 15, 37,0.32)",
              }}
            >
              🔄 Reset Filter
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

