import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative inline-flex">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(37,211,102,0.5)",
            animationName: "wa-pulse",
            animationDuration: "2s",
            animationTimingFunction: "ease-out",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        />
        <button
          onClick={() => window.open('https://wa.me/6287855448205?text=permisi%20kak%2C%20saya%20ingin%20bertanya...', '_blank')}
          className="relative inline-flex items-center gap-2 rounded-full font-['Outfit'] font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style={{
            background: "#25D366",
            boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
            padding: "0.75rem 1rem",
          }}
        >
          <span className="text-xl leading-none">💬</span>
          <span className="hidden md:inline whitespace-nowrap">WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
