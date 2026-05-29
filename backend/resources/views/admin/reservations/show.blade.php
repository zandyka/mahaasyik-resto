@extends('admin.layouts.app')
@section('title','Detail Reservasi')
@section('page-title','Detail Reservasi')
@section('content')
<div class="page-header">
  <div><h1>{{ $reservation->reservation_code }}</h1></div>
  <a href="{{ route('admin.reservations.index') }}" class="btn btn-secondary">← Kembali</a>
</div>
<div class="detail-grid">
  <div class="card">
    <div class="card-title">📝 Informasi Tamu</div>
    <div class="detail-row"><div class="detail-label">Nama</div><div class="detail-value">{{ $reservation->name }}</div></div>
    <div class="detail-row"><div class="detail-label">Telepon</div><div class="detail-value">{{ $reservation->phone }}</div></div>
    <div class="detail-row"><div class="detail-label">Email</div><div class="detail-value">{{ $reservation->email }}</div></div>
    <div class="detail-row"><div class="detail-label">Tanggal</div><div class="detail-value">{{ $reservation->date->format('l, d F Y') }}</div></div>
    <div class="detail-row"><div class="detail-label">Jam</div><div class="detail-value">⏰ {{ $reservation->time }}</div></div>
    <div class="detail-row"><div class="detail-label">Jumlah Tamu</div><div class="detail-value">👨‍👩‍👦 {{ $reservation->adults }} dewasa, {{ $reservation->children }} anak</div></div>
    <div class="detail-row"><div class="detail-label">Area Duduk</div><div class="detail-value">{{ $reservation->seating_area_label }}</div></div>
    @if($reservation->message)
    <div class="detail-row"><div class="detail-label">Catatan</div><div class="detail-value">{{ $reservation->message }}</div></div>
    @endif
    <div class="detail-row"><div class="detail-label">Dibuat</div><div class="detail-value">{{ $reservation->created_at->format('d M Y H:i') }}</div></div>
  </div>

  <div class="card">
    <div class="card-title">📊 Status &amp; Pembayaran</div>
    @php $sc=['pending'=>'warning','confirmed'=>'success','cancelled'=>'danger']; @endphp
    <div class="detail-row">
      <div class="detail-label">Status Reservasi</div>
      <div class="detail-value"><span class="badge badge-{{ $sc[$reservation->status] ?? 'gray' }}">{{ ucfirst($reservation->status) }}</span></div>
    </div>
    <div class="detail-row"><div class="detail-label">Status Pembayaran</div><div class="detail-value">{{ ucfirst($reservation->payment_status) }}</div></div>
    @if($reservation->promo_code)
    <div class="detail-row"><div class="detail-label">Kode Promo</div><div class="detail-value"><code>{{ $reservation->promo_code }}</code></div></div>
    @endif
    <div class="detail-row"><div class="detail-label">Subtotal</div><div class="detail-value">Rp {{ number_format($reservation->subtotal,0,',','.') }}</div></div>
    @if($reservation->discount_amount > 0)
    <div class="detail-row"><div class="detail-label">Diskon</div><div class="detail-value" style="color:#2D6A4F;">- Rp {{ number_format($reservation->discount_amount,0,',','.') }}</div></div>
    @endif
    <div class="detail-row"><div class="detail-label">DP (30%)</div><div class="detail-value">Rp {{ number_format($reservation->dp_amount,0,',','.') }}</div></div>
    <div class="detail-row"><div class="detail-label">Total</div><div class="detail-value" style="font-weight:700;font-size:1rem;">Rp {{ number_format($reservation->total_price,0,',','.') }}</div></div>

    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
      <div class="card-title">Ubah Status Reservasi</div>
      <form action="{{ route('admin.reservations.update-status', $reservation) }}" method="POST" style="display:flex;gap:8px;align-items:center;">
        @csrf @method('PATCH')
        <select name="status" class="form-control" style="flex:1;">
          <option value="pending" {{ $reservation->status==='pending' ? 'selected':'' }}>Pending</option>
          <option value="confirmed" {{ $reservation->status==='confirmed' ? 'selected':'' }}>Confirmed ✓</option>
          <option value="cancelled" {{ $reservation->status==='cancelled' ? 'selected':'' }}>Cancelled ✗</option>
        </select>
        <button type="submit" class="btn btn-primary btn-sm">💾 Simpan</button>
      </form>
    </div>
  </div>
</div>

@if($reservation->items->isNotEmpty())
<div class="card" style="margin-top:16px;">
  <div class="card-title">🍽️ Item Pre-Order</div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Menu</th><th>Harga Satuan</th><th>Qty</th><th>Subtotal</th></tr></thead>
      <tbody>
        @foreach($reservation->items as $item)
        <tr>
          <td>{{ $item->name }}</td>
          <td>Rp {{ number_format($item->price,0,',','.') }}</td>
          <td>{{ $item->quantity }}</td>
          <td>Rp {{ number_format($item->subtotal,0,',','.') }}</td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </div>
</div>
@endif
@endsection
