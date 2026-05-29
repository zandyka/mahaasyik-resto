@extends('admin.layouts.app')
@section('title','Kalender Reservasi')
@section('page-title','Kalender Reservasi')

@push('styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" />
<style>
#calendar {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}

/* Customize FullCalendar v3 buttons to match our theme */
.fc-button {
  background: #D30F25 !important;
  border-color: #D30F25 !important;
  color: #fff !important;
  font-size: 0.8rem !important;
  text-shadow: none !important;
  box-shadow: none !important;
}
.fc-button:hover {
  background: #b50d1f !important;
  border-color: #b50d1f !important;
}
.fc-button.fc-state-active {
  background: #8c0a19 !important;
  border-color: #8c0a19 !important;
}
.fc-toolbar h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e2532;
}
.fc-event {
  cursor: pointer;
  border: none !important;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.78rem;
}
.fc-event .fc-title { font-weight: 600; }
.fc-event .fc-sub {
  font-size: 0.7rem;
  opacity: 0.9;
  display: block;
  margin-top: 1px;
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
<div class="page-header">
  <div>
    <h1>Kalender Reservasi</h1>
    <div class="breadcrumb">Klik event untuk melihat detail reservasi</div>
  </div>
  <div style="display:flex;gap:12px;align-items:center;">
    <span style="font-size:0.82rem;display:flex;align-items:center;gap:5px;">
      <span style="display:inline-block;width:12px;height:12px;background:#d97706;border-radius:3px;"></span> Pending
    </span>
    <span style="font-size:0.82rem;display:flex;align-items:center;gap:5px;">
      <span style="display:inline-block;width:12px;height:12px;background:#2D6A4F;border-radius:3px;"></span> Confirmed
    </span>
    <span style="font-size:0.82rem;display:flex;align-items:center;gap:5px;">
      <span style="display:inline-block;width:12px;height:12px;background:#dc2626;border-radius:3px;"></span> Cancelled
    </span>
    <a href="{{ route('admin.reservations.index') }}" class="btn btn-secondary btn-sm">📋 Lihat Tabel</a>
  </div>
</div>

<div class="card">
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/locale/id.js"></script>

<script>
let currentDetailUrl = '';

function openModal(event) {
  const p = event.extendedProps || {};
  document.getElementById('mName').textContent    = event.title || '—';
  document.getElementById('mCode').textContent    = p.code || '—';
  document.getElementById('mDate').textContent    = event.start ? moment(event.start).format('dddd, D MMMM YYYY') : '—';
  document.getElementById('mTime').textContent    = p.time || '—';
  document.getElementById('mSeating').textContent = p.seating || '—';
  document.getElementById('mGuests').textContent  = (p.guests ?? '—') + ' orang';

  // Status badge with color
  const statusEl = document.getElementById('mStatus');
  const colors = { pending: '#d97706', confirmed: '#2D6A4F', cancelled: '#dc2626' };
  const sc = colors[p.status] || '#6b7280';
  statusEl.innerHTML = `<span style="background:${sc}22;color:${sc};padding:2px 12px;border-radius:20px;font-size:0.8rem;font-weight:700;">${(p.status||'').toUpperCase()}</span>`;

  currentDetailUrl = event.url || '';
  document.getElementById('resModal').classList.add('open');
}

function closeModal() {
  document.getElementById('resModal').classList.remove('open');
}

function goDetail() {
  if (currentDetailUrl) window.location.href = currentDetailUrl;
}

$(document).ready(function() {
  $('#calendar').fullCalendar({
    header: {
      left:   'prev,next today',
      center: 'title',
      right:  'month,basicWeek,basicDay'
    },
    locale: 'id',
    navLinks: true,
    editable: false,
    eventLimit: true,
    defaultView: 'month',
    events: function(start, end, timezone, callback) {
      $.ajax({
        url: '{{ route("admin.reservations.calendar-data") }}',
        dataType: 'json',
        success: function(data) {
          // FullCalendar v3 format: map extendedProps flat
          const events = data.map(function(e) {
            const p = e.extendedProps || {};
            return {
              id:       e.id,
              title:    e.title,
              start:    e.start,
              color:    e.color,
              url:      e.url,
              // pass extra data flat so we can access in eventClick
              resCode:  p.code,
              resStatus: p.status,
              resSeating: p.seating,
              resTime:   p.time,
              resGuests: p.guests,
            };
          });
          callback(events);
        },
        error: function() { callback([]); }
      });
    },
    // Render custom content (name + time + guests)
    eventRender: function(event, element) {
      const sub = document.createElement('span');
      sub.className = 'fc-sub';
      sub.textContent = '⏰ ' + (event.resTime || '') + '  👥 ' + (event.resGuests || '') + ' org';
      element.find('.fc-title').after(sub);
    },
    eventClick: function(event, jsEvent, view) {
      jsEvent.preventDefault();
      // Build extendedProps-compatible object from flat fields
      openModal({
        title: event.title,
        start: event.start,
        url:   event.url,
        extendedProps: {
          code:    event.resCode,
          status:  event.resStatus,
          seating: event.resSeating,
          time:    event.resTime,
          guests:  event.resGuests,
        }
      });
    },
  });
});
</script>
@endpush
