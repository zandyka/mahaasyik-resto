import { SIZES } from '@/constants';
import { BASE_BTN } from '@/constants';
import { BtnSize } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function ButtonGreen({
  children,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  size?: BtnSize;
  className?: string;
}) {
  return (
    <button
      className={`${BASE_BTN} text-white hover:brightness-110 hover:scale-[1.02] ${SIZES[size]} ${className}`}
      style={{
        background: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)",
        boxShadow: "0 4px 16px rgba(45, 106, 79, 0.30)",
      }}
    >
      {children}
    </button>
  );
}
