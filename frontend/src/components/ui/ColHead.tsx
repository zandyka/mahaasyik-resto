import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="font-['Outfit'] font-black text-white text-base mb-1.5">{children}</p>
      <div
        className="w-8 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }}
      />
    </div>
  );
}
