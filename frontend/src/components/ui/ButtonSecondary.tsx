import { SIZES } from '@/constants';
import { BASE_BTN } from '@/constants';
import { BtnSize } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function ButtonSecondary({
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
      className={`${BASE_BTN} border-2 border-[#D30F25] text-[#D30F25] bg-transparent hover:bg-[#D30F25] hover:text-white ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}
