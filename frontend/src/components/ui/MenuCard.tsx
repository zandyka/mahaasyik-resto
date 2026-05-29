import { MenuItemData } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function MenuCard({ item }: { item: MenuItemData }) {
  return (
    <div className="menu-card bg-white rounded-3xl overflow-hidden cursor-pointer">
        <div className="relative" style={{ aspectRatio: "4 / 3", background: "#f3f4f6" }}>
          <img
            src={item.image || `https://placehold.co/600x450/e5e7eb/6b7280.png?text=${encodeURIComponent(item.name)}`}
            alt={`${item.name} 4:3`}
            className="absolute inset-0 w-full h-full object-cover"
          />

        {item.andalan && (
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

        {!item.available && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-['Outfit'] font-bold text-xs text-white"
            style={{ background: "rgba(0,0,0,0.55)" }}
          >
            Habis
          </div>
        )}

      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[#D30F25]"
            style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}
          >
            {item.category.toUpperCase()}
          </p>
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: item.available ? "#2D6A4F" : "#9CA3AF" }}
            title={item.available ? "Tersedia" : "Habis"}
          />
        </div>
        <h3
          className="font-['Outfit'] font-bold text-[#111827] mb-1.5"
          style={{ fontSize: "1.05rem" }}
        >
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
            className="inline-flex items-center px-4 py-1.5 rounded-full font-['Outfit'] font-bold text-xs text-white transition-all duration-200"
            style={{
              background: item.available
                ? "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)"
                : "#9CA3AF",
              boxShadow: item.available ? "0 2px 8px rgba(211, 15, 37,0.28)" : "none",
              opacity: item.available ? 1 : 0.65,
              cursor: item.available ? "pointer" : "not-allowed",
            }}
            disabled={!item.available}
          >
            {item.available ? "Pesan" : "Habis"}
          </button>
        </div>
      </div>
    </div>
  );
}

