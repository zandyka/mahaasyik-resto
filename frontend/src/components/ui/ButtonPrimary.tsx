import { SIZES } from '@/constants';
import { BASE_BTN } from '@/constants';
import { BtnSize } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function ButtonPrimary({
  children,
  size = "md",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  size?: BtnSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${BASE_BTN} text-white hover:brightness-110 hover:scale-[1.02] ${SIZES[size]} ${className}`}
      style={{
        background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
        boxShadow: "0 4px 16px rgba(211, 15, 37, 0.32)",
      }}
    >
      {children}
    </button>
  );
}
