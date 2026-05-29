@extends('admin.layouts.app')
@section('title','Kategori')
@section('page-title','Manajemen Kategori')
@section('content')
<div class="page-header">
  <div><h1>Kategori Menu</h1></div>
  <a href="{{ route('admin.categories.create') }}" class="btn btn-primary">+ Tambah Kategori</a>
</div>
<div class="card">
  <div class="table-wrap">
    <table>
      <thead><tr><th>Nama</th><th>Ikon</th><th>Jumlah Menu</th><th>Urutan</th><th>Aksi</th></tr></thead>
      <tbody>
        @forelse($categories as $cat)
        <tr>
          <td style="font-weight:600;">{{ $cat->name }}</td>
          <td>{{ $cat->icon }}</td>
          <td>{{ $cat->menus_count }} menu</td>
          <td>{{ $cat->sort_order }}</td>
          <td>
            <div style="display:flex;gap:6px;">
              <a href="{{ route('admin.categories.edit', $cat) }}" class="btn btn-sm btn-secondary">✏️ Edit</a>
              <form action="{{ route('admin.categories.destroy', $cat) }}" method="POST" onsubmit="return confirm('Hapus kategori ini?')">
                @csrf @method('DELETE')
                <button class="btn btn-sm btn-danger" type="submit">🗑️</button>
              </form>
            </div>
          </td>
        </tr>
        @empty
        <tr><td colspan="5" style="text-align:center;color:#6b7280;padding:32px;">Belum ada kategori.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
</div>
@endsection
