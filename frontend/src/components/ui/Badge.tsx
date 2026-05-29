import { BADGE_STYLES } from '@/constants';
import { BadgeColor } from '@/types';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function Badge({
  label,
  color = "orange",
}: {
  label: string;
  color?: BadgeColor;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-['Plus_Jakarta_Sans'] font-semibold border ${BADGE_STYLES[color]}`}
    >
      {label}
    </span>
  );
}
