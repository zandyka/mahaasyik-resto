import { formatRp } from '@/utils/helpers';
import React, { useState, useEffect, useMemo, memo } from "react";
import { Menu, X, Search, Moon, Sun, Drumstick } from "lucide-react";
import api from "@/api";
export function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/history')
      .then(res => {
        setHistory(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pb-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-10">
        <h2 className="font-['Outfit'] font-black text-[#111827] text-3xl mb-6">📜 Riwayat Pesanan</h2>
        
        {loading ? (
          <p className="text-[#6B7280] font-['Plus_Jakarta_Sans']">Memuat riwayat...</p>
        ) : history.length === 0 ? (
          <div className="p-10 text-center rounded-3xl" style={{ background: "white", border: "1px solid rgba(17, 24, 39,0.07)" }}>
            <span className="text-4xl">📭</span>
            <p className="font-['Outfit'] font-bold text-[#6B7280] mt-4">Belum ada riwayat pesanan/reservasi.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((item: any, idx: number) => {
              const isRes = item.type === 'reservation';
              const code = isRes ? item.reservation_code : item.delivery_code;
              const dateStr = new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={idx} className="bg-white p-5 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                  style={{ border: "1px solid rgba(17, 24, 39,0.08)", boxShadow: "0 4px 12px rgba(17, 24, 39,0.03)" }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" 
                        style={isRes ? { background: "#E8F5E9", color: "#2E7D32" } : { background: "#FFF3E0", color: "#E65100" }}>
                        {isRes ? 'Reservasi' : 'Delivery'}
                      </span>
                      <span className="font-mono text-[#6B7280] text-xs">{code}</span>
                    </div>
                    <p className="font-['Outfit'] font-bold text-[#111827] text-lg">{item.name}</p>
                    <p className="font-['Plus_Jakarta_Sans'] text-[#4B5563] text-xs">{dateStr} WIB</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1 w-full md:w-auto">
                    <span className="font-['Outfit'] font-black text-lg" style={{ color: "#D30F25" }}>
                      {formatRp(item.total_price || item.dp_amount || 0)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" 
                      style={item.status === 'pending' ? { background: "#FFF9C4", color: "#F57F17" } 
                        : item.status === 'cancelled' ? { background: "#FFEBEE", color: "#C62828" }
                        : { background: "#E8F5E9", color: "#2E7D32" }}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
