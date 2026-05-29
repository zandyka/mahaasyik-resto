import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export const GRADIENTS = [
  "linear-gradient(135deg, #FFF0D0 0%, #FFEC01 100%)",
  "linear-gradient(135deg, #DCEFD8 0%, #2D6A4F 100%)",
  "linear-gradient(135deg, #FFE8C8 0%, #D30F25 100%)",
  "linear-gradient(135deg, #D0EAF8 0%, #1A3A5C 100%)",
  "linear-gradient(135deg, #FFE8C0 0%, #BF360C 100%)",
];
export const EMOJIS = ["🍛", "🍗", "🐟", "🥬", "🍲", "🍵", "🌶️", "🥜", "🍢", "🧋"];
export const SIZES: Record<BtnSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};
export const BASE_BTN =
  "inline-flex items-center justify-center rounded-full font-['Outfit'] font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] select-none cursor-pointer";
export const BADGE_STYLES: Record<BadgeColor, string> = {
  orange: "bg-[#D30F25]/10 text-[#D30F25] border-[#D30F25]/25",
  green:  "bg-[#2D6A4F]/10 text-[#2D6A4F] border-[#2D6A4F]/25",
  yellow: "bg-[#FFEC01]/15 text-[#7A4F00] border-[#FFEC01]/40",
  indigo: "bg-[#1A3A5C]/10 text-[#1A3A5C] border-[#1A3A5C]/25",
  brown:  "bg-[#111827]/10 text-[#111827] border-[#111827]/20",
};
export const NAV_LINKS = [
  { label: "Beranda",   href: "#beranda",   page: "home" as Page },
  { label: "Menu",      href: "#menu",      page: "menu" as Page },
  { label: "Reservasi", href: "#reservasi", page: "reservasi" as Page },
  { label: "Delivery",  href: "#delivery",  page: "delivery" as Page },
  { label: "Riwayat",   href: "#history",   page: "history" as Page },
  { label: "About Us",  href: "#about",     page: "about" as Page },
];
export const INJECTED_CSS = `
@keyframes floatA {
  0%,100% { transform: translateY(0px) rotate(-4deg); }
  50%      { transform: translateY(-22px) rotate(4deg); }
}
@keyframes floatB {
  0%,100% { transform: translateY(0px) rotate(3deg); }
  50%      { transform: translateY(-18px) rotate(-5deg); }
}
@keyframes floatC {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  50%      { transform: translateY(-14px) rotate(7deg); }
}
@keyframes floatD {
  0%,100% { transform: translateY(0px) rotate(-6deg); }
  50%      { transform: translateY(-26px) rotate(3deg); }
}
@keyframes floatE {
  0%,100% { transform: translateY(0px) rotate(6deg); }
  50%      { transform: translateY(-20px) rotate(-7deg); }
}
.stat-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 20px rgba(17, 24, 39,0.08);
}
.stat-card:hover {
  box-shadow: 0 14px 40px rgba(17, 24, 39,0.16);
}
.menu-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 12px rgba(17, 24, 39,0.08);
}
.menu-card:hover {
  box-shadow: 0 16px 44px rgba(17, 24, 39,0.18);
  transform: translateY(-6px) scale(1.008);
}

.reviews-scroll::-webkit-scrollbar { display: none; }
.reviews-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.review-card { transition: transform 0.2s ease; }
.review-card:hover { transform: translateY(-4px); }
@keyframes wa-pulse {
  0%  { transform: scale(1);   opacity: 0.72; }
  70% { transform: scale(1.8); opacity: 0; }
  100%{ transform: scale(1.8); opacity: 0; }
}
.cat-scroll::-webkit-scrollbar { display: none; }
.cat-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(211, 15, 37,0.22), 0 2px 16px rgba(211, 15, 37,0.12);
}
@keyframes bounce-in {
  0%   { transform: scale(0.4) translateY(16px); opacity: 0; }
  65%  { transform: scale(1.08) translateY(-3px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
.fab-option {
  animation: bounce-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
.res-input:focus {
  border-color: rgba(211, 15, 37,0.65) !important;
  box-shadow: 0 0 0 3px rgba(211, 15, 37,0.14);
  outline: none;
}
.tech-card {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  cursor: default;
}
.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(211, 15, 37,0.18) !important;
}
.team-card {
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  cursor: default;
}
.team-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 20px 48px rgba(211, 15, 37,0.18) !important;
  border-color: #D30F25 !important;
}
`;
export const FLOATING_EMOJIS: FloatingEmoji[] = [
  { emoji: "🍚", top: "10%", left: "4%",   animation: "floatA", duration: "4.2s", delay: "0s",    size: "2.6rem" },
  { emoji: "🌶️", top: "22%", right: "6%",  animation: "floatB", duration: "3.8s", delay: "0.7s",  size: "2.1rem" },
  { emoji: "🥬", top: "67%", left: "6%",   animation: "floatC", duration: "5.0s", delay: "1.2s",  size: "2.3rem" },
  { emoji: "🐟", top: "74%", right: "5%",  animation: "floatD", duration: "4.5s", delay: "0.4s",  size: "2.8rem" },
  { emoji: "🌿", top: "42%", left: "2%",   animation: "floatE", duration: "3.5s", delay: "1.8s",  size: "1.9rem" },
  { emoji: "🍛", top: "13%", left: "27%",  animation: "floatA", duration: "4.8s", delay: "2.1s",  size: "2.0rem" },
  { emoji: "🌶️", top: "83%", left: "23%",  animation: "floatB", duration: "3.6s", delay: "0.9s",  size: "1.7rem" },
  { emoji: "🌿", top: "56%", right: "3%",  animation: "floatC", duration: "4.2s", delay: "1.5s",  size: "1.8rem" },
  { emoji: "🍚", top: "48%", right: "13%", animation: "floatD", duration: "5.2s", delay: "2.5s",  size: "2.0rem" },
];
export const GLASS_STYLE = {
  background: "rgba(255,255,255,0.14)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1.5px solid rgba(255,255,255,0.28)",
} as React.CSSProperties;
export const HERO_TAGS = ["✅ Halal", "🅿️ Parkir Luas", "❄️ Full AC", "🛵 Delivery Available"];
export const STATS = [
  { emoji: "🏛️", value: "2018",  label: "Tahun Berdiri"      },
  { emoji: "🍽️", value: "35+",   label: "Menu Tersedia"      },
  { emoji: "⭐",  value: "98%",   label: "Kepuasan Pelanggan" },
  { emoji: "❤️",  value: "12K+",  label: "Pelanggan Setia"    },
];
export const FEATURES = [
  { emoji: "🌾", label: "Bahan Segar"     },
  { emoji: "👨‍🍳", label: "Chef Ahli"       },
  { emoji: "🏠", label: "Suasana Nyaman"  },
  { emoji: "🌿", label: "100% Halal"      },
];
export const GALLERY_SLIDES = [
  {
    image: "/aset img front/ruang-makan-utama.png",
    title: "Ruang Makan Utama",
    subtitle: "Kapasitas 80 orang dengan suasana hangat dan nyaman khas Ayam Pecak",
  },
  {
    image: "/aset img front/taman-outdoor-sunda.png",
    title: "Taman Outdoor Ayam Pecak",
    subtitle: "Area terbuka dengan nuansa alam dan angin sejuk khas Jawa Barat",
  },
  {
    image: "/aset img front/dapur-terbuka.png",
    title: "Dapur Terbuka",
    subtitle: "Saksikan proses memasak langsung oleh chef berpengalaman kami",
  },
  {
    image: "/aset img front/ruang-private.png",
    title: "Ruang Private",
    subtitle: "Tersedia untuk acara keluarga, ulang tahun, dan pertemuan bisnis",
  },
  {
    image: "/aset img front/area-santai-kafe.png",
    title: "Area Santai & Kafe",
    subtitle: "Nikmati minuman segar dan camilan di sudut yang tenang dan cozy",
  },
  {
    image: "/aset img front/rooftop-sunda.png",
    title: "Rooftop Ayam Pecak",
    subtitle: "Pemandangan menakjubkan Kota Medan dari ketinggian yang istimewa",
  },
];
export const REVIEWS = [
  { name: "Asep Kurniawan",  date: "12 Jan 2025", stars: 5, quote: "Ayam pecaknya benar-benar mantap! Sambalnya pedas nendang, daging ayamnya empuk banget. Wajib balik lagi!" },
  { name: "Dewi Rahayu",     date: "8 Jan 2025",  stars: 5, quote: "Suasana restoran nyaman, cocok untuk makan siang keluarga. Bumbu pecaknya meresap sampai ke tulang." },
  { name: "Budi Santoso",    date: "2 Jan 2025",  stars: 5, quote: "Ayam bakar kecapnya juara! Bumbunya legit, sambalnya nampol. Porsi nasinya juga memuaskan." },
  { name: "Siti Aminah",     date: "28 Des 2024", stars: 5, quote: "Bumbu pecak di sini beda dari yang lain. Asam, pedas, segarnya pas banget di lidah!" },
  { name: "Rizky Pratama",   date: "20 Des 2024", stars: 4, quote: "Harga terjangkau, porsi kenyang. Pelayanan sangat cepat walaupun restoran sedang ramai." },
  { name: "Nurul Hidayah",   date: "15 Des 2024", stars: 5, quote: "Jus alpukatnya kental dan manisnya pas. Sangat cocok jadi penawar pedas setelah makan ayam pecak." },
  { name: "Hendra Wijaya",   date: "10 Des 2024", stars: 5, quote: "Selain ayam, ikan bakarnya juga recommended! Bumbu lada hitamnya kerasa banget." },
  { name: "Rina Suhartini",  date: "5 Des 2024",  stars: 5, quote: "Tempat bersih, masakan lezat, harga bersahabat. Rekomendasi banget buat warga Medan dan sekitarnya." },
  { name: "Fajar Maulana",   date: "1 Des 2024",  stars: 4, quote: "Sambal tuk-tuknya autentik banget. Bikin nambah nasi terus-terusan!" },
  { name: "Yanti Kusuma",    date: "25 Nov 2024", stars: 5, quote: "Menu dimsumnya juga enak buat cemilan sambil nunggu pesanan utama datang. Mantap pokoknya!" },
  { name: "Dani Supriyadi",  date: "18 Nov 2024", stars: 5, quote: "Pecinta pedas wajib kesini. Sambal ayam pecaknya juara satu di Tanjung Morawa!" },
  { name: "Mega Wulandari",  date: "12 Nov 2024", stars: 5, quote: "Pelayanan sangat ramah dan tempatnya gampang dicari. Sudah jadi langganan setiap akhir pekan." },
];
export const INFO_ROWS = [
  { icon: "🏠", label: "Alamat",   value: "Gg. Mawar No.9, Bangun Sari, Kec. Tj. Morawa, Kabupaten Deli Serdang, Sumatera Utara 20362" },
  { icon: "⏰", label: "Jam Buka", value: "Setiap hari  10.00 – 22.00 WIB" },
  { icon: "📞", label: "Telepon",  value: "0878-5544-8205" },
  { icon: "🅿️", label: "Parkir",   value: "Parkir gratis, kapasitas 50 mobil" },
];
export const FOOTER_MENU  = ["Beranda", "Menu", "Reservasi", "Delivery", "About Us"];
export const FOOTER_SVC   = ["Delivery", "Katering", "Reservasi Meja", "Private Event", "Paket Ulang Tahun"];
export const FOOTER_CONTACT = [
  { icon: "📍", text: "Gg. Mawar No.9, Tj. Morawa" },
  { icon: "⏰", text: "10.00 – 22.00 WIB" },
  { icon: "📞", text: "0878-5544-8205" },
  { icon: "📧", text: "zackyandyka1@gmail.com" },
];
export const SOCIALS = ["📸", "📘", "🎵", "💬"];
export const CATEGORIES = [
  "Semua",
  "Pecak",
  "Bakaran",
  "Balado",
  "Sambal Tuk-Tuk",
  "Cabe Iris",
  "Sup",
  "Rica-Rica",
  "Gulai",
  "Gulai Acar",
  "Asam Padeh",
  "Tauco",
  "Steam",
  "Asam Manis",
  "Arsik",
  "Lada Hitam",
  "Saus Padang",
  "Sayuran",
  "Gorengan",
  "Cemilan",
  "Dimsum",
  "Minuman",
  "Jus"
];
export const SEATING_OPTIONS = [
  { emoji: "🌟", label: "Outdoor Lt. 1",     desc: "Suasana terbuka, angin segar Jawa Barat" },
  { emoji: "🏠", label: "Indoor Lt. 1",      desc: "Ruang makan utama, nyaman dan sejuk AC" },
  { emoji: "🚭", label: "Indoor No Smoking", desc: "Area bebas rokok, full AC terjaga" },
  { emoji: "⭐", label: "Lantai 2 AC",       desc: "Pemandangan kota Medan, eksklusif" },
];
export const PAYMENT_METHODS = [
  { icon: "📷", label: "QRIS" },
  { icon: "📲", label: "GoPay" },
  { icon: "💳", label: "DANA" },
  { icon: "🏷️", label: "ShopeePay" },
  { icon: "🔵", label: "Google Pay" },
  { icon: "🏦", label: "Transfer Bank" },
];
export const PROMO_CODES: Record<string, { savings: number; pct: number }> = {
  PECAK20:     { savings: 20000, pct: 20 },
  MAHAASYIK:   { savings: 15000, pct: 15 },
  NUSANTARA:   { savings: 10000, pct: 10 },
  ZACKSTIKPS:  { savings: 0, pct: 98 },   // special 98% promo – savings computed dynamically
};
export const STEP_LABELS = ["Jadwal & Tempat", "Info Booking", "Konfirmasi"];
export const CARD: React.CSSProperties = {
  background: "white",
  borderRadius: 32,
  boxShadow: "0 8px 48px rgba(17, 24, 39,0.11), 0 2px 8px rgba(17, 24, 39,0.06)",
  padding: 32,
};
export const LABEL_CLS = "font-['Plus_Jakarta_Sans'] font-semibold text-[#4B5563] text-xs uppercase tracking-wide";
export const SHIPPING_METHODS = [
  { id: "takeaway",     icon: "🛍️", label: "Takeaway",     note: "Ambil di resto (15-20 mnt)",  color: "#10B981", fee: 0 },
  { id: "delivery-boy", icon: "🛵", label: "Delivery Boy", note: "Pengiriman langsung",  color: "#D30F25", fee: 10000 },
];
export const DELIVERY_PAYMENT = [
  { icon: "📷", label: "QRIS",          note: "" },
  { icon: "📲", label: "GoPay",         note: "" },
  { icon: "💳", label: "DANA",          note: "" },
  { icon: "🏷️", label: "ShopeePay",     note: "" },
  { icon: "🔵", label: "Google Pay",    note: "" },
  { icon: "🏦", label: "Transfer Bank", note: "" },
  { icon: "💵", label: "COD",           note: "Bayar saat tiba" },
];
export const TECH_STACK = [
  { icon: "⚛️", name: "React + Vite",  role: "Frontend Framework" },
  { icon: "🔥", name: "Laravel 12",    role: "Backend Framework" },
  { icon: "🗄️", name: "MySQL",         role: "Database" },
  { icon: "💳", name: "Midtrans",      role: "Payment Gateway" },
  { icon: "🖥️", name: "XAMPP",         role: "Dev Server" },
  { icon: "⚡", name: "Vite",          role: "Build Tool" },
];

export const MEMBERS = [
  {
    name: "Zacky",
    role: "Developer",
    nim: "231712072",
    image: "/member/Zacky.png",
    gradient: "linear-gradient(135deg, #D30F25, #FFEC01)"
  },
  {
    name: "Aodricsxz",
    role: "Project Manajer",
    nim: "231712049",
    image: "/member/Aodricsxz.png",
    gradient: "linear-gradient(135deg, #FFEC01, #D30F25)"
  },
  {
    name: "Ipang",
    role: "Chef",
    nim: "231712031",
    image: "/member/Ipang.png",
    gradient: "linear-gradient(135deg, #2D6A4F, #52B788)"
  },
  {
    name: "Ihszan",
    role: "Owner",
    nim: "231712103",
    image: "/member/Ihszan.png",
    gradient: "linear-gradient(135deg, #D97706, #FFB347)"
  },
  {
    name: "Amelia N",
    role: "Tukang Parkir",
    nim: "231712091",
    image: "/member/Amelia N.png",
    gradient: "linear-gradient(135deg, #2563EB, #60A5FA)"
  }
];
