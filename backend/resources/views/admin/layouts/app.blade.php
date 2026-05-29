<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>@yield('title', 'Dashboard') — Mahaasyik Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --primary: #D30F25;
      --primary-dark: #C44015;
      --sidebar-bg: #1a1f2e;
      --sidebar-text: #a8b2c8;
      --sidebar-active: #D30F25;
      --topbar-bg: #ffffff;
      --body-bg: #f4f6f9;
      --card-bg: #ffffff;
      --text: #1e2532;
      --muted: #6b7280;
      --border: #e5e7eb;
      --success: #2D6A4F;
      --danger: #dc2626;
      --warning: #d97706;
      --info: #2563eb;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--body-bg); color: var(--text); display: flex; min-height: 100vh; }

    /* SIDEBAR */
    .sidebar { width: 240px; background: var(--sidebar-bg); color: var(--sidebar-text); display: flex; flex-direction: column; flex-shrink: 0; position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto; z-index: 100; }
    .sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); }
    .sidebar-logo .logo-name { font-size: 1.1rem; font-weight: 700; color: #fff; }
    .sidebar-logo .logo-sub { font-size: 0.7rem; color: var(--primary); font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
    .sidebar nav { flex: 1; padding: 12px 0; }
    .nav-section { padding: 8px 16px 4px; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(168,178,200,0.5); }
    .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 20px; font-size: 0.85rem; color: var(--sidebar-text); text-decoration: none; border-left: 3px solid transparent; transition: all 0.18s; }
    .nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; border-left-color: rgba(232,82,26,0.5); }
    .nav-item.active { background: rgba(232,82,26,0.12); color: #fff; border-left-color: var(--primary); font-weight: 600; }
    .nav-item .icon { width: 18px; text-align: center; font-size: 1rem; }
    .sidebar-footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.07); }
    .sidebar-footer form { margin: 0; }
    .btn-logout { width: 100%; padding: 8px; background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.3); color: #f87171; border-radius: 8px; font-family: inherit; font-size: 0.82rem; cursor: pointer; transition: all 0.18s; }
    .btn-logout:hover { background: rgba(220,38,38,0.22); color: #fff; }

    /* TOPBAR */
    .main-wrap { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
    .topbar { background: var(--topbar-bg); border-bottom: 1px solid var(--border); padding: 0 28px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
    .topbar-title { font-size: 1rem; font-weight: 600; color: var(--text); }
    .topbar-right { display: flex; align-items: center; gap: 14px; }
    .admin-badge { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--muted); }
    .admin-badge .avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #D30F25, #FFEC01); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 0.85rem; }

    /* CONTENT */
    .content { flex: 1; padding: 28px; }

    /* CARDS */
    .card { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; }
    .card-title { font-size: 0.9rem; font-weight: 600; margin-bottom: 16px; color: var(--text); }

    /* STAT CARDS */
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card { background: var(--card-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; display: flex; align-items: center; gap: 16px; }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
    .stat-info .value { font-size: 1.5rem; font-weight: 700; color: var(--text); line-height: 1.2; }
    .stat-info .label { font-size: 0.75rem; color: var(--muted); margin-top: 2px; }
    .stat-info .sub { font-size: 0.72rem; margin-top: 4px; font-weight: 500; }
    .sub.pending { color: var(--warning); }

    /* TABLE */
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    thead th { padding: 10px 14px; text-align: left; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); border-bottom: 1px solid var(--border); }
    tbody td { padding: 11px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }
    tbody tr:hover { background: #f9fafb; }
    tbody tr:last-child td { border-bottom: none; }

    /* BADGES */
    .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
    .badge-success  { background: rgba(45,106,79,0.1);  color: #2D6A4F; }
    .badge-danger   { background: rgba(220,38,38,0.1);  color: #dc2626; }
    .badge-warning  { background: rgba(217,119,6,0.1);  color: #d97706; }
    .badge-info     { background: rgba(37,99,235,0.1);  color: #2563eb; }
    .badge-gray     { background: rgba(107,114,128,0.1);color: #6b7280; }
    .badge-primary  { background: rgba(232,82,26,0.1);  color: #D30F25; }

    /* BUTTONS */
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-family: inherit; font-size: 0.83rem; font-weight: 500; cursor: pointer; border: none; text-decoration: none; transition: all 0.18s; }
    .btn-primary { background: var(--primary); color: #fff; }
    .btn-primary:hover { background: var(--primary-dark); }
    .btn-secondary { background: #f3f4f6; color: var(--text); border: 1px solid var(--border); }
    .btn-secondary:hover { background: #e5e7eb; }
    .btn-danger { background: rgba(220,38,38,0.1); color: #dc2626; border: 1px solid rgba(220,38,38,0.2); }
    .btn-danger:hover { background: #dc2626; color: #fff; }
    .btn-success { background: rgba(45,106,79,0.1); color: #2D6A4F; border: 1px solid rgba(45,106,79,0.2); }
    .btn-success:hover { background: #2D6A4F; color: #fff; }
    .btn-sm { padding: 5px 10px; font-size: 0.78rem; }
    .btn-icon { padding: 6px; border-radius: 6px; }

    /* FORMS */
    .form-grid { display: grid; gap: 16px; }
    .form-grid-2 { grid-template-columns: 1fr 1fr; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: 0.8rem; font-weight: 500; color: var(--text); }
    .form-control { padding: 9px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.85rem; color: var(--text); background: #fff; transition: border 0.18s, box-shadow 0.18s; }
    .form-control:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(232,82,26,0.12); }
    .form-control.is-invalid { border-color: var(--danger); }
    .invalid-feedback { font-size: 0.75rem; color: var(--danger); }
    .form-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .form-check input[type=checkbox] { width: 16px; height: 16px; accent-color: var(--primary); }

    /* ALERTS */
    .alert { padding: 12px 16px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 16px; }
    .alert-success { background: rgba(45,106,79,0.08); border: 1px solid rgba(45,106,79,0.2); color: #2D6A4F; }
    .alert-danger   { background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2); color: #dc2626; }

    /* PAGE HEADER */
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .page-header h1 { font-size: 1.25rem; font-weight: 700; }
    .page-header .breadcrumb { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }

    /* FILTER BAR */
    .filter-bar { display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
    .filter-bar input, .filter-bar select { padding: 7px 12px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 0.83rem; }

    /* CHARTS */
    .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 24px; }
    .charts-grid-2 { grid-template-columns: 1fr 1fr; }

    /* PAGINATION */
    .pagination { display: flex; gap: 6px; align-items: center; justify-content: flex-end; margin-top: 16px; font-size: 0.82rem; }
    .pagination a, .pagination span { padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); color: var(--text); text-decoration: none; }
    .pagination span.active-page { background: var(--primary); color: #fff; border-color: var(--primary); }

    /* DETAIL PAGE */
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .detail-row { display: flex; flex-direction: column; gap: 3px; padding: 10px 0; border-bottom: 1px solid var(--border); }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); }
    .detail-value { font-size: 0.9rem; color: var(--text); }

    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .charts-grid { grid-template-columns: 1fr; }
    }
    html.dark-mode {
      --body-bg: #0f1117;
      --card-bg: #1a1f2e;
      --topbar-bg: #1a1f2e;
      --text: #e2e8f0;
      --muted: #94a3b8;
      --border: #2d3748;
    }
    html.dark-mode body { background: var(--body-bg); color: var(--text); }
    html.dark-mode .topbar { background: var(--topbar-bg); border-color: var(--border); }
    html.dark-mode .card { background: var(--card-bg); border-color: var(--border); }
    html.dark-mode .stat-card { background: var(--card-bg); border-color: var(--border); }
    html.dark-mode .stat-info .value { color: var(--text); }
    html.dark-mode thead th { color: var(--muted); border-color: var(--border); }
    html.dark-mode tbody td { border-color: var(--border); }
    html.dark-mode tbody tr:hover { background: rgba(255,255,255,0.04); }
    html.dark-mode tbody tr:last-child td { border-bottom: none; }
    html.dark-mode .form-control { background: #2d3748; border-color: var(--border); color: var(--text); }
    html.dark-mode .btn-secondary { background: #2d3748; color: var(--text); border-color: var(--border); }
    html.dark-mode .btn-secondary:hover { background: #374151; }
    html.dark-mode .filter-bar input, html.dark-mode .filter-bar select { background: #2d3748; border-color: var(--border); color: var(--text); }
    html.dark-mode .today-table td { border-color: var(--border); }
    html.dark-mode .recent-item { border-color: var(--border); }
    html.dark-mode .detail-row { border-color: var(--border); }
    html.dark-mode .page-header h1, html.dark-mode .card-title, html.dark-mode .topbar-title { color: var(--text); }
    html.dark-mode .pagination a, html.dark-mode .pagination span { border-color: var(--border); color: var(--text); background: var(--card-bg); }
  </style>
  @stack('styles')
</head>
<body>
  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-name">🍛 Mahaasyik</div>
      <div class="logo-sub">Admin Panel</div>
    </div>
    <nav>
      <div class="nav-section">Overview</div>
      <a href="{{ route('admin.dashboard') }}" class="nav-item {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
        <span class="icon">📊</span> Dashboard
      </a>

      <div class="nav-section">Konten</div>
      <a href="{{ route('admin.menus.index') }}" class="nav-item {{ request()->routeIs('admin.menus*') ? 'active' : '' }}">
        <span class="icon">🍽️</span> Menu
      </a>
      <a href="{{ route('admin.categories.index') }}" class="nav-item {{ request()->routeIs('admin.categories*') ? 'active' : '' }}">
        <span class="icon">🗂️</span> Kategori
      </a>
      <a href="{{ route('admin.promos.index') }}" class="nav-item {{ request()->routeIs('admin.promos*') ? 'active' : '' }}">
        <span class="icon">🎟️</span> Kode Promo
      </a>

      <div class="nav-section">Transaksi</div>
      <a href="{{ route('admin.reservations.index') }}" class="nav-item {{ request()->routeIs('admin.reservations.index') || request()->routeIs('admin.reservations.show') ? 'active' : '' }}">
        <span class="icon">📅</span> Reservasi
      </a>
      <a href="{{ route('admin.reservations.calendar') }}" class="nav-item {{ request()->routeIs('admin.reservations.calendar') ? 'active' : '' }}">
        <span class="icon">🗓️</span> Kalender
      </a>
      <a href="{{ route('admin.deliveries.index') }}" class="nav-item {{ request()->routeIs('admin.deliveries*') ? 'active' : '' }}">
        <span class="icon">🛵</span> Delivery
      </a>

      <div class="nav-section">Lainnya</div>
      <a href="{{ route('admin.reviews.index') }}" class="nav-item {{ request()->routeIs('admin.reviews*') ? 'active' : '' }}">
        <span class="icon">⭐</span> Ulasan
      </a>
    </nav>
    <div class="sidebar-footer">
      <form action="{{ route('admin.logout') }}" method="POST">
        @csrf
        <button type="submit" class="btn-logout">🚪 Keluar</button>
      </form>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="main-wrap">
    <header class="topbar">
      <div class="topbar-title">@yield('page-title', 'Dashboard')</div>
      <div class="topbar-right">
        <button onclick="document.documentElement.classList.toggle('dark-mode')" style="background:none;border:none;cursor:pointer;font-size:1.2rem;" title="Toggle Dark Mode">🌓</button>
        <div class="admin-badge">
          <div class="avatar">A</div>
          <span>{{ session('admin_name', 'Admin') }}</span>
        </div>
      </div>
    </header>

    <main class="content">
      @if(session('success'))
        <div class="alert alert-success">✅ {{ session('success') }}</div>
      @endif
      @if($errors->any())
        <div class="alert alert-danger">
          @foreach($errors->all() as $e)
            <div>⚠️ {{ $e }}</div>
          @endforeach
        </div>
      @endif

      @yield('content')
    </main>
  </div>

  @stack('scripts')
</body>
</html>

