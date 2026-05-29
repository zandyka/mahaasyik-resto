@extends('admin.layouts.app')
@section('title', isset($category) ? 'Edit Kategori' : 'Tambah Kategori')
@section('page-title', isset($category) ? 'Edit Kategori' : 'Tambah Kategori')
@section('content')
<div class="page-header">
  <h1>{{ isset($category) ? 'Edit: '.$category->name : 'Tambah Kategori' }}</h1>
  <a href="{{ route('admin.categories.index') }}" class="btn btn-secondary">← Kembali</a>
</div>
<div class="card" style="max-width:480px;">
  <form action="{{ isset($category) ? route('admin.categories.update', $category) : route('admin.categories.store') }}" method="POST">
    @csrf
    @if(isset($category)) @method('PUT') @endif
    <div class="form-grid">
      <div class="form-group">
        <label>Nama Kategori *</label>
        <input class="form-control" type="text" name="name" value="{{ old('name', $category->name ?? '') }}" required />
      </div>
      <div class="form-group">
        <label>Ikon (Emoji)</label>
        <input class="form-control" type="text" name="icon" value="{{ old('icon', $category->icon ?? '') }}" placeholder="e.g. 🍛" maxlength="10" />
      </div>
      <div class="form-group">
        <label>Urutan Tampil</label>
        <input class="form-control" type="number" name="sort_order" value="{{ old('sort_order', $category->sort_order ?? 0) }}" min="0" />
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:16px;">
      <button type="submit" class="btn btn-primary">{{ isset($category) ? '💾 Simpan' : '➕ Tambah' }}</button>
      <a href="{{ route('admin.categories.index') }}" class="btn btn-secondary">Batal</a>
    </div>
  </form>
</div>
@endsection
