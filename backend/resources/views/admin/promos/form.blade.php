@extends('admin.layouts.app')
@section('title', isset($promo) ? 'Edit Promo' : 'Tambah Promo')
@section('page-title', isset($promo) ? 'Edit Kode Promo' : 'Tambah Kode Promo')
@section('content')
<div class="page-header">
  <h1>{{ isset($promo) ? 'Edit: '.$promo->code : 'Tambah Kode Promo' }}</h1>
  <a href="{{ route('admin.promos.index') }}" class="btn btn-secondary">← Kembali</a>
</div>
<div class="card" style="max-width:600px;">
  <form action="{{ isset($promo) ? route('admin.promos.update', $promo) : route('admin.promos.store') }}" method="POST">
    @csrf
    @if(isset($promo)) @method('PUT') @endif
    <div class="form-grid form-grid-2">
      <div class="form-group">
        <label>Kode Promo * (huruf kapital)</label>
        <input class="form-control @error('code') is-invalid @enderror" type="text" name="code" value="{{ old('code', $promo->code ?? '') }}" style="text-transform:uppercase;" required />
        @error('code')<div class="invalid-feedback">{{ $message }}</div>@enderror
      </div>
      <div class="form-group">
        <label>Tipe Diskon *</label>
        <select class="form-control" name="discount_type" required>
          <option value="percentage" {{ old('discount_type', $promo->discount_type ?? '') === 'percentage' ? 'selected' : '' }}>Persentase (%)</option>
          <option value="fixed" {{ old('discount_type', $promo->discount_type ?? '') === 'fixed' ? 'selected' : '' }}>Nominal Tetap (Rp)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Nilai Diskon *</label>
        <input class="form-control" type="number" name="discount_value" value="{{ old('discount_value', $promo->discount_value ?? '') }}" min="0" step="0.01" required />
      </div>
      <div class="form-group">
        <label>Min. Order (Rp)</label>
        <input class="form-control" type="number" name="min_order" value="{{ old('min_order', $promo->min_order ?? 0) }}" min="0" />
      </div>
      <div class="form-group">
        <label>Max Penggunaan (kosong = unlimited)</label>
        <input class="form-control" type="number" name="max_uses" value="{{ old('max_uses', $promo->max_uses ?? '') }}" min="1" />
      </div>
      <div class="form-group">
        <label>Tanggal Kadaluarsa (kosong = selamanya)</label>
        <input class="form-control" type="datetime-local" name="expired_at" value="{{ old('expired_at', isset($promo->expired_at) ? $promo->expired_at->format('Y-m-d\TH:i') : '') }}" />
      </div>
      <div class="form-group" style="grid-column:1/-1;">
        <label>Deskripsi</label>
        <textarea class="form-control" name="description" rows="2">{{ old('description', $promo->description ?? '') }}</textarea>
      </div>
      <div class="form-group">
        <label class="form-check">
          <input type="checkbox" name="is_active" value="1" {{ old('is_active', $promo->is_active ?? true) ? 'checked' : '' }} />
          Aktifkan Promo
        </label>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:16px;">
      <button type="submit" class="btn btn-primary">{{ isset($promo) ? '💾 Simpan' : '➕ Tambah' }}</button>
      <a href="{{ route('admin.promos.index') }}" class="btn btn-secondary">Batal</a>
    </div>
  </form>
</div>
@endsection
