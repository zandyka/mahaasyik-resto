<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login — Mahaasyik Admin</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1f2e 0%,#2d1f3d 50%,#1a2a1a 100%);}
    .login-card{background:#fff;border-radius:20px;padding:40px;width:100%;max-width:400px;box-shadow:0 24px 60px rgba(0,0,0,0.3);}
    .logo{text-align:center;margin-bottom:28px;}
    .logo .icon{font-size:2.5rem;margin-bottom:8px;}
    .logo h1{font-size:1.4rem;font-weight:700;color:#1e2532;}
    .logo p{font-size:0.8rem;color:#6b7280;margin-top:4px;}
    .form-group{margin-bottom:16px;}
    .form-group label{display:block;font-size:0.8rem;font-weight:500;color:#374151;margin-bottom:6px;}
    .form-group input{width:100%;padding:10px 14px;border:1px solid #e5e7eb;border-radius:10px;font-family:inherit;font-size:0.9rem;color:#1e2532;transition:border 0.18s,box-shadow 0.18s;}
    .form-group input:focus{outline:none;border-color:#E8521A;box-shadow:0 0 0 3px rgba(232,82,26,0.12);}
    .error-box{background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);color:#dc2626;padding:10px 14px;border-radius:8px;font-size:0.82rem;margin-bottom:16px;}
    .btn-login{width:100%;padding:11px;background:linear-gradient(135deg,#E8521A 0%,#F5A623 100%);color:#fff;border:none;border-radius:10px;font-family:inherit;font-size:0.95rem;font-weight:600;cursor:pointer;transition:filter 0.18s,transform 0.18s;margin-top:4px;}
    .btn-login:hover{filter:brightness(1.08);transform:translateY(-1px);}
    .hint{text-align:center;margin-top:20px;font-size:0.75rem;color:#9ca3af;border-top:1px solid #f3f4f6;padding-top:16px;}
  </style>
</head>
<body>
  <div class="login-card">
    <div class="logo">
      <div class="icon">🍛</div>
      <h1>Mahaasyik</h1>
      <p>Admin Panel — Masuk untuk melanjutkan</p>
    </div>

    @if($errors->has('login'))
      <div class="error-box">⚠️ {{ $errors->first('login') }}</div>
    @endif

    <form action="{{ route('admin.login.post') }}" method="POST">
      @csrf
      <div class="form-group">
        <label>Username</label>
        <input type="text" name="username" value="{{ old('username') }}" placeholder="Masukkan username" required autofocus />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" placeholder="Masukkan password" required />
      </div>
      <button type="submit" class="btn-login">Masuk ke Dashboard</button>
    </form>
    <p class="hint">Hanya untuk administrator restoran</p>
  </div>
</body>
</html>
