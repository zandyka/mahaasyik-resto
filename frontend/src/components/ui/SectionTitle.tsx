import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function SectionTitle({
  children,
  subtitle,
  gradient = false,
}: {
  children: React.ReactNode;
  subtitle?: string;
  gradient?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2
        className="font-['Outfit'] font-black text-3xl md:text-4xl leading-tight"
        style={
          gradient
            ? {
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: "#111827" }
        }
      >
        {children}
      </h2>
      {subtitle && (
        <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-base leading-relaxed max-w-lg">
          {subtitle}
        </p>
      )}
      <div
        className="w-[60px] h-1 rounded-full mt-1"
        style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }}
      />
    </div>
  );
}
