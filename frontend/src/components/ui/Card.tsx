import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function Card({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: dark ? "#111827" : "#ffffff",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,0.25)"
          : "0 4px 24px rgba(17, 24, 39, 0.08), 0 1px 4px rgba(17, 24, 39, 0.04)",
      }}
    >
      {children}
    </div>
  );
}
