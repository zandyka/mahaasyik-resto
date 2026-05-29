@extends('admin.layouts.app')
@section('title','Reservasi')
@section('page-title','Daftar Reservasi')
@section('content')
<div class="page-header">
  <div><h1>Reservasi</h1><div class="breadcrumb">Kelola semua reservasi meja</div></div>
  <a href="{{ route('admin.reservations.calendar') }}" class="btn btn-primary">🗓️ Lihat Kalender</a>
</div>
<div class="card">
  <form class="filter-bar" method="GET">
    <input type="text" name="search" value="{{ request('search') }}" placeholder="Cari nama / kode..." />
    <select name="status">
      <option value="">Semua Status</option>
      <option value="pending" {{ request('status')==='pending' ? 'selected':'' }}>Pending</option>
      <option value="confirmed" {{ request('status')==='confirmed' ? 'selected':'' }}>Confirmed</option>
      <option value="cancelled" {{ request('status')==='cancelled' ? 'selected':'' }}>Cancelled</option>
    </select>
    <input type="date" name="date" value="{{ request('date') }}" />
    <button type="submit" class="btn btn-secondary">Filter</button>
    <a href="{{ route('admin.reservations.index') }}" class="btn btn-secondary">Reset</a>
    <span style="margin-left:auto;font-size:0.82rem;color:#6b7280;">{{ $reservations->total() }} reservasi</span>
  </form>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Kode</th><th>Nama</th><th>Tgl &amp; Jam</th><th>Tamu</th><th>Area</th><th>Status</th><th>Bayar</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        @forelse($reservations as $r)
        @php $sc=['pending'=>'warning','confirmed'=>'success','cancelled'=>'danger']; @endphp
        <tr>
          <td><code style="font-size:0.75rem;">{{ $r->reservation_code }}</code></td>
          <td>
            <div style="font-weight:600;">{{ $r->name }}</div>
            <div style="font-size:0.75rem;color:#6b7280;">{{ $r->phone }}</div>
          </td>
          <td>{{ $r->date->format('d M Y') }}<br><span style="color:#6b7280;font-size:0.78rem;">⏰ {{ $r->time }}</span></td>
          <td>👥 {{ $r->adults }}+{{ $r->children }}</td>
          <td style="font-size:0.78rem;">{{ ucwords(str_replace(['_lt',' ',' '],[' Lt.',' ',' '],$r->seating_area)) }}</td>
          <td><span class="badge badge-{{ $sc[$r->status] ?? 'gray' }}">{{ ucfirst($r->status) }}</span></td>
          <td>
            @php $ps=['paid'=>'success','pending'=>'warning','unpaid'=>'danger']; @endphp
            <span class="badge badge-{{ $ps[$r->payment_status] ?? 'gray' }}">{{ ucfirst($r->payment_status) }}</span>
          </td>
          <td><a href="{{ route('admin.reservations.show', $r) }}" class="btn btn-sm btn-secondary">👁️ Detail</a></td>
        </tr>
        @empty
        <tr><td colspan="8" style="text-align:center;color:#6b7280;padding:32px;">Tidak ada reservasi.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
  <div class="pagination">{{ $reservations->withQueryString()->links('pagination::simple-bootstrap-4') }}</div>
</div>
@endsection
