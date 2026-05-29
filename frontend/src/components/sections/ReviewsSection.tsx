import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import api from "@/api";

interface Review {
  id?: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWriteReview = async () => {
    const { value: formValues } = await Swal.fire({
      title: '<span style="font-family: \'Outfit\', sans-serif; font-weight: 800; color: #111827; font-size: 1.5rem;">⭐ Beri Ulasan Anda</span>',
      html: `
        <div style="display:flex; flex-direction:column; gap:20px; text-align:left; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div>
            <label style="font-size:13px; font-weight:700; color:#4B5563; margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:0.05em;">Nama Lengkap</label>
            <input id="swal-input-name" class="swal2-input" placeholder="Budi Santoso" style="margin:0; width:100%; box-sizing:border-box; border-radius:14px; border:1.5px solid #E5E7EB; padding:0 16px; font-size:15px; height:48px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
          </div>
          <div>
            <label style="font-size:13px; font-weight:700; color:#4B5563; margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:0.05em;">Rating Pengalaman</label>
            <select id="swal-input-rating" class="swal2-select" style="margin:0; width:100%; box-sizing:border-box; border-radius:14px; border:1.5px solid #E5E7EB; padding:0 16px; font-size:15px; height:48px; box-shadow:0 2px 6px rgba(0,0,0,0.02); background-color:#fff;">
              <option value="5">⭐⭐⭐⭐⭐ Sangat Bagus</option>
              <option value="4">⭐⭐⭐⭐ Bagus</option>
              <option value="3">⭐⭐⭐ Cukup</option>
              <option value="2">⭐⭐ Kurang</option>
              <option value="1">⭐ Sangat Buruk</option>
            </select>
          </div>
          <div>
            <label style="font-size:13px; font-weight:700; color:#4B5563; margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:0.05em;">Ulasan Anda</label>
            <textarea id="swal-input-comment" class="swal2-textarea" placeholder="Ceritakan menu favoritmu atau pelayanan kami..." style="margin:0; width:100%; box-sizing:border-box; border-radius:14px; border:1.5px solid #E5E7EB; padding:12px 16px; font-size:15px; min-height:100px; box-shadow:0 2px 6px rgba(0,0,0,0.02); resize:vertical;"></textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '<span style="font-family:\'Outfit\', sans-serif; font-weight:700;">🚀 Kirim Ulasan</span>',
      cancelButtonText: '<span style="font-family:\'Outfit\', sans-serif; font-weight:700;">Batal</span>',
      confirmButtonColor: '#D30F25',
      cancelButtonColor: '#9CA3AF',
      customClass: {
        popup: 'rounded-3xl',
      },
      preConfirm: () => {
        const name = (document.getElementById('swal-input-name') as HTMLInputElement).value;
        const rating = (document.getElementById('swal-input-rating') as HTMLSelectElement).value;
        const comment = (document.getElementById('swal-input-comment') as HTMLTextAreaElement).value;
        if (!name || !rating || !comment) {
          Swal.showValidationMessage('Semua kolom wajib diisi');
          return false;
        }
        return { name, rating: parseInt(rating), comment };
      }
    });

    if (formValues) {
      try {
        await api.post('/reviews', formValues);
        Swal.fire({
          icon: 'success',
          title: 'Terima Kasih!',
          text: 'Ulasan Anda berhasil dikirim dan akan segera ditampilkan.',
          confirmButtonColor: '#D30F25'
        });
        fetchReviews();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal mengirim ulasan',
          confirmButtonColor: '#D30F25'
        });
      }
    }
  };

  const fetchReviews = () => {
    api.get("/reviews").then((res) => setReviews(res.data.data)).catch(console.error);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || reviews.length === 0) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    const stop = () => cancelAnimationFrame(animId);
    el.addEventListener("mouseenter", stop);
    el.addEventListener("touchstart", stop, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", stop);
    };
  }, [reviews]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section id="ulasan" style={{ background: "#FFFFFF" }} className="py-20 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-4 px-5">
        <h2
          className="font-['Outfit'] font-black text-[#111827] text-center leading-tight"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
        >
          Kata{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pelanggan Kami
          </span>
        </h2>
        <div className="w-[60px] h-1 rounded-full" style={{ background: "linear-gradient(90deg, #D30F25, #FFEC01)" }} />

        {/* Rating summary + CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 mb-2">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: "rgba(211,15,37,0.06)", border: "1px solid rgba(211,15,37,0.1)" }}>
            <div>
              <div className="font-['Outfit'] font-black text-4xl" style={{ color: "#D30F25", lineHeight: 1 }}>{avgRating}</div>
              <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: "#FFEC01", fontSize: "1rem" }}>★</span>
                ))}
              </div>
              <div className="font-['Plus_Jakarta_Sans'] text-xs text-[#6B7280] mt-1">{reviews.length} ulasan</div>
            </div>
          </div>
          <button
            onClick={handleWriteReview}
            style={{
              background: "linear-gradient(135deg, #D30F25 0%, #FFEC01 100%)",
              boxShadow: "0 4px 20px rgba(211,15,37,0.3)",
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-['Outfit'] font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          >
            ✍️ Tulis Ulasan Anda
          </button>
        </div>
      </div>

      {/* Scrolling review cards */}
      <div
        ref={scrollRef}
        className="reviews-scroll flex gap-5 px-6 md:px-12 overflow-x-auto pb-4"
        style={{ cursor: "grab", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {/* Duplicate for seamless loop */}
        {[...reviews, ...reviews].map((r, i) => (
          <div
            key={i}
            className="review-card shrink-0 flex flex-col gap-4 p-6 rounded-3xl"
            style={{
              width: 320,
              background: "linear-gradient(135deg, #FFFFFF 0%, #FFF3F4 100%)",
              boxShadow: "0 2px 12px rgba(17, 24, 39,0.08)",
              border: "1px solid rgba(211,15,37,0.07)",
            }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, si) => (
                <span key={si} style={{ color: si < r.rating ? "#FFEC01" : "#D1D5DB", fontSize: "1rem" }}>★</span>
              ))}
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-sm leading-relaxed flex-1 italic">
              &ldquo;{r.comment}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-['Outfit'] font-black text-white text-base shrink-0"
                style={{ background: "linear-gradient(135deg, #D30F25, #FFEC01)" }}
              >
                {r.name.charAt(0)}
              </div>
              <div>
                <p className="font-['Outfit'] font-bold text-[#111827] text-sm">{r.name}</p>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#6B7280]">
                  {new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
