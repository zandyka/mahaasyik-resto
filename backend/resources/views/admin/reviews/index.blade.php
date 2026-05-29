@extends('admin.layouts.app')
@section('title','Ulasan')
@section('page-title','Manajemen Ulasan Pelanggan')
@section('content')
<div class="page-header">
  <div><h1>Ulasan Pelanggan</h1><div class="breadcrumb">Kelola ulasan yang tampil di halaman utama</div></div>
  <button class="btn btn-primary" onclick="document.getElementById('addModal').style.display='flex'">➕ Tambah Ulasan</button>
</div>

<!-- ADD MODAL -->
<div id="addModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;">
  <div style="background:var(--card-bg,#fff);border-radius:16px;padding:28px;width:480px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <h3 style="font-size:1.1rem;font-weight:700;color:var(--text,#111);">➕ Tambah Ulasan Baru</h3>
      <button onclick="document.getElementById('addModal').style.display='none'" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--muted,#6b7280);">&times;</button>
    </div>
    <form action="{{ route('admin.reviews.store') }}" method="POST">
      @csrf
      <div class="form-grid" style="gap:14px;">
        <div class="form-group">
          <label>Nama Pelanggan</label>
          <input name="name" type="text" class="form-control" placeholder="Nama..." required>
        </div>
        <div class="form-group">
          <label>Rating (1-5)</label>
          <select name="rating" class="form-control" required>
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Komentar</label>
          <textarea name="comment" class="form-control" rows="3" placeholder="Isi ulasan..." required></textarea>
        </div>
        <div class="form-check">
          <input type="checkbox" name="is_approved" id="addApproved" checked>
          <label for="addApproved">Tampilkan langsung di halaman utama</label>
        </div>
        <div style="display:flex;gap:10px;margin-top:4px;">
          <button type="submit" class="btn btn-primary" style="flex:1;">💾 Simpan</button>
          <button type="button" onclick="document.getElementById('addModal').style.display='none'" class="btn btn-secondary">Batal</button>
        </div>
      </div>
    </form>
  </div>
</div>

<!-- EDIT MODAL -->
<div id="editModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;">
  <div style="background:var(--card-bg,#fff);border-radius:16px;padding:28px;width:480px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <h3 style="font-size:1.1rem;font-weight:700;color:var(--text,#111);">✏️ Edit Ulasan</h3>
      <button onclick="document.getElementById('editModal').style.display='none'" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--muted,#6b7280);">&times;</button>
    </div>
    <form id="editForm" method="POST">
      @csrf @method('PUT')
      <div class="form-grid" style="gap:14px;">
        <div class="form-group">
          <label>Nama Pelanggan</label>
          <input id="editName" name="name" type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label>Rating (1-5)</label>
          <select id="editRating" name="rating" class="form-control" required>
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Komentar</label>
          <textarea id="editComment" name="comment" class="form-control" rows="3" required></textarea>
        </div>
        <div class="form-check">
          <input type="checkbox" name="is_approved" id="editApproved">
          <label for="editApproved">Tampilkan di halaman utama</label>
        </div>
        <div style="display:flex;gap:10px;margin-top:4px;">
          <button type="submit" class="btn btn-primary" style="flex:1;">💾 Update</button>
          <button type="button" onclick="document.getElementById('editModal').style.display='none'" class="btn btn-secondary">Batal</button>
        </div>
      </div>
    </form>
  </div>
</div>

<div class="card">
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Nama</th><th>Rating</th><th>Komentar</th><th>Status</th><th>Tanggal</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        @forelse($reviews as $r)
        <tr>
          <td style="font-weight:600;">{{ $r->name }}</td>
          <td>
            <span style="color:#f59e0b;letter-spacing:1px;">
              @for($i=1;$i<=5;$i++){{ $i <= $r->rating ? '★' : '☆' }}@endfor
            </span>
            <span style="font-size:0.75rem;color:#6b7280;margin-left:4px;">({{ $r->rating }}/5)</span>
          </td>
          <td style="font-size:0.83rem;max-width:280px;">{{ Str::limit($r->comment, 90) }}</td>
          <td>
            <form action="{{ route('admin.reviews.toggle', $r) }}" method="POST" style="display:inline;">
              @csrf @method('PATCH')
              <button type="submit" style="cursor:pointer;border:none;background:none;padding:0;">
                @if($r->is_approved)
                  <span class="badge badge-success">✓ Tampil</span>
                @else
                  <span class="badge badge-gray">○ Disembunyikan</span>
                @endif
              </button>
            </form>
          </td>
          <td style="font-size:0.78rem;color:#6b7280;">{{ $r->created_at->format('d M Y') }}</td>
          <td>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-sm btn-secondary" onclick="openEdit({{ $r->id }}, '{{ addslashes($r->name) }}', {{ $r->rating }}, '{{ addslashes($r->comment) }}', {{ $r->is_approved ? 'true' : 'false' }})">✏️</button>
              <form action="{{ route('admin.reviews.destroy', $r) }}" method="POST" onsubmit="return confirm('Hapus ulasan ini?')" style="display:inline;">
                @csrf @method('DELETE')
                <button class="btn btn-sm btn-danger" type="submit">🗑️</button>
              </form>
            </div>
          </td>
        </tr>
        @empty
        <tr><td colspan="6" style="text-align:center;color:#6b7280;padding:32px;">Belum ada ulasan. Klik "Tambah Ulasan" untuk menambahkan.</td></tr>
        @endforelse
      </tbody>
    </table>
  </div>
  <div class="pagination">{{ $reviews->withQueryString()->links('pagination::simple-bootstrap-4') }}</div>
</div>

<script>
function openEdit(id, name, rating, comment, approved) {
  document.getElementById('editForm').action = '/admin/reviews/' + id;
  document.getElementById('editName').value = name;
  document.getElementById('editRating').value = rating;
  document.getElementById('editComment').value = comment;
  document.getElementById('editApproved').checked = approved;
  document.getElementById('editModal').style.display = 'flex';
}
// Close modal on outside click
['addModal','editModal'].forEach(id => {
  document.getElementById(id).addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
  });
});
</script>
@endsection
