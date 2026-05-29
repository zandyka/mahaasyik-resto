import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function ResInput({
  type = "text", value, onChange, placeholder, rows, min
}: {
  type?: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; min?: string;
}) {
  const base: React.CSSProperties = {
    background: "#F0E6D8",
    border: "1.5px solid rgba(17, 24, 39,0.12)",
    borderRadius: 12,
    padding: "11px 14px",
    fontSize: "0.875rem",
    color: "#111827",
    width: "100%",
    fontFamily: "Plus Jakarta Sans, sans-serif",
  };
  if (rows) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="res-input"
        style={{ ...base, resize: "none", outline: "none" }}
      />
    );
  }
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="res-input"
      style={{ ...base, outline: "none" }}
    />
  );
}
