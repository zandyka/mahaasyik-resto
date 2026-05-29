import { GununganLogo } from '@/components/layout/GununganLogo';
import { BrandSection } from '@/components/sections/BrandSection';
import { TECH_STACK, MEMBERS } from '@/constants';
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";

const MemberCard = ({ member }: { member: any }) => (
  <div className="team-card flex flex-col items-center text-center gap-2 md:gap-3 p-3 md:p-7 rounded-2xl md:rounded-3xl bg-white w-full h-full"
    style={{
      boxShadow: "0 4px 20px rgba(17, 24, 39,0.08)",
      border: "2px solid rgba(17, 24, 39,0.07)",
    }}>
    <img
      src={member.image}
      alt={member.name}
      className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover shrink-0"
      style={{
        boxShadow: "0 4px 20px rgba(211, 15, 37,0.28)",
        border: "2px solid rgba(255,255,255,0.9)",
        outline: "2px solid rgba(211, 15, 37,0.12)",
      }}
    />
    <div className="flex flex-col gap-1 md:gap-2.5 items-center">
      <p className="font-['Outfit'] font-bold text-[#111827] text-xs md:text-base leading-tight">{member.name}</p>
      <div className="inline-flex items-center justify-center px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-['Outfit'] font-bold leading-tight text-center"
        style={{ background: "rgba(211, 15, 37,0.09)", color: "#D30F25", border: "1px solid rgba(211, 15, 37,0.2)" }}>
        {member.role}
      </div>
      <p className="font-mono text-[#9CA3AF] text-[9px] md:text-xs">{member.nim}</p>
    </div>
  </div>
);

export function AboutPage() {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* Header */}
      <div
        className="relative overflow-hidden flex flex-col items-center justify-center text-center px-5"
        style={{ paddingTop: 116, paddingBottom: 72, background: "linear-gradient(135deg,#1A3A5C 0%,#D30F25 100%)" }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle,rgba(255, 236, 1,0.7) 0%,transparent 70%)", transform: "translate(25%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,0.7) 0%,transparent 70%)", transform: "translate(-20%,30%)" }} />
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-['Plus_Jakarta_Sans'] font-semibold text-sm mb-4"
          style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.9)" }}>
          <GununganLogo size={16} /> Mahaasyik × Grup PKI
        </div>
        <h1 className="font-['Outfit'] font-black text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 6vw, 4rem)" }}>
          Tentang{" "}
          <span style={{ background: "linear-gradient(135deg,#FFE066 0%,#FFD700 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Kami
          </span>
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] mt-3 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem" }}>
          Website ini dibuat sebagai proyek kelompok mata kuliah Pemrograman Website 2 — menggabungkan teknologi modern dengan kecintaan terhadap Ayam Pecak.
        </p>
        <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" style={{ display: "block" }} aria-hidden="true">
            <path d="M0,10 C360,48 720,4 1080,30 C1260,44 1380,12 1440,22 L1440,48 L0,48 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Vision / Mission / Values */}
      <section className="py-20 px-5 md:px-8" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-12">
            <h2 className="font-['Outfit'] font-black text-[#111827] text-center leading-tight" style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}>
              Visi, Misi &{" "}
              <span style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Filosofi
              </span>
            </h2>
            <div className="w-[60px] h-1 rounded-full" style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)" }} />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Visi Kami", body: "Menjadi pelestari cita rasa kuliner Nusantara, khususnya sajian Ayam Pecak, dengan membawa pengalaman bersantap autentik kepada masyarakat luas melalui inovasi modern." },
              { title: "Misi Kami", body: "Menyajikan makanan dengan bahan segar berkualitas, melestarikan resep turun-temurun, serta memberikan pelayanan ramah khas keramahtamahan Indonesia yang hangat." },
              { title: "Filosofi 'Mahaasyik'", body: "'Maha' berarti luar biasa, dan 'Asyik' berarti menyenangkan. Kami percaya setiap hidangan harus memberikan kebahagiaan luar biasa di setiap suapan." },
            ].map((v, i) => (
              <div key={i} className="flex flex-col gap-3 p-8 rounded-3xl bg-white" style={{ boxShadow: "0 4px 24px rgba(17, 24, 39,0.06)", borderTop: i === 0 ? "4px solid #D30F25" : i === 1 ? "4px solid #FFEC01" : "4px solid #2D6A4F" }}>
                <h3 className="font-['Outfit'] font-black text-[#111827] text-xl">{v.title}</h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20 px-5 md:px-8" style={{ background: "#F0E6D8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-12">
            <h2 className="font-['Outfit'] font-black text-[#111827] text-center leading-tight" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
              Dibangun Dengan{" "}
              <span style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Teknologi Modern
              </span>
            </h2>
            <div className="w-[60px] h-1 rounded-full" style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)" }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="tech-card flex flex-col items-center gap-3 p-7 rounded-3xl bg-white text-center"
                style={{ boxShadow: "0 3px 16px rgba(17, 24, 39,0.08)" }}>
                <span style={{ fontSize: "2.8rem" }}>{tech.icon}</span>
                <div>
                  <p className="font-['Outfit'] font-black text-[#111827] text-base">{tech.name}</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-[#6B7280] text-xs mt-0.5">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-5 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 mb-4">
            <h2 className="font-['Outfit'] font-black text-[#111827] text-center leading-tight" style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}>
              Grup{" "}
              <span style={{ background: "linear-gradient(135deg,#D30F25 0%,#FFEC01 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                PKI (Persatuan Komputer Indonesia)
              </span>
            </h2>
            <div className="w-[60px] h-1 rounded-full" style={{ background: "linear-gradient(90deg,#D30F25,#FFEC01)" }} />
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-center text-sm mb-12 max-w-md mx-auto leading-relaxed">
            Tim mahasiswa yang bersemangat membangun proyek ini dengan penuh dedikasi dan kecintaan terhadap teknologi & Ayam Pecak.
          </p>
          <div className="w-full max-w-[700px] mx-auto flex flex-col gap-3 md:gap-6 items-center px-2">
            <div className="grid grid-cols-3 gap-3 md:gap-6 w-full">
              {MEMBERS.slice(0, 3).map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
            <div className="flex justify-center gap-3 md:gap-6 w-full">
              {MEMBERS.slice(3, 5).map((member) => (
                <div key={member.name} className="w-[31.5%] md:w-[31.5%]">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

