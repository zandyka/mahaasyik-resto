@extends('admin.layouts.app')
@section('title', 'Dashboard')
@section('page-title', 'Dashboard Overview')

@push('styles')
<style>
.today-table { width: 100%; font-size: 0.82rem; }
.today-table td { padding: 7px 0; border-bottom: 1px solid #f3f4f6; }
.today-table tr:last-child td { border: none; }
.recent-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 0.82rem; }
.recent-item:last-child { border: none; }
</style>
<style>
#calendar {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  min-height: 600px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border);
}

/* FullCalendar v6 custom styles */
.fc .fc-button-primary {
  background-color: #D30F25 !important;
  border-color: #D30F25 !important;
  text-transform: capitalize;
  font-weight: 600;
}
.fc .fc-button-primary:hover {
  background-color: #b50d1f !important;
  border-color: #b50d1f !important;
}
.fc .fc-button-primary:disabled {
  background-color: #e5e7eb !important;
  border-color: #e5e7eb !important;
  color: #9ca3af !important;
}
.fc-event {
  cursor: pointer;
  border-radius: 4px;
  padding: 4px 6px;
  border: none !important;
}
.fc-event-title-container {
  display: flex;
  flex-direction: column;
}
.fc-event-title {
  font-weight: 700;
  font-size: 0.8rem;
}
.fc-event-sub {
  font-size: 0.72rem;
  opacity: 0.95;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Modal overlay */
#resModal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 9999;
  align-items: center;
  justify-content: center;
}
#resModal.open { display: flex; }
.modal-box {
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  width: 440px;
  max-width: 95vw;
  box-shadow: 0 24px 60px rgba(0,0,0,0.25);
  animation: fadeInUp 0.25s ease;
}
@keyframes fadeInUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.modal-title { font-size: 1.1rem; font-weight: 700; color: #1e2532; }
.modal-close {
  background: none; border: none; font-size: 1.4rem;
  cursor: pointer; color: #9CA3AF; line-height: 1;
}
.modal-close:hover { color: #D30F25; }
.modal-row {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.87rem;
}
.modal-row:last-of-type { border: none; }
.modal-label {
  font-weight: 600;
  font-size: 0.73rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  min-width: 100px;
  padding-top: 2px;
}
.modal-val { color: #1e2532; }
.modal-footer { margin-top: 18px; display: flex; gap: 10px; }
.modal-btn {
  flex: 1; padding: 10px;
  border-radius: 8px; border: none; cursor: pointer;
  font-family: inherit; font-size: 0.85rem; font-weight: 600;
  transition: all 0.18s;
}
.modal-btn-primary {
  background: linear-gradient(135deg,#D30F25,#FFEC01);
  color: #fff;
}
.modal-btn-primary:hover { filter: brightness(0.95); }
.modal-btn-secondary {
  background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;
}
.modal-btn-secondary:hover { background: #e5e7eb; }
</style>
@endpush

@section('content')
{{-- STAT CARDS --}}
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-icon" style="background:rgba(232,82,26,0.1);">📅</div>
    <div class="stat-info">
      <div class="value">{{ $totalReservations }}</div>
      <div class="label">Total Reservasi</div>
      @if($pendingReservations > 0)
        <div class="sub pending">{{ $pendingReservations }} menunggu</div>
      @endif
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-icon" style="background:rgba(37,99,235,0.1);">🛵</div>
    <div class="stat-info">
      <div class="value">{{ $totalDeliveries }}</div>
      <div class="label">Total Delivery</div>
      @if($pendingDeliveries > 0)
        <div class="sub pending">{{ $pendingDeliveries }} menunggu</div>
      @endif
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-icon" style="background:rgba(45,106,79,0.1);">💰</div>
    <div class="stat-info">
      <div class="value">Rp {{ number_format($totalRevenue,0,',','.') }}</div>
      <div class="label">Total Revenue (Paid)</div>
    </div>
  </div>
  <div class="stat-card">
    <div class="stat-icon" style="background:rgba(217,119,6,0.1);">🍽️</div>
    <div class="stat-info">
      <div class="value">{{ $activeMenus }}</div>
      <div class="label">Menu Aktif</div>
    </div>
  </div>
</div>

{{-- CHARTS ROW 1 --}}
<div class="charts-grid" style="margin-bottom:16px;">
  <div class="card">
    <div class="card-title">📈 Pesanan 7 Hari Terakhir</div>
    <canvas id="ordersChart" height="110"></canvas>
  </div>
  <div class="card">
    <div class="card-title">🥧 Metode Pembayaran Delivery</div>
    <canvas id="paymentChart" height="110"></canvas>
  </div>
</div>

{{-- CHARTS ROW 2 --}}
<div class="charts-grid charts-grid-2" style="margin-bottom:16px;">
  <div class="card">
    <div class="card-title">🏆 Top 5 Menu Terlaris</div>
    <canvas id="topMenuChart" height="120"></canvas>
  </div>
  <div class="card">
    <div class="card-title">📅 Reservasi Hari Ini ({{ now()->format('d M Y') }})</div>
    @if($todayReservations->isEmpty())
      <p style="color:#6b7280;font-size:0.85rem;">Tidak ada reservasi hari ini.</p>
    @else
      <table class="today-table">
        @foreach($todayReservations as $r)
        <tr>
          <td>⏰ {{ $r->time }}</td>
          <td>{{ $r->name }}</td>
          <td>👥 {{ $r->adults + $r->children }}</td>
          <td>
            <span class="badge badge-{{ $r->status === 'confirmed' ? 'success' : ($r->status === 'cancelled' ? 'danger' : 'warning') }}">
              {{ ucfirst($r->status) }}
            </span>
          </td>
          <td><a href="{{ route('admin.reservations.show', $r->id) }}" style="color:#E8521A;font-size:0.75rem;">Detail</a></td>
        </tr>
        @endforeach
      </table>
    @endif
  </div>
</div>

{{-- RECENT DELIVERIES --}}
<div class="card">
  <div class="card-title">🛵 5 Delivery Terbaru</div>
  @if($recentDeliveries->isEmpty())
    <p style="color:#6b7280;font-size:0.85rem;">Belum ada pesanan delivery.</p>
  @else
  <div class="table-wrap">
    <table>
      <thead><tr><th>Kode</th><th>Nama</th><th>Total</th><th>Metode Bayar</th><th>Status</th><th>Waktu</th></tr></thead>
      <tbody>
        @foreach($recentDeliveries as $d)
        <tr>
          <td><code style="font-size:0.75rem;">{{ $d->delivery_code }}</code></td>
          <td>{{ $d->name }}</td>
          <td>Rp {{ number_format($d->total_price,0,',','.') }}</td>
          <td>{{ strtoupper($d->payment_method ?? '-') }}</td>
          <td>
            @php $sc=['pending'=>'warning','processing'=>'info','delivering'=>'primary','delivered'=>'success','cancelled'=>'danger'] @endphp
            <span class="badge badge-{{ $sc[$d->status] ?? 'gray' }}">{{ ucfirst($d->status) }}</span>
          </td>
          <td style="color:#6b7280;font-size:0.78rem;">{{ $d->created_at->diffForHumans() }}</td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </div>
  @endif
</div>

<div class="card" style="padding: 0; border: none; background: transparent;">
  <div id="calendar"></div>
</div>

<!-- DETAIL MODAL -->
<div id="resModal" onclick="if(event.target===this)closeModal()">
  <div class="modal-box">
    <div class="modal-header">
      <div class="modal-title">📅 Detail Reservasi</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-row"><span class="modal-label">Nama</span><span class="modal-val" id="mName">—</span></div>
    <div class="modal-row"><span class="modal-label">Kode</span><span class="modal-val"><code id="mCode">—</code></span></div>
    <div class="modal-row"><span class="modal-label">Tanggal</span><span class="modal-val" id="mDate">—</span></div>
    <div class="modal-row"><span class="modal-label">Waktu</span><span class="modal-val" id="mTime">—</span></div>
    <div class="modal-row"><span class="modal-label">Area Duduk</span><span class="modal-val" id="mSeating">—</span></div>
    <div class="modal-row"><span class="modal-label">Jumlah Tamu</span><span class="modal-val" id="mGuests">—</span></div>
    <div class="modal-row"><span class="modal-label">Status</span><span class="modal-val" id="mStatus">—</span></div>
    <div class="modal-footer">
      <button class="modal-btn modal-btn-primary" id="mDetailBtn" onclick="goDetail()">🔍 Lihat Detail Lengkap</button>
      <button class="modal-btn modal-btn-secondary" onclick="closeModal()">Tutup</button>
    </div>
  </div>
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
const days = @json($days);
const paymentMethods = @json($paymentMethods);
const topMenus = @json($topMenus);

// Orders chart
new Chart(document.getElementById('ordersChart'), {
  type: 'bar',
  data: {
    labels: days.map(d => d.label),
    datasets: [
      { label: 'Reservasi', data: days.map(d => d.reservations), backgroundColor: 'rgba(232,82,26,0.7)', borderRadius: 6 },
      { label: 'Delivery',  data: days.map(d => d.deliveries),  backgroundColor: 'rgba(37,99,235,0.7)',  borderRadius: 6 },
    ]
  },
  options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
});

// Payment doughnut
const colors = ['#E8521A','#2563eb','#2D6A4F','#d97706','#7c3aed','#db2777'];
new Chart(document.getElementById('paymentChart'), {
  type: 'doughnut',
  data: {
    labels: paymentMethods.map(p => (p.payment_method || 'unknown').toUpperCase()),
    datasets: [{ data: paymentMethods.map(p => p.total), backgroundColor: colors }]
  },
  options: { responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '65%' }
});

// Top menu bar
new Chart(document.getElementById('topMenuChart'), {
  type: 'bar',
  data: {
    labels: topMenus.map(m => m.name.length > 18 ? m.name.substring(0,18)+'…' : m.name),
    datasets: [{ label: 'Qty Dipesan', data: topMenus.map(m => m.total_qty), backgroundColor: 'rgba(45,106,79,0.75)', borderRadius: 6 }]
  },
  options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } } }
});
</script>
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>
<script>
let currentDetailUrl = '';

function openModal(info) {
  const p = info.event.extendedProps || {};
  
  // Format date natively
  const dateObj = info.event.start;
  const dateStr = dateObj ? dateObj.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—';
  
  document.getElementById('mName').textContent    = info.event.title || '—';
  document.getElementById('mCode').textContent    = p.code || '—';
  document.getElementById('mDate').textContent    = dateStr;
  document.getElementById('mTime').textContent    = p.time || '—';
  document.getElementById('mSeating').textContent = p.seating || '—';
  document.getElementById('mGuests').textContent  = (p.guests ?? '—') + ' orang';

  // Status badge with color
  const statusEl = document.getElementById('mStatus');
  const colors = { pending: '#d97706', confirmed: '#2D6A4F', cancelled: '#dc2626' };
  const sc = colors[p.status] || '#6b7280';
  statusEl.innerHTML = `<span style="background:${sc}22;color:${sc};padding:2px 12px;border-radius:20px;font-size:0.8rem;font-weight:700;">${(p.status||'').toUpperCase()}</span>`;

  currentDetailUrl = info.event.url || '';
  document.getElementById('resModal').classList.add('open');
}

function closeModal() {
  document.getElementById('resModal').classList.remove('open');
}

function goDetail() {
  if (currentDetailUrl) window.location.href = currentDetailUrl;
}

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'id',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: '{{ route("admin.reservations.calendar-data") }}',
    eventContent: function(info) {
      const p = info.event.extendedProps;
      return {
        html: `
          <div class="fc-event-title-container">
            <div class="fc-event-title">${info.event.title}</div>
            <div class="fc-event-sub">⏰ ${p.time || ''} | 👥 ${p.guests || ''} org</div>
          </div>
        `
      };
    },
    eventClick: function(info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate
      openModal(info);
    }
  });
  calendar.render();
});
</script>
@endpush

