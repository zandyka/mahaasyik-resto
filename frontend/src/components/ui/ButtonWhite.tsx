import { SIZES } from '@/constants';
import { BASE_BTN } from '@/constants';
import { BtnSize } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function ButtonWhite({
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
      className={`${BASE_BTN} bg-white text-[#111827] hover:shadow-xl hover:-translate-y-0.5 ${SIZES[size]} ${className}`}
      style={{ boxShadow: "0 4px 12px rgba(17, 24, 39, 0.14)" }}
    >
      {children}
    </button>
  );
}
