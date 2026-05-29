import { STEP_LABELS } from '@/constants';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="max-w-md mx-auto mb-10 px-2">
      <div className="flex items-center">
        {STEP_LABELS.map((label, i) => {
          const num = i + 1;
          const done = step > num;
          const active = step === num;
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-2 shrink-0" style={{ minWidth: 64 }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-['Outfit'] font-black text-base transition-all duration-300"
                  style={done
                    ? { background: "linear-gradient(135deg,#D30F25,#FFEC01)", color: "white", boxShadow: "0 3px 12px rgba(211, 15, 37,0.4)" }
                    : active
                    ? { border: "2.5px solid #D30F25", color: "#D30F25", background: "rgba(211, 15, 37,0.06)" }
                    : { border: "2px solid rgba(17, 24, 39,0.18)", color: "rgba(17, 24, 39,0.32)", background: "transparent" }}
                >
                  {done ? "✓" : num}
                </div>
                <span
                  className="font-['Plus_Jakarta_Sans'] text-xs text-center leading-tight"
                  style={{
                    fontWeight: active || done ? 700 : 500,
                    color: active || done ? "#D30F25" : "rgba(17, 24, 39,0.38)",
                    maxWidth: 70,
                  }}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className="flex-1 h-[2px] mb-7 mx-1 rounded-full transition-all duration-500"
                  style={{ background: done ? "linear-gradient(90deg,#D30F25,#FFEC01)" : "rgba(17, 24, 39,0.12)" }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
