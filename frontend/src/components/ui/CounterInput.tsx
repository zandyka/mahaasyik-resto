import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function CounterInput({
  value, onChange, min = 0, max = 20,
}: { value: number; onChange: (v: number) => void; min?: number; max?: number; }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110 active:scale-90 disabled:cursor-not-allowed"
        style={value <= min
          ? { background: "rgba(17, 24, 39,0.07)", color: "#9CA3AF" }
          : { background: "linear-gradient(135deg,#D30F25,#FFEC01)", color: "white", boxShadow: "0 2px 8px rgba(211, 15, 37,0.3)" }}
      >
        −
      </button>
      <span className="font-['Outfit'] font-black text-[#111827] text-xl w-7 text-center select-none">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-110 active:scale-90 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)", color: "white", boxShadow: "0 2px 8px rgba(211, 15, 37,0.3)" }}
      >
        +
      </button>
    </div>
  );
}
