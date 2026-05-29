import { Card } from '@/components/ui/Card';
import { ResInput } from '@/components/ui/ResInput';
import { CARD } from '@/constants';
import { LABEL_CLS } from '@/constants';
import { SHIPPING_METHODS } from '@/constants';
import { CATEGORIES, DELIVERY_PAYMENT } from '@/constants';
import { MenuItemData } from '@/types';
import { mapMenuFromApi } from '@/utils/helpers';
import { parsePrice } from '@/utils/helpers';
import { formatRp } from '@/utils/helpers';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import Swal from "sweetalert2";
import api from "@/api";
export function DeliveryPage() {
  const [menus, setMenus] = useState<MenuItemData[]>([]);

  useEffect(() => {
    api.get('/menus').then(res => setMenus(res.data.data.map(mapMenuFromApi))).catch(console.error);
  }, []);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const filteredMenus = useMemo(() => {
    let items = menus;
    if (activeCategory !== "Semua") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((item) => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
    }
    return items;
  }, [search, activeCategory, menus]);

  const [orderQty,   setOrderQty]   = useState<Record<string, number>>({});
  const [custName,   setCustName]   = useState("");
  const [custPhone,  setCustPhone]  = useState("");
  const [custEmail,  setCustEmail]  = useState("");
  const [address,    setAddress]    = useState("");
  const [custNotes,  setCustNotes]  = useState("");
  const [shipping,   setShipping]   = useState<string | null>(null);
  const [payment,    setPayment]    = useState<string | null>(null);
  const [promoCode,  setPromoCode]  = useState("");
  const [promoState, setPromoState] = useState<"idle" | "valid" | "invalid">("idle");
  const [submitted,  setSubmitted]  = useState(false);

  const deliveryCode = useMemo(() => {
    const d  = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(2);
    return `DEL-${dd}${mm}${yy}-${Math.floor(Math.random() * 900 + 100)}`;
  }, []);

  const selectedShip  = SHIPPING_METHODS.find((s) => s.id === shipping) ?? null;
  const subtotal      = menus.reduce((s, i) => s + (orderQty[i.name] || 0) * parsePrice(i.price), 0);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const ongkir        = selectedShip?.fee ?? 0;
  const total         = subtotal - promoDiscount + ongkir;
  const isCOD         = payment === "COD";
  const canOrder      = subtotal > 0 && custName.trim().length > 0 && custPhone.trim().length > 0 && address.trim().length > 0 && !!shipping && !!payment;
  const orderedItems  = menus.filter((i) => (orderQty[i.name] || 0) > 0);

  const handlePromo = () => {
    api.post('/promos/validate', { code: promoCode, subtotal })
       .then(res => {
         setPromoState("valid");
         setPromoDiscount(res.data.discount_amount);
       })
       .catch(err => {
         setPromoState("invalid");
         setPromoDiscount(0);
       });
  };

  const handleSubmit = async (isDemo: boolean = false) => {
    try {
      const pmMap: Record<string, string> = {
          'qris': 'qris', 'gopay': 'gopay', 'dana': 'dana',
          'shopeepay': 'shopeepay', 'google pay': 'google_pay',
          'debit': 'debit', 'cod': 'cod'
        };
      const payload = {
        name: custName, phone: custPhone, email: custEmail || "guest@mahaasyik.com", address, notes: custNotes,
        delivery_method: shipping === "delivery-boy" ? "delivery_boy" : shipping,
        payment_method: payment ? (pmMap[payment.toLowerCase()] || payment.toLowerCase().replace(/\s+/g, '_')) : null,
        promo_code: promoState === "valid" ? promoCode : null,
        items: Object.keys(orderQty).map(menuName => {
           const menu = menus.find(m => m.name === menuName);
           return { menu_id: menu?.id, quantity: orderQty[menuName] };
        }).filter(item => item.quantity > 0)
      };

      const res = await api.post('/deliveries', payload);
      // COD atau kasus lain yang tidak butuh pembayaran
      if (res.data.success && res.data.requires_payment === false) {
        setSubmitted(true);
        return;
      }
      // Bayar lewat Midtrans
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
      }
    } catch(e) {
      console.error(e);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Gagal membuat pesanan!', confirmButtonColor: '#D30F25' });
    }
  };

  const resetDelivery = () => {
    setSubmitted(false);
    setOrderQty({});
    setCustName(""); setCustPhone(""); setCustEmail(""); setAddress(""); setCustNotes("");
    setShipping(null); setPayment(null); setPromoCode(""); setPromoState("idle"); setPromoDiscount(0);
  };

  const PageHeader = (
    <div
      className="relative overflow-hidden flex flex-col items-center justify-center text-center px-5"
      style={{ paddingTop: 116, paddingBottom: 64, background: "linear-gradient(135deg,#2D6A4F 0%,#D30F25 100%)" }}
    >
      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle,rgba(255, 236, 1,0.7) 0%,transparent 70%)", transform: "translate(25%,-30%)" }} />
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm mb-4"
        style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.9)" }}>
        🛵 Pesan Antar Mahaasyik
      </div>
      <h1 className="font-['Outfit'] font-black text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 6vw, 4rem)" }}>
        Pesan{" "}
        <span style={{ background: "linear-gradient(135deg,#FFE066 0%,#FFD700 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Online
        </span>
      </h1>
      <p className="font-['Plus_Jakarta_Sans'] mt-3 max-w-md" style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", lineHeight: 1.7 }}>
        Sajian Ayam Pecak lezat langsung ke depan pintu — pesan sekarang, datang dalam hitungan menit!
      </p>
      <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" style={{ display: "block" }} aria-hidden="true">
          <path d="M0,10 C360,48 720,4 1080,30 C1260,44 1380,12 1440,22 L1440,48 L0,48 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        {PageHeader}
        <div className="flex items-center justify-center px-5 py-20">
          <div className="w-full max-w-md flex flex-col items-center text-center gap-5 p-10"
            style={{ background: "white", borderRadius: 32, boxShadow: "0 16px 64px rgba(17, 24, 39,0.16)" }}>
            <span style={{ fontSize: "4rem" }}>📫</span>
            <h2 className="font-['Outfit'] font-black text-[#111827] text-2xl">Pesanan Berhasil!</h2>
            <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-sm leading-relaxed">
              Pesananmu sedang diproses. Kami akan menghubungimu via WhatsApp segera!
            </p>
            <div className="w-full flex flex-col gap-3 py-4 border-y" style={{ borderColor: "rgba(17, 24, 39,0.08)" }}>
              <div className="flex items-center justify-between gap-4">
                <span className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-sm">Kode Pesanan</span>
                <span className="font-mono font-bold text-[#111827] text-sm tracking-wider">{deliveryCode}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-sm">Metode</span>
                <span className="font-['Outfit'] font-semibold text-[#111827] text-sm">{selectedShip?.label ?? "–"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-sm">Total Bayar</span>
                <span className="font-['Outfit'] font-black text-base"
                  style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {formatRp(total)}
                </span>
              </div>
              {isCOD && (
                <div className="flex items-center gap-2 justify-center px-4 py-2 rounded-xl"
                  style={{ background: "rgba(45,106,79,0.08)", border: "1px solid rgba(45,106,79,0.2)" }}>
                  <span>💵</span>
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#2D6A4F] text-xs">Pembayaran dilakukan saat pesanan tiba</span>
                </div>
              )}
            </div>
            <button onClick={resetDelivery}
              className="w-full py-3.5 rounded-full font-['Outfit'] font-bold text-white text-sm transition-all hover:brightness-110 hover:scale-[1.01]"
              style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", boxShadow: "0 4px 16px rgba(211, 15, 37,0.32)" }}>
              Pesan Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cardSm: React.CSSProperties = { ...CARD, padding: 24 };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      {PageHeader}

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-7">

          {/* LEFT: form cards */}
          <div className="flex flex-col gap-6">

            {/* Card 1: Menu selection */}
            <div style={cardSm}>
              <h4 className="font-['Outfit'] font-black text-[#111827] text-lg mb-4">🍽️ Pilih Menu</h4>
              <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full">
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
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {filteredMenus.filter((i) => i.available).map((item) => {
                  const qty = orderQty[item.name] || 0;
                  return (
                    <div key={item.name} className="flex flex-col gap-3 p-3 rounded-2xl transition-all hover:bg-[#FFFFFF]"
                      style={{ border: "1px solid rgba(17, 24, 39,0.07)", boxShadow: "0 2px 8px rgba(17, 24, 39,0.03)" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-['Outfit'] font-bold text-[#111827] text-sm leading-tight line-clamp-1">{item.name}</p>
                          <p className="font-['Outfit'] font-black text-xs mt-0.5"
                            style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            {formatRp(parsePrice(item.price))}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#6B7280] text-[10px] uppercase">Kuantitas</span>
                        <div className="flex items-center gap-2" style={{ background: "rgba(211, 15, 37,0.06)", borderRadius: 8, padding: "3px 4px" }}>
                          <button
                            onClick={() => setOrderQty({ ...orderQty, [item.name]: Math.max(0, qty - 1) })}
                            disabled={qty === 0}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-colors disabled:opacity-50"
                            style={{ border: "1px solid rgba(211, 15, 37,0.2)" }}
                          >
                            <span className="text-sm font-bold">−</span>
                          </button>
                          <span className="w-4 text-center font-['Outfit'] font-bold text-[#111827] text-xs">
                            {qty}
                          </span>
                          <button
                            onClick={() => setOrderQty({ ...orderQty, [item.name]: qty + 1 })}
                            className="w-6 h-6 flex items-center justify-center rounded-md bg-[#D30F25] text-white hover:brightness-110 transition-all"
                          >
                            <span className="text-sm font-bold">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Customer info */}
            <div style={cardSm}>
              <h4 className="font-['Outfit'] font-black text-[#111827] text-lg mb-4">📝 Data Pemesan</h4>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLS}>Nama</label>
                    <ResInput value={custName} onChange={setCustName} placeholder="Nama lengkap..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={LABEL_CLS}>No. HP</label>
                    <ResInput type="tel" value={custPhone} onChange={setCustPhone} placeholder="08xx..." />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={LABEL_CLS}>Email</label>
                  <ResInput type="email" value={custEmail} onChange={setCustEmail} placeholder="email@contoh.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={LABEL_CLS}>Alamat Pengiriman</label>
                  <ResInput value={address} onChange={setAddress} rows={3}
                    placeholder="Jl. Nama Jalan No. XX, Kel. XXX, Kec. XXX, Kota..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={LABEL_CLS}>
                    Catatan <span className="normal-case font-normal text-[#9CA3AF]">(opsional)</span>
                  </label>
                  <ResInput value={custNotes} onChange={setCustNotes} rows={2}
                    placeholder="Contoh: tidak pedas, tidak pakai kecap..." />
                </div>
              </div>
            </div>

            {/* Card 3: Shipping */}
            <div style={cardSm}>
              <h4 className="font-['Outfit'] font-black text-[#111827] text-lg mb-4">🚚 Metode Pengiriman</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SHIPPING_METHODS.map((sm) => {
                  const sel = shipping === sm.id;
                  return (
                    <button key={sm.id} onClick={() => setShipping(sm.id)}
                      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        border: sel ? `2px solid ${sm.color}` : "2px solid rgba(17, 24, 39,0.1)",
                        background: sel ? `${sm.color}12` : "white",
                        boxShadow: sel ? `0 4px 16px ${sm.color}40` : "0 2px 8px rgba(17, 24, 39,0.06)",
                      }}>
                      {sel && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black"
                          style={{ background: sm.color }}>✓</div>
                      )}
                      <span style={{ fontSize: "1.9rem" }}>{sm.icon}</span>
                      <p className="font-['Outfit'] font-bold text-[#111827] text-sm">{sm.label}</p>
                      <p className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs text-center">{sm.note}</p>
                      {sm.fee > 0 && (
                        <p className="font-['Outfit'] font-black text-xs" style={{ color: sm.color }}>
                          Biaya {formatRp(sm.fee)}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 4: Payment */}
            <div style={cardSm}>
              <h4 className="font-['Outfit'] font-black text-[#111827] text-lg mb-4">💳 Metode Pembayaran</h4>
              <div className="grid grid-cols-4 gap-2.5">
                {DELIVERY_PAYMENT.map((po) => {
                  const sel = payment === po.label;
                  return (
                    <button key={po.label} onClick={() => setPayment(po.label)}
                      className="relative flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        border: sel ? "2px solid #D30F25" : "2px solid rgba(17, 24, 39,0.1)",
                        background: sel ? "rgba(211, 15, 37,0.05)" : "white",
                        boxShadow: sel ? "0 4px 14px rgba(211, 15, 37,0.2)" : "0 2px 6px rgba(17, 24, 39,0.06)",
                      }}>
                      {sel && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                          style={{ background: "linear-gradient(135deg,#D30F25,#FFEC01)" }}>✓</div>
                      )}
                      <span style={{ fontSize: "1.5rem" }}>{po.icon}</span>
                      <span className="font-['Outfit'] font-semibold text-[#111827] text-[11px] leading-tight text-center">{po.label}</span>
                      {po.note && (
                        <span className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-[9px] leading-tight text-center">{po.note}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: sticky sidebar */}
          <div className="">
            <div style={{ position: "sticky", top: 96, alignSelf: "start" } as React.CSSProperties}>
              <div style={cardSm}>
                <h4 className="font-['Outfit'] font-black text-[#111827] text-lg mb-4">📋 Ringkasan Pesanan</h4>

                {orderedItems.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8">
                    <span style={{ fontSize: "2.5rem" }}>🛒</span>
                    <p className="font-['Plus_Jakarta_Sans'] text-[#9CA3AF] text-sm text-center">
                      Belum ada item dipilih
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mb-4 pb-4 border-b" style={{ borderColor: "rgba(17, 24, 39,0.08)" }}>
                    {orderedItems.map((item) => {
                      const qty = orderQty[item.name]!;
                      return (
                        <div key={item.name} className="flex items-start gap-2 justify-between">
                          <span className="font-['Plus_Jakarta_Sans'] text-[#111827] text-sm leading-snug flex-1">
                            {item.name} <span className="text-[#6B7280]">×{qty}</span>
                          </span>
                          <span className="font-['Outfit'] font-bold text-[#111827] text-sm shrink-0">
                            {formatRp(qty * parsePrice(item.price))}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Promo */}
                <div className="flex gap-2 mb-3">
                  <div className="flex-1">
                    <ResInput
                      value={promoCode}
                      onChange={(v) => { setPromoCode(v.toUpperCase()); setPromoState("idle"); }}
                      placeholder="Kode promo..."
                    />
                  </div>
                  <button onClick={handlePromo} disabled={!promoCode.trim()}
                    className="shrink-0 px-4 py-2.5 rounded-xl font-['Outfit'] font-bold text-sm border-2 border-[#D30F25] text-[#D30F25] hover:bg-[#D30F25] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Pakai
                  </button>
                </div>
                {promoState === "valid" && (
                  <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans'] font-semibold"
                    style={{ background: "rgba(45,106,79,0.1)", color: "#2D6A4F", border: "1px solid rgba(45,106,79,0.2)" }}>
                    🎉 Hemat {formatRp(promoDiscount)}!
                  </div>
                )}
                {promoState === "invalid" && (
                  <p className="mb-3 font-['Plus_Jakarta_Sans'] text-xs text-red-500">Kode promo tidak valid.</p>
                )}

                {/* Breakdown */}
                <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: "rgba(17, 24, 39,0.1)" }}>
                  <div className="flex justify-between text-sm font-['Plus_Jakarta_Sans']">
                    <span className="text-[#4B5563]">Subtotal</span>
                    <span className="font-semibold text-[#111827]">{formatRp(subtotal)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm font-['Plus_Jakarta_Sans']">
                      <span className="text-[#2D6A4F] font-semibold">🎉 Diskon</span>
                      <span className="font-semibold text-[#2D6A4F]">− {formatRp(promoDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-['Plus_Jakarta_Sans']">
                    <span className="text-[#4B5563]">Ongkos Kirim</span>
                    <span className="font-semibold text-[#111827]">
                      {!shipping ? "–" : ongkir > 0 ? formatRp(ongkir) : "Via app"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 mt-1 border-t" style={{ borderColor: "rgba(17, 24, 39,0.1)" }}>
                    <span className="font-['Outfit'] font-black text-[#111827] text-base">TOTAL</span>
                    <span className="font-['Outfit'] font-black text-xl"
                      style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {formatRp(total)}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full mt-4">
                    <button
                      onClick={() => handleSubmit(false)}
                      disabled={!canOrder}
                      className="flex-1 py-4 rounded-full font-['Outfit'] font-bold text-white text-sm transition-all hover:brightness-110 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: isCOD
                          ? "linear-gradient(135deg,#2D6A4F 0%,#52B788 100%)"
                          : "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)",
                        boxShadow: canOrder
                          ? `0 4px 20px ${isCOD ? "rgba(45,106,79,0.38)" : "rgba(211, 15, 37,0.35)"}`
                          : "none",
                      }}>
                      {isCOD ? "Bayar Nanti" : "Bayarkan"}
                    </button>
                    {!isCOD && (
                      <button
                        onClick={() => handleSubmit(true)}
                        disabled={!canOrder}
                        className="flex-1 py-4 rounded-full font-['Outfit'] font-bold text-[#6B7280] text-sm transition-all hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: "#F5F5F5", border: "1px solid #E0E0E0" }}
                      >
                        Demo (Bypass)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


