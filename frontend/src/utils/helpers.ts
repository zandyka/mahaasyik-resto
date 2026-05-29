import { GRADIENTS } from '@/constants';
import { EMOJIS } from '@/constants';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function mapMenuFromApi(item: any) {
  // deterministic random based on id
  const grad = GRADIENTS[(item.id * 7) % GRADIENTS.length];
  const emoji = EMOJIS[(item.id * 3) % EMOJIS.length];

  return {
    id: item.id, // need id for reservations!
    emoji,
    gradient: grad,
    category: item.category?.name || "Lainnya",
    name: item.name,
    desc: item.description,
    price: "Rp " + item.price.toLocaleString("id-ID"),
    available: item.is_available,
    andalan: item.is_recommended,
    rawPrice: item.price,
    image: item.image_path ? "http://localhost:8000/storage/" + item.image_path : undefined,
  };
}
export function parsePrice(price: string): number {
  return parseInt(price.replace(/\D/g, ""), 10) || 0;
}
export function formatRp(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

