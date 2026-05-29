@extends('admin.layouts.app')
@section('title', isset($menu) ? 'Edit Menu' : 'Tambah Menu')
@section('page-title', isset($menu) ? 'Edit Menu' : 'Tambah Menu Baru')
@section('content')
<div class="page-header">
  <div>
    <h1>{{ isset($menu) ? 'Edit: '.$menu->name : 'Tambah Menu Baru' }}</h1>
  </div>
  <a href="{{ route('admin.menus.index') }}" class="btn btn-secondary">← Kembali</a>
</div>

<div class="card" style="max-width:700px;">
  <form action="{{ isset($menu) ? route('admin.menus.update', $menu) : route('admin.menus.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    @if(isset($menu)) @method('PUT') @endif

    <div class="form-grid form-grid-2">
      <div class="form-group">
        <label>Nama Menu *</label>
        <input class="form-control @error('name') is-invalid @enderror" type="text" name="name" value="{{ old('name', $menu->name ?? '') }}" required />
        @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
      </div>
      <div class="form-group">
        <label>Kategori *</label>
        <select class="form-control @error('category_id') is-invalid @enderror" name="category_id" required>
          <option value="">-- Pilih Kategori --</option>
          @foreach($categories as $cat)
            <option value="{{ $cat->id }}" {{ old('category_id', $menu->category_id ?? '') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
          @endforeach
        </select>
        @error('category_id')<div class="invalid-feedback">{{ $message }}</div>@enderror
      </div>
      <div class="form-group">
        <label>Harga (Rp) *</label>
        <input class="form-control @error('price') is-invalid @enderror" type="number" name="price" value="{{ old('price', $menu->price ?? '') }}" min="0" required />
        @error('price')<div class="invalid-feedback">{{ $message }}</div>@enderror
      </div>
      <div class="form-group">
        <label>Foto Menu</label>
        @if(isset($menu) && $menu->image_path)
          <div style="margin-bottom:8px;">
            <img src="{{ asset('storage/'.$menu->image_path) }}" alt="Preview" style="height:60px;border-radius:6px;object-fit:cover;" />
          </div>
        @endif
        <input class="form-control" type="file" name="image" accept="image/*" />
      </div>
      <div class="form-group" style="grid-column:1/-1;">
        <label>Deskripsi</label>
        <textarea class="form-control" name="description" rows="3" placeholder="Deskripsi singkat menu...">{{ old('description', $menu->description ?? '') }}</textarea>
      </div>
      <div class="form-group">
        <label>Urutan Tampil</label>
        <input class="form-control" type="number" name="sort_order" value="{{ old('sort_order', $menu->sort_order ?? 0) }}" min="0" />
      </div>
      <div class="form-group" style="justify-content:center;gap:16px;flex-direction:row;align-items:flex-end;">
        <label class="form-check">
          <input type="checkbox" name="is_available" value="1" {{ old('is_available', $menu->is_available ?? true) ? 'checked' : '' }} />
          Tersedia
        </label>
        <label class="form-check">
          <input type="checkbox" name="is_recommended" value="1" {{ old('is_recommended', $menu->is_recommended ?? false) ? 'checked' : '' }} />
          Andalan ⭐
        </label>
      </div>
    </div>

    <div style="display:flex;gap:10px;margin-top:20px;">
      <button type="submit" class="btn btn-primary">{{ isset($menu) ? '💾 Simpan Perubahan' : '➕ Tambah Menu' }}</button>
      <a href="{{ route('admin.menus.index') }}" class="btn btn-secondary">Batal</a>
    </div>
  </form>
</div>
@endsection
