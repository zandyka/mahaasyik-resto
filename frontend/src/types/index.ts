import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";

export type BtnSize = "sm" | "md" | "lg";
export type BadgeColor = "orange" | "green" | "yellow" | "indigo" | "brown";
export type Page = "home" | "menu" | "reservasi" | "delivery" | "about" | "history";
export type FloatingEmoji = {
      emoji: string;
      top: string;
      left?: string;
      right?: string;
      animation: string;
      duration: string;
      delay: string;
      size: string;
    };
export type MenuItemData = {
      emoji: string;
      gradient: string;
      category: string;
      name: string;
      desc: string;
      price: string;
      available: boolean;
      andalan?: boolean;
      image?: string;
      id?: number;
    };

