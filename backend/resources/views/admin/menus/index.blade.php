@extends('admin.layouts.app')
@section('title','Menu')
@section('page-title','Manajemen Menu')
@section('content')
<div class="page-header">
  <div>
    <h1>Menu Restoran</h1>
    <div class="breadcrumb">Kelola semua item menu</div>
  </div>
  <a href="{{ route('admin.menus.create') }}" class="btn btn-primary">+ Tambah Menu</a>
</div>

<div class="card">
  <form class="filter-bar" method="GET">
    <input type="text" name="search" value="{{ request('search') }}" placeholder="Cari menu..." />
    <select name="category_id">
      <option value="">Semua Kategori</option>
      @foreach($categories as $cat)
        <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
      @endforeach
    </select>
    <button type="submit" class="btn btn-secondary">Filter</button>
    <a href="{{ route('admin.menus.index') }}" class="btn btn-secondary">Reset</a>
    <span style="margin-left:auto;color:#6b7280;font-size:0.82rem;">{{ $menus->total() }} item ditemukan</span>
  </form>

  <div class="table-wrap">
    <table>
      <thead><tr><th>Nama</th><th>Kategori</th><th>Harga</th><th>Tersedia</th><th>Andalan</th><th>Aksi</th></tr></thead>
      <tbody>
        @forelse($menus as $menu)
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              @if($menu->image_path)
                <img src="{{ asset('storage/'.$menu->image_path) }}" alt="{{ $menu->name }}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;" />
              @else
                <div style="width:40px;height:40px;background:#e5e7eb;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">🍽️</div>
              @endif
              <div>
                <div style="font-weight:600;">{{ $menu->name }}</div>
                <div style="color:#6b7280;font-size:0.75rem;">{{ Str::limit($menu->description, 50) }}</div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-info">{{ $menu->category->name ?? '-' }}</span></td>
          <td>Rp {{ number_format($menu->price,0,',','.') }}</td>
          <td>
            @if($menu->is_available)
              <span class="badge badge-success">✓ Tersedia</span>
            @else
              <span class="badge badge-danger">✗ Habis</span>
            @endif
          </td>
          <td>{{ $menu->is_recommended ? '⭐' : '-' }}</td>
          <td>
            <div style="display:flex;gap:6px;">
              <a href="{{ route('admin.menus.edit', $menu) }}" class="btn btn-sm btn-secondary">✏️ Edit</a>
              <form action="{{ route('admin.menus.destroy', $menu) }}" method="POST" onsubmit="return confirm('Hapus menu ini?')">
                @csrf @method('DELETE')
                <button class="btn btn-sm btn-danger" type="submit">🗑️</button>
              </form>
            </div>
          </td>
        </tr>
        @empty
        <tr><td colspan="6" style="text-align:center;color:#6b7280;padding:32px;">Tidak ada menu ditemukan.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
  <div class="pagination">{{ $menus->withQueryString()->links('pagination::simple-bootstrap-4') }}</div>
</div>
@endsection
