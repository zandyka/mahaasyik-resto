@extends('admin.layouts.app')
@section('title','Kode Promo')
@section('page-title','Manajemen Kode Promo')
@section('content')
<div class="page-header">
  <div><h1>Kode Promo / Voucher</h1></div>
  <a href="{{ route('admin.promos.create') }}" class="btn btn-primary">+ Tambah Promo</a>
</div>
<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>Kode</th><th>Deskripsi</th><th>Diskon</th><th>Min. Order</th><th>Dipakai</th><th>Status</th><th>Kadaluarsa</th><th>Aksi</th></tr></thead>
      <tbody>
        @forelse($promos as $promo)
        <tr>
          <td><code style="font-weight:700;font-size:0.85rem;">{{ $promo->code }}</code></td>
          <td style="font-size:0.82rem;color:#6b7280;">{{ Str::limit($promo->description, 40) }}</td>
          <td>
            @if($promo->discount_type === 'percentage')
              <span class="badge badge-primary">{{ $promo->discount_value }}%</span>
            @else
              <span class="badge badge-info">Rp {{ number_format($promo->discount_value,0,',','.') }}</span>
            @endif
          </td>
          <td style="font-size:0.82rem;">Rp {{ number_format($promo->min_order,0,',','.') }}</td>
          <td>{{ $promo->used_count }}{{ $promo->max_uses ? '/'.$promo->max_uses : '' }}x</td>
          <td>
            <form action="{{ route('admin.promos.toggle', $promo) }}" method="POST" style="display:inline;">
              @csrf @method('PATCH')
              <button type="submit" class="badge {{ $promo->is_active ? 'badge-success' : 'badge-gray' }}" style="cursor:pointer;border:none;">
                {{ $promo->is_active ? '✓ Aktif' : '✗ Nonaktif' }}
              </button>
            </form>
          </td>
          <td style="font-size:0.78rem;color:#6b7280;">{{ $promo->expired_at ? $promo->expired_at->format('d M Y') : '∞' }}</td>
          <td>
            <div style="display:flex;gap:6px;">
              <a href="{{ route('admin.promos.edit', $promo) }}" class="btn btn-sm btn-secondary">✏️</a>
              <form action="{{ route('admin.promos.destroy', $promo) }}" method="POST" onsubmit="return confirm('Hapus promo ini?')">
                @csrf @method('DELETE')
                <button class="btn btn-sm btn-danger" type="submit">🗑️</button>
              </form>
            </div>
          </td>
        </tr>
        @empty
        <tr><td colspan="8" style="text-align:center;color:#6b7280;padding:32px;">Belum ada kode promo.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
</div>
@endsection
