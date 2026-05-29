@extends('admin.layouts.app')
@section('title','Detail Delivery')
@section('page-title','Detail Pesanan Delivery')
@section('content')
<div class="page-header">
  <div><h1>{{ $delivery->delivery_code }}</h1></div>
  <a href="{{ route('admin.deliveries.index') }}" class="btn btn-secondary">← Kembali</a>
</div>
<div class="detail-grid">
  <div class="card">
    <div class="card-title">📝 Informasi Pelanggan</div>
    <div class="detail-row"><div class="detail-label">Nama</div><div class="detail-value">{{ $delivery->name }}</div></div>
    <div class="detail-row"><div class="detail-label">Telepon</div><div class="detail-value">{{ $delivery->phone }}</div></div>
    <div class="detail-row"><div class="detail-label">Email</div><div class="detail-value">{{ $delivery->email }}</div></div>
    <div class="detail-row"><div class="detail-label">Alamat</div><div class="detail-value">{{ $delivery->address }}</div></div>
    @if($delivery->notes)
    <div class="detail-row"><div class="detail-label">Catatan</div><div class="detail-value">{{ $delivery->notes }}</div></div>
    @endif
    <div class="detail-row"><div class="detail-label">Metode Pengiriman</div><div class="detail-value">{{ strtoupper(str_replace('_',' ',$delivery->delivery_method ?? '-')) }}</div></div>
    <div class="detail-row"><div class="detail-label">Metode Pembayaran</div><div class="detail-value">{{ strtoupper($delivery->payment_method ?? '-') }}</div></div>
    <div class="detail-row"><div class="detail-label">Dibuat</div><div class="detail-value">{{ $delivery->created_at->format('d M Y H:i') }}</div></div>
  </div>

  <div class="card">
    <div class="card-title">📊 Status &amp; Pembayaran</div>
    @php $sc=['pending'=>'warning','processing'=>'info','delivering'=>'primary','delivered'=>'success','cancelled'=>'danger']; @endphp
    <div class="detail-row">
      <div class="detail-label">Status Order</div>
      <div class="detail-value"><span class="badge badge-{{ $sc[$delivery->status] ?? 'gray' }}">{{ ucfirst($delivery->status) }}</span></div>
    </div>
    <div class="detail-row"><div class="detail-label">Status Pembayaran</div><div class="detail-value">{{ ucfirst($delivery->payment_status) }}</div></div>
    @if($delivery->promo_code)
    <div class="detail-row"><div class="detail-label">Kode Promo</div><div class="detail-value"><code>{{ $delivery->promo_code }}</code></div></div>
    @endif
    <div class="detail-row"><div class="detail-label">Subtotal</div><div class="detail-value">Rp {{ number_format($delivery->subtotal,0,',','.') }}</div></div>
    @if($delivery->discount_amount > 0)
    <div class="detail-row"><div class="detail-label">Diskon</div><div class="detail-value" style="color:#2D6A4F;">- Rp {{ number_format($delivery->discount_amount,0,',','.') }}</div></div>
    @endif
    <div class="detail-row"><div class="detail-label">Ongkos Kirim</div><div class="detail-value">Rp {{ number_format($delivery->delivery_fee,0,',','.') }}</div></div>
    <div class="detail-row"><div class="detail-label">Total</div><div class="detail-value" style="font-weight:700;font-size:1rem;">Rp {{ number_format($delivery->total_price,0,',','.') }}</div></div>

    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
      <div class="card-title">Ubah Status Order</div>
      <form action="{{ route('admin.deliveries.update-status', $delivery) }}" method="POST" style="display:flex;gap:8px;">
        @csrf @method('PATCH')
        <select name="status" class="form-control" style="flex:1;">
          @foreach(['pending','processing','delivering','delivered','cancelled'] as $s)
            <option value="{{ $s }}" {{ $delivery->status===$s ? 'selected':'' }}>{{ ucfirst($s) }}</option>
          @endforeach
        </select>
        <button type="submit" class="btn btn-primary btn-sm">💾 Simpan</button>
      </form>
    </div>
  </div>
</div>

<div class="card" style="margin-top:16px;">
  <div class="card-title">🍽️ Item Pesanan</div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Menu</th><th>Harga Satuan</th><th>Qty</th><th>Subtotal</th></tr></thead>
      <tbody>
        @forelse($delivery->items as $item)
        <tr>
          <td>{{ $item->name }}</td>
          <td>Rp {{ number_format($item->price,0,',','.') }}</td>
          <td>{{ $item->quantity }}</td>
          <td>Rp {{ number_format($item->subtotal,0,',','.') }}</td>
        </tr>
        @empty
        <tr><td colspan="4" style="text-align:center;color:#6b7280;padding:16px;">Tidak ada item.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
</div>
@endsection
