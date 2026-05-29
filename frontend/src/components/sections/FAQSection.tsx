import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/faqs').then(res => setFaqs(res.data.data)).catch(console.error);
  }, []);

  return (
    <section id="faq" className="py-20 md:py-24 px-5 md:px-8" style={{ background: "#F9FAFB" }}>
      <div className="max-w-[780px] mx-auto">
        <div className="flex flex-col items-center gap-2 mb-12">
          <h2
            className="font-['Outfit'] font-black text-[#111827] text-center leading-tight"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
          >
            Pertanyaan yang{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sering Diajukan
            </span>
          </h2>
          <div
            className="w-[60px] h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  boxShadow: "0 2px 10px rgba(17, 24, 39,0.07)",
                  borderLeft: isOpen ? "4px solid #D30F25" : "4px solid transparent",
                }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  <p
                    className="font-['Outfit'] font-semibold text-base leading-snug"
                    style={{ color: isOpen ? "#D30F25" : "#111827" }}
                  >
                    {item.question}
                  </p>
                  <span
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full font-bold text-lg"
                    style={{
                      border: "1.5px solid rgba(211, 15, 37,0.35)",
                      color: "#D30F25",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
