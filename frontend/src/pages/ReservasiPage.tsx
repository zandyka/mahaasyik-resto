import { Footer } from '@/components/layout/Footer';
import { CounterInput } from '@/components/ui/CounterInput';
import { ResInput } from '@/components/ui/ResInput';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { SEATING_OPTIONS } from '@/constants';
import { PAYMENT_METHODS } from '@/constants';
import { CARD } from '@/constants';
import { LABEL_CLS } from '@/constants';
import { CATEGORIES } from '@/constants';
import { Page } from '@/types';
import { MenuItemData } from '@/types';
import { mapMenuFromApi } from '@/utils/helpers';
import { parsePrice } from '@/utils/helpers';
import { formatRp } from '@/utils/helpers';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import Swal from "sweetalert2";
import api from "@/api";
export function ReservasiPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [menus, setMenus] = useState<MenuItemData[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [resCode, setResCode] = useState('');

  useEffect(() => {
    api.get('/menus').then(res => setMenus(res.data.data.map(mapMenuFromApi))).catch(console.error);
  }, []);

  // Step 1
  const [adults, setAdults]   = useState(2);
  const [kids,   setKids]     = useState(0);
  const [date,   setDate]     = useState("");
  const [time,   setTime]     = useState("");
  const [seating, setSeating] = useState("");

  const OPEN_HOUR = 10;  // Restoran buka pukul 10.00
  const CLOSE_HOUR = 23; // Restoran tutup pukul 23.00 (last order 22.30)

  const dateError = useMemo(() => {
    if (!date || !time) return "";
    const selected = new Date(`${date}T${time}`);
    if (selected < new Date()) return "Pilih waktu di masa depan.";
    const [hh, mm] = time.split(":").map(Number);
    const totalMin = hh * 60 + mm;
    if (totalMin < OPEN_HOUR * 60) return `Restoran buka pukul ${OPEN_HOUR}.00 WIB. Silakan pilih jam sesudahnya.`;
    if (totalMin > CLOSE_HOUR * 60) return `Restoran tutup pukul ${CLOSE_HOUR}.00 WIB. Last order pukul 22.30.`;
    return "";
  }, [date, time]);

  // Step 2
  const [name,       setName]       = useState("");
  const [phone,      setPhone]      = useState("");
  const [email,      setEmail]      = useState("");
  const [notes,      setNotes]      = useState("");
  const [promoCode,  setPromoCode]  = useState("");
  const [promoState, setPromoState] = useState<"idle" | "valid" | "invalid">("idle");
  const [orderMode,  setOrderMode]  = useState<"none" | "order">("none");
  const [orderQty,   setOrderQty]   = useState<Record<string, number>>({});
  const [paymentMethod, setPaymentMethod] = useState("");

  const reservationCode = useMemo(() => {
    const d  = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(2);
    const rnd = Math.floor(Math.random() * 900 + 100);
    return `MHA-${dd}${mm}${yy}-${rnd}`;
  }, []);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const filteredItems = useMemo(() => {
    let items = menus.filter(i => i.available);
    if (activeCategory !== "Semua") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
    }
    return items;
  }, [search, activeCategory, menus]);

  const availableItems = menus.filter((i) => i.available);

  const subtotal = availableItems.reduce((sum, item) => {
    return sum + (orderQty[item.name] || 0) * parsePrice(item.price);
  }, 0);

  const [promoSavings, setPromoSavings] = useState(0);
  const total = subtotal - promoSavings;
  const dp    = Math.round(total * 0.3);

  const handleValidatePromo = () => {
    api.post('/promos/validate', { code: promoCode, subtotal })
       .then(res => {
         setPromoState("valid");
         setPromoSavings(res.data.discount_amount);
       })
       .catch(err => {
         setPromoState("invalid");
         setPromoSavings(0);
       });
  };

  const handleSubmit = async (isDemo: boolean = false) => {
    try {
      const mapSeating = (val: string) => {
        if (val.includes("Outdoor")) return "outdoor_lt1";
        if (val.includes("No Smoking")) return "indoor_lt1_nosmoking";
        if (val.includes("Indoor")) return "indoor_lt1";
        if (val.includes("Lantai 2")) return "lt2_ac";
        return "outdoor_lt1";
      };

      const payload = {
        name, phone, email: email || "guest@mahaasyik.com", date, time, adults: Number(adults), children: Number(kids), seating_area: mapSeating(seating), message: notes,
        has_order: hasOrder,
        promo_code: promoState === "valid" ? promoCode : null,
        items: hasOrder ? Object.keys(orderQty).map(menuName => {
           const menu = menus.find(m => m.name === menuName);
           return { menu_id: menu?.id, quantity: orderQty[menuName] };
        }).filter(item => item.quantity > 0) : []
      };

      const res = await api.post('/reservations', payload);
      if (res.data.success && res.data.data?.reservation_code) setResCode(res.data.data.reservation_code);
      // Reservasi tanpa order langsung berhasil (tidak butuh pembayaran)
      if (res.data.success && res.data.requires_payment === false) {
        setSubmitted(true);
        return;
      }
      // Reservasi dengan order butuh pembayaran DP via Midtrans
      if (res.data.success && res.data.snap_token) {
        if (isDemo) {
          Swal.fire({
            icon: 'info',
            title: 'Mode Demo',
            text: 'Pembayaran Midtrans disimulasikan berhasil (Bypass)',
            confirmButtonColor: '#D30F25'
          });
          setSubmitted(true);
        } else {
          // @ts-ignore
          window.snap.pay(res.data.snap_token, {
            onSuccess: function() { setSubmitted(true); },
            onPending: function() { setSubmitted(true); },
            onError: function() { 
              Swal.fire({ icon: 'error', title: 'Oops...', text: 'Pembayaran gagal', confirmButtonColor: '#D30F25' }); 
            },
            onClose: function() { 
              Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Tutup pop-up pembayaran tanpa menyelesaikan?', confirmButtonColor: '#D30F25' }); 
            }
          });
        }
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: res.data.message || 'Gagal memproses pembayaran', confirmButtonColor: '#D30F25' });
      };
    } catch(e) {
      console.error(e);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Gagal membuat reservasi!', confirmButtonColor: '#D30F25' });
    }
  };

  const resetAll = () => {
    setStep(1);
    setAdults(2); setKids(0); setDate(""); setTime(""); setSeating("");
    setName(""); setPhone(""); setEmail(""); setNotes("");
    setPromoCode(""); setPromoState("idle");
    setOrderMode("none"); setOrderQty({}); setPaymentMethod("");
  };

  const hasOrder = orderMode === "order" && subtotal > 0;

  // ─── Date display helper
  const dateDisplay = date
    ? new Date(date + "T00:00:00").toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    : "–";

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* Page header banner */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center px-5"
        style={{ paddingTop: 116, paddingBottom: 72, background: "linear-gradient(135deg, #1A3A5C 0%, #D30F25 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle, rgba(255, 236, 1,0.7) 0%, transparent 70%)", transform: "translate(25%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)", transform: "translate(-20%,30%)" }} />

        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm mb-5"
          style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
        >
          🗓️ Warung Mahaasyik
        </div>
        <h1 className="font-['Outfit'] font-black text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 6vw, 4rem)" }}>
          Reservasi{" "}
          <span style={{ background: "linear-gradient(135deg,#FFE066 0%,#FFD700 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Meja
          </span>
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] mt-3 max-w-md" style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", lineHeight: 1.7 }}>
          Pesan meja sekarang dan nikmati pengalaman makan Ayam Pecak autentik yang tak terlupakan bersama keluarga.
        </p>
        <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" style={{ display: "block" }} aria-hidden="true">
            <path d="M0,10 C360,48 720,4 1080,30 C1260,44 1380,12 1440,22 L1440,48 L0,48 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-xl mx-auto px-5 md:px-8 py-12">

        <StepIndicator step={step} />

        {/* ── STEP 1 ─────────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div style={CARD}>
            <h3 className="font-['Outfit'] font-black text-[#111827] text-xl mb-6">
              Pilih Jadwal & Tempat
            </h3>

            {/* Guest counters */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: "Jumlah Dewasa", value: adults, onChange: setAdults, min: 1 },
                { label: "Jumlah Anak",   value: kids,   onChange: setKids,   min: 0 },
              ].map((c) => (
                <div key={c.label} className="flex flex-col gap-3 p-4 rounded-2xl" style={{ background: "#FFFFFF" }}>
                  <p className={LABEL_CLS}>{c.label}</p>
                  <CounterInput value={c.value} onChange={c.onChange} min={c.min} />
                </div>
              ))}
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLS}>Tanggal</label>
                <ResInput type="date" value={date} onChange={setDate} min={new Date().toLocaleDateString('en-CA')} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLS}>Jam</label>
                <ResInput type="time" value={time} onChange={setTime} />
              </div>
            </div>
            {dateError && (
              <p className="text-[#C62828] text-xs font-['Plus_Jakarta_Sans'] mb-4 -mt-2">
                *{dateError}
              </p>
            )}

            {/* Seating area */}
            <div className="mb-7">
              <p className={`${LABEL_CLS} mb-3`}>Pilih Area Duduk</p>
              <div className="grid grid-cols-2 gap-3">
                {SEATING_OPTIONS.map((opt) => {
                  const sel = seating === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSeating(opt.label)}
                      className="relative text-left p-4 rounded-2xl flex flex-col gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        border: sel ? "2px solid #D30F25" : "2px solid rgba(17, 24, 39,0.11)",
                        background: sel ? "rgba(211, 15, 37,0.04)" : "white",
                        boxShadow: sel ? "0 4px 18px rgba(211, 15, 37,0.18)" : "0 2px 8px rgba(17, 24, 39,0.06)",
                      }}
                    >
                      {sel && (
                        <div
                          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black"
                          style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)" }}
                        >
                          ✓
                        </div>
                      )}
                      <span style={{ fontSize: "1.9rem" }}>{opt.emoji}</span>
                      <p className="font-['Outfit'] font-bold text-[#111827] text-sm leading-tight">{opt.label}</p>
                      <p className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs leading-tight">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!date || !time || !seating || !!dateError}
              className="w-full py-4 rounded-full font-['Outfit'] font-bold text-white text-base transition-all duration-200 hover:brightness-110 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", boxShadow: date && time && seating ? "0 6px 24px rgba(211, 15, 37,0.38)" : "none" }}
            >
              Lanjut →
            </button>
          </div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div style={CARD}>
            <h3 className="font-['Outfit'] font-black text-[#111827] text-xl mb-6">
              Informasi Booking
            </h3>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className={LABEL_CLS}>Nama Lengkap</label>
              <ResInput value={name} onChange={setName} placeholder="Masukkan nama lengkap..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLS}>No. HP</label>
                <ResInput type="tel" value={phone} onChange={setPhone} placeholder="08xx-xxxx-xxxx" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={LABEL_CLS}>Email</label>
                <ResInput type="email" value={email} onChange={setEmail} placeholder="email@contoh.com" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label className={LABEL_CLS}>
                Pesan / Preferensi{" "}
                <span className="normal-case font-normal text-[#9CA3AF]">(opsional)</span>
              </label>
              <ResInput value={notes} onChange={setNotes} rows={3}
                placeholder="Contoh: alergi kacang, kursi dekat jendela, anniversary dinner..." />
            </div>

            {/* Promo code */}
            <div className="mb-5">
              <label className={`${LABEL_CLS} block mb-1.5`}>Kode Promo</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <ResInput
                    value={promoCode}
                    onChange={(v) => { setPromoCode(v.toUpperCase()); setPromoState("idle"); }}
                    placeholder="Masukkan kode promo..."
                  />
                </div>
                <button
                  onClick={handleValidatePromo}
                  disabled={!promoCode.trim()}
                  className="shrink-0 px-5 py-2.5 rounded-xl font-['Outfit'] font-bold text-sm border-2 border-[#D30F25] text-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Validasi
                </button>
              </div>
              {promoState === "valid" && (
                <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm"
                  style={{ background: "rgba(45,106,79,0.1)", color: "#2D6A4F", border: "1px solid rgba(45,106,79,0.2)" }}>
                  🎉 Hemat {formatRp(promoSavings)}!
                </div>
              )}
              {promoState === "invalid" && (
                <p className="mt-1.5 font-['Plus_Jakarta_Sans'] text-xs text-red-500">
                  Kode promo tidak valid atau sudah kadaluarsa.
                </p>
              )}
            </div>

            {/* Order toggle */}
            <div className="mb-5">
              <p className={`${LABEL_CLS} mb-2`}>Sekalian Pesan Menu?</p>
              <div className="flex rounded-2xl overflow-hidden p-1 gap-1" style={{ background: "#F0E6D8" }}>
                {(["none", "order"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setOrderMode(mode)}
                    className="flex-1 py-2.5 px-3 rounded-xl font-['Outfit'] font-bold text-sm transition-all duration-200"
                    style={orderMode === mode
                      ? { background: "linear-gradient(135deg,#D30F25,#FFEC01)", color: "white", boxShadow: "0 2px 8px rgba(211, 15, 37,0.3)" }
                      : { color: "#4B5563" }}
                  >
                    {mode === "none" ? "Tidak, cukup reservasi" : "Ya, pesan menu"}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu order list */}
            {orderMode === "order" && (
              <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: "1.5px solid rgba(17, 24, 39,0.1)" }}>
                <div className="px-4 py-3 font-['Outfit'] font-bold text-sm text-[#111827]" style={{ background: "#FFFFFF" }}>
                  Pilih Menu
                </div>
                <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white border-b w-full" style={{ borderColor: 'rgba(17, 24, 39,0.06)' }}>
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <Search size={16} className="text-[#9CA3AF]" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari menu..." className="bg-transparent text-sm flex-1 outline-none" style={{ border: 'none', outline: 'none' }} />
                  </div>
                  <select 
                    value={activeCategory} 
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#4B5563] outline-none cursor-pointer w-full sm:w-auto"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div style={{ maxHeight: 288, overflowY: "auto" }}>
                  {filteredItems.map((item) => {
                    const qty = orderQty[item.name] || 0;
                    return (
                      <div key={item.name} className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: "rgba(17, 24, 39,0.06)" }}>
                          <div className="w-12 h-12 rounded-xl shrink-0 overflow-hidden bg-gray-100">
                            <img
                              src={`https://placehold.co/100x100/e5e7eb/6b7280.png?text=${encodeURIComponent(item.name.substring(0, 3))}`}
                              alt={`${item.name}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-['Outfit'] font-bold text-[#111827] text-sm leading-tight truncate">{item.name}</p>
                          <p className="font-['Outfit'] font-black text-xs"
                            style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            {item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setOrderQty({ ...orderQty, [item.name]: Math.max(0, qty - 1) })}
                            disabled={qty === 0}
                            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm disabled:opacity-30 transition-all"
                            style={qty > 0 ? { background: "linear-gradient(135deg,#D30F25,#FFEC01)", color: "white" } : { background: "rgba(17, 24, 39,0.1)", color: "#6B7280" }}
                          >−</button>
                          <span className="font-['Outfit'] font-black text-[#111827] text-sm w-5 text-center">{qty}</span>
                          <button
                            onClick={() => setOrderQty({ ...orderQty, [item.name]: qty + 1 })}
                            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-all hover:scale-110"
                            style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)", color: "white" }}
                          >+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t" style={{ background: "#FFFFFF", borderColor: "rgba(17, 24, 39,0.08)" }}>
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#4B5563] text-sm">Subtotal Pesanan</span>
                  <span className="font-['Outfit'] font-black text-base"
                    style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {formatRp(subtotal)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-full font-['Outfit'] font-bold text-[#D30F25] text-sm border-2 border-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all duration-200">
                ← Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!name.trim() || !phone.trim()}
                className="flex-1 py-4 rounded-full font-['Outfit'] font-bold text-white text-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", boxShadow: name && phone ? "0 6px 24px rgba(211, 15, 37,0.38)" : "none" }}
              >
                Lanjut →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────────────────────────── */}
        {step === 3 && !hasOrder && (
          <div className="flex flex-col gap-6">
            {/* Ticket card */}
            <div
              className="relative mx-auto w-full max-w-sm print-ticket"
              style={{ border: "2px dashed rgba(211, 15, 37,0.28)", borderRadius: 24, background: "white", boxShadow: "0 16px 56px rgba(17, 24, 39,0.14)" }}
            >
              {/* Header */}
              <div className="flex flex-col items-center gap-2 py-7 px-6 rounded-t-[22px]"
                style={{ background: submitted ? "linear-gradient(135deg,#1A3A5C 0%,#D30F25 100%)" : "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)" }}>
                <span style={{ fontSize: "2.6rem" }}>{submitted ? "🎟️" : "📋"}</span>
                <p className="font-['Outfit'] font-black text-white text-xl tracking-wide">Mahaasyik</p>
                <div className="px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-xs"
                  style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  {submitted ? "Tiket Reservasi" : "Konfirmasi Reservasi"}
                </div>
              </div>

              {/* Notch separator */}
              <div className="relative flex items-center px-7 py-0">
                <div className="absolute -left-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
                <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }} />
                <span className="px-3 text-sm font-bold" style={{ color: "rgba(211, 15, 37,0.35)" }}>✦ ✦ ✦</span>
                <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }} />
                <div className="absolute -right-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
              </div>

              {/* Reservation code */}
              {submitted && (
                <div className="flex flex-col items-center gap-1 py-5 px-6">
                  <p className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs uppercase tracking-widest">Kode Reservasi</p>
                  <p className="font-mono font-black text-2xl tracking-[0.18em]"
                    style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {reservationCode}
                  </p>
                </div>
              )}

              {/* Detail rows */}
              <div className="px-6 pb-2">
                {[
                  { icon: "👤", label: "Nama",    value: name },
                  { icon: "📞", label: "HP",       value: phone },
                  { icon: "🗓️", label: "Tanggal",  value: dateDisplay },
                  { icon: "⏰", label: "Jam",      value: time + " WIB" },
                  { icon: "📍", label: "Tempat",   value: seating },
                  { icon: "👥", label: "Tamu",     value: `${adults} Dewasa${kids > 0 ? ` + ${kids} Anak` : ""}` },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3 py-3 border-b" style={{ borderColor: "rgba(17, 24, 39,0.07)" }}>
                    <span className="text-base shrink-0 mt-0.5">{row.icon}</span>
                    <div className="flex-1 flex items-start justify-between gap-2">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#6B7280] text-xs shrink-0">{row.label}</span>
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#111827] text-xs text-right">{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer notch + note */}
              <div className="relative flex items-center px-7 py-0 mt-3">
                <div className="absolute -left-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
                <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }} />
                <div className="absolute -right-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
              </div>
              <div className="px-6 pt-4 pb-6 text-center">
                <p className="font-['Plus_Jakarta_Sans'] text-[#9CA3AF] text-xs leading-relaxed">
                  Tunjukkan tiket ini kepada staff kami. Harap tiba 5 menit sebelum waktu reservasi.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
              {!submitted ? (
                <>
                  <button onClick={() => handleSubmit(false)}
                    className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-white text-sm transition-all hover:brightness-110 hover:scale-[1.01]"
                    style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", boxShadow: "0 4px 16px rgba(211, 15, 37,0.32)" }}
                  >
                    ✓ Konfirmasi Reservasi
                  </button>
                  <button onClick={() => setStep(2)}
                    className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-[#D30F25] text-sm border-2 border-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all">
                    ← Kembali Edit Data
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { if(resCode) window.open('http://localhost:8000/api/reservations/' + resCode + '/ticket', '_blank'); else window.print(); }}
                    className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-white text-sm transition-all hover:brightness-110 hover:scale-[1.01]"
                    style={{ background: "linear-gradient(135deg,#1A3A5C 0%,#2D6A4F 100%)", boxShadow: "0 4px 16px rgba(26,58,92,0.32)" }}
                  >
                    🖨️ Print Tiket
                  </button>
                  <button onClick={resetAll}
                    className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-[#D30F25] text-sm border-2 border-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all">
                    Reservasi Baru Lagi
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {step === 3 && hasOrder && !submitted && (
          <div style={CARD}>
            <h3 className="font-['Outfit'] font-black text-[#111827] text-xl mb-5">
              Ringkasan Pembayaran
            </h3>

            {/* Summary rows */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between font-['Plus_Jakarta_Sans'] text-sm">
                <span className="text-[#4B5563]">Subtotal Pesanan</span>
                <span className="font-semibold text-[#111827]">{formatRp(subtotal)}</span>
              </div>
              {promoSavings > 0 && (
                <div className="flex justify-between font-['Plus_Jakarta_Sans'] text-sm">
                  <span className="font-semibold text-[#2D6A4F]">🎉 Diskon Promo</span>
                  <span className="font-semibold text-[#2D6A4F]">− {formatRp(promoSavings)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between" style={{ borderColor: "rgba(17, 24, 39,0.1)" }}>
                <span className="font-['Outfit'] font-bold text-[#111827]">Total</span>
                <span className="font-['Outfit'] font-bold text-[#111827]">{formatRp(total)}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl"
                style={{ background: "rgba(211, 15, 37,0.06)", border: "1px solid rgba(211, 15, 37,0.2)" }}>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#D30F25] text-xs mb-1">DP 30% (min. bayar)</p>
                  <p className="font-['Outfit'] font-black text-2xl"
                    style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {formatRp(dp)}
                  </p>
                </div>
                <span style={{ fontSize: "2.2rem" }}>💰</span>
              </div>
            </div>

            {/* Payment methods */}
            <p className={`${LABEL_CLS} mb-3`}>Pilih Metode Pembayaran</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {PAYMENT_METHODS.map((pm) => {
                const sel = paymentMethod === pm.label;
                return (
                  <button
                    key={pm.label}
                    onClick={() => setPaymentMethod(pm.label)}
                    className="relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      border: sel ? "2px solid #D30F25" : "2px solid rgba(17, 24, 39,0.1)",
                      background: sel ? "rgba(211, 15, 37,0.05)" : "white",
                      boxShadow: sel ? "0 4px 14px rgba(211, 15, 37,0.2)" : "0 2px 6px rgba(17, 24, 39,0.06)",
                    }}
                  >
                    {sel && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-black"
                        style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)" }}>
                        ✓
                      </div>
                    )}
                    <span style={{ fontSize: "1.65rem" }}>{pm.icon}</span>
                    <span className="font-['Outfit'] font-semibold text-[#111827] text-xs">{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Pay button */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSubmit(false)}
                disabled={!paymentMethod}
                className="flex-1 py-4 rounded-full font-['Outfit'] font-bold text-white text-base transition-all hover:brightness-110 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg,#1A3A5C 0%,#D30F25 100%)", boxShadow: paymentMethod ? "0 6px 28px rgba(26,58,92,0.38)" : "none" }}
              >
                Bayarkan
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={!paymentMethod}
                className="flex-1 py-4 rounded-full font-['Outfit'] font-bold text-[#6B7280] text-base transition-all hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#F5F5F5", border: "1px solid #E0E0E0" }}
              >
                Bayar (Demo)
              </button>
            </div>

            <div className="flex gap-3 mt-3">
              <button onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-full font-['Outfit'] font-bold text-[#D30F25] text-sm border-2 border-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all">
                ← Kembali
              </button>
              <button onClick={resetAll}
                className="flex-1 py-3.5 rounded-full font-['Outfit'] font-bold text-[#4B5563] text-sm border-2 border-[rgba(17, 24, 39,0.2)] hover:border-[#D30F25] hover:text-[#D30F25] transition-all">
                Reservasi Lagi
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 hasOrder: SUKSES PEMBAYARAN ──────────────────────────────── */}
        {step === 3 && hasOrder && submitted && (
          <div className="flex flex-col gap-6 py-4">
            {/* Ticket card */}
            <div
              className="relative mx-auto w-full max-w-sm print-ticket"
              style={{ border: "2px dashed rgba(211, 15, 37,0.28)", borderRadius: 24, background: "white", boxShadow: "0 16px 56px rgba(17, 24, 39,0.14)" }}
            >
              {/* Header */}
              <div className="flex flex-col items-center gap-2 py-7 px-6 rounded-t-[22px]"
                style={{ background: "linear-gradient(135deg,#1A3A5C 0%,#D30F25 100%)" }}>
                <span style={{ fontSize: "2.6rem" }}>🎟️</span>
                <p className="font-['Outfit'] font-black text-white text-xl tracking-wide">Mahaasyik</p>
                <div className="px-3 py-1 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-xs"
                  style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                  Tiket Reservasi + Order
                </div>
              </div>

              {/* Notch separator */}
              <div className="relative flex items-center px-7 py-0">
                <div className="absolute -left-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
                <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }} />
                <span className="px-3 text-sm font-bold" style={{ color: "rgba(211, 15, 37,0.35)" }}>✦ ✦ ✦</span>
                <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }} />
                <div className="absolute -right-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
              </div>

              {/* Reservation code */}
              <div className="flex flex-col items-center gap-1 py-5 px-6">
                <p className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs uppercase tracking-widest">Kode Reservasi</p>
                <p className="font-mono font-black text-2xl tracking-[0.18em]"
                  style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {resCode || reservationCode}
                </p>
              </div>

              {/* Detail rows */}
              <div className="px-6 pb-2 border-b-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }}>
                {[
                  { icon: "👤", label: "Nama",    value: name },
                  { icon: "📞", label: "HP",       value: phone },
                  { icon: "🗓️", label: "Tanggal",  value: dateDisplay },
                  { icon: "⏰", label: "Jam",      value: time + " WIB" },
                  { icon: "📍", label: "Tempat",   value: seating },
                  { icon: "👥", label: "Tamu",     value: `${adults} Dewasa${kids > 0 ? ` + ${kids} Anak` : ""}` },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3 py-3 border-b" style={{ borderColor: "rgba(17, 24, 39,0.07)" }}>
                    <span className="text-base shrink-0 mt-0.5">{row.icon}</span>
                    <div className="flex-1 flex items-start justify-between gap-2">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#6B7280] text-xs shrink-0">{row.label}</span>
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#111827] text-xs text-right">{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Receipt */}
              <div className="px-6 py-4">
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[#111827] text-sm mb-3">Struk Pesanan Menu</p>
                {Object.entries(orderQty).map(([menuName, qty]) => {
                  if (qty <= 0) return null;
                  const menu = menus.find(m => m.name === menuName);
                  if (!menu) return null;
                  const itemTotal = qty * parsePrice(menu.price);
                  return (
                    <div key={menuName} className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-['Outfit'] font-semibold text-[#111827] text-sm">{menuName}</p>
                        <p className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs">{qty} x {menu.price}</p>
                      </div>
                      <p className="font-['Outfit'] font-semibold text-[#111827] text-sm text-right">{formatRp(itemTotal)}</p>
                    </div>
                  );
                })}
                
                <div className="mt-4 pt-3 border-t" style={{ borderColor: "rgba(17, 24, 39,0.1)" }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs">Subtotal</span>
                    <span className="font-['Outfit'] text-[#111827] text-xs">{formatRp(subtotal)}</span>
                  </div>
                  {promoSavings > 0 && (
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-['Plus_Jakarta_Sans'] text-[#2D6A4F] text-xs">Diskon Promo</span>
                      <span className="font-['Outfit'] text-[#2D6A4F] text-xs">− {formatRp(promoSavings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#111827] text-sm">Total Harga</span>
                    <span className="font-['Outfit'] font-black text-[#111827] text-sm">{formatRp(total)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 p-2 rounded-lg" style={{ background: "rgba(211, 15, 37, 0.08)" }}>
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#D30F25] text-xs">DP Telah Dibayar</span>
                    <span className="font-['Outfit'] font-black text-[#D30F25] text-sm">{formatRp(dp)}</span>
                  </div>
                </div>
              </div>

              {/* Footer notch + note */}
              <div className="relative flex items-center px-7 py-0 mt-2">
                <div className="absolute -left-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
                <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "rgba(211, 15, 37,0.22)" }} />
                <div className="absolute -right-4 w-8 h-8 rounded-full" style={{ background: "#FFFFFF" }} />
              </div>
              <div className="px-6 pt-4 pb-6 text-center">
                <p className="font-['Plus_Jakarta_Sans'] text-[#9CA3AF] text-xs leading-relaxed">
                  Tunjukkan tiket ini kepada staff kami. Harap tiba 5 menit sebelum waktu reservasi.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
              <button onClick={() => { if(resCode) window.open('http://localhost:8000/api/reservations/' + resCode + '/ticket', '_blank'); else window.print(); }}
                className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-white text-sm transition-all hover:brightness-110 hover:scale-[1.01]"
                style={{ background: "linear-gradient(135deg,#1A3A5C 0%,#2D6A4F 100%)", boxShadow: "0 4px 16px rgba(26,58,92,0.32)" }}
              >
                🖨️ Print Tiket
              </button>
              <button onClick={resetAll}
                className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-[#D30F25] text-sm border-2 border-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all">
                Reservasi Baru Lagi
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

