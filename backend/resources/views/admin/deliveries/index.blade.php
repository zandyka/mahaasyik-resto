@extends('admin.layouts.app')
@section('title','Delivery')
@section('page-title','Daftar Pesanan Delivery')
@section('content')
<div class="page-header">
  <div><h1>Pesanan Delivery</h1><div class="breadcrumb">Kelola semua pesanan antar</div></div>
</div>
<div class="card">
  <form class="filter-bar" method="GET">
    <input type="text" name="search" value="{{ request('search') }}" placeholder="Cari nama / kode..." />
    <select name="status">
      <option value="">Semua Status</option>
      @foreach(['pending','processing','delivering','delivered','cancelled'] as $s)
        <option value="{{ $s }}" {{ request('status')===$s ? 'selected':'' }}>{{ ucfirst($s) }}</option>
      @endforeach
    </select>
    <button type="submit" class="btn btn-secondary">Filter</button>
    <a href="{{ route('admin.deliveries.index') }}" class="btn btn-secondary">Reset</a>
    <span style="margin-left:auto;font-size:0.82rem;color:#6b7280;">{{ $deliveries->total() }} pesanan</span>
  </form>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Kode</th><th>Nama</th><th>Alamat</th><th>Total</th><th>Pengiriman</th><th>Bayar</th><th>Status</th><th>Waktu</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        @forelse($deliveries as $d)
        @php $sc=['pending'=>'warning','processing'=>'info','delivering'=>'primary','delivered'=>'success','cancelled'=>'danger']; @endphp
        <tr>
          <td><code style="font-size:0.75rem;">{{ $d->delivery_code }}</code></td>
          <td>
            <div style="font-weight:600;">{{ $d->name }}</div>
            <div style="font-size:0.75rem;color:#6b7280;">{{ $d->phone }}</div>
          </td>
          <td style="font-size:0.78rem;max-width:160px;">{{ Str::limit($d->address, 40) }}</td>
          <td>Rp {{ number_format($d->total_price,0,',','.') }}</td>
          <td style="font-size:0.78rem;">{{ strtoupper(str_replace('_',' ',$d->delivery_method ?? '-')) }}</td>
          <td style="font-size:0.78rem;">{{ strtoupper($d->payment_method ?? '-') }}</td>
          <td><span class="badge badge-{{ $sc[$d->status] ?? 'gray' }}">{{ ucfirst($d->status) }}</span></td>
          <td style="font-size:0.75rem;color:#6b7280;">{{ $d->created_at->diffForHumans() }}</td>
          <td><a href="{{ route('admin.deliveries.show', $d) }}" class="btn btn-sm btn-secondary">👁️ Detail</a></td>
        </tr>
        @empty
        <tr><td colspan="9" style="text-align:center;color:#6b7280;padding:32px;">Tidak ada pesanan delivery.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
  <div class="pagination">{{ $deliveries->withQueryString()->links('pagination::simple-bootstrap-4') }}</div>
</div>
@endsection
