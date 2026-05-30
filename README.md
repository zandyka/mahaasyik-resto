# Mahaasyik - Restoran Ayam Pecak Autentik 🍗

Mahaasyik adalah aplikasi web komprehensif yang dirancang untuk mendigitalisasi operasional restoran. Sistem ini mencakup **Landing Page**, **Sistem Pemesanan (Delivery)**, dan **Sistem Reservasi Tempat** untuk pelanggan, serta dilengkapi dengan **Admin Dashboard** berbasis Laravel untuk mengelola seluruh operasional (CMS, validasi transaksi, analitik).

Aplikasi ini menggunakan arsitektur *Monorepo* yang membagi sistem menjadi dua bagian utama:
- **Frontend:** React.js + Vite + TypeScript
- **Backend:** Laravel 11.x + MySQL + Midtrans Payment Gateway

---

## 🚀 Fitur Utama
* **Pemesanan Delivery Online:** Pelanggan dapat memesan makanan dengan opsi pengiriman (Gojek/Grab/Kurir Internal) dan pembayaran terintegrasi melalui Midtrans (Gopay, QRIS, Virtual Account).
* **Reservasi Meja & Cetak Tiket:** Memesan meja (opsional dengan DP makanan), mengonfirmasi area duduk, dan mencetak tiket reservasi (PDF).
* **Dashboard Admin Interaktif:** Memiliki grafik analitik pemesanan, kalender pemetaan jadwal reservasi interaktif, serta manajemen produk/kategori yang lengkap.

---

## ⚙️ Persyaratan Sistem (Prerequisites)
Sebelum menjalankan proyek ini, pastikan komputer Anda sudah terinstal:
- **PHP** (Minimal versi 8.2) & **Composer**
- **Node.js** (Minimal versi 18.x) & **NPM**
- **MySQL / MariaDB** (Bisa menggunakan XAMPP/Laragon)
- Akun **Midtrans** (Sandbox) untuk fitur Payment Gateway.

---

## 🛠️ Langkah-langkah Menjalankan Proyek (Instalasi)

### 1. Menjalankan Backend (Laravel)
Buka terminal/command prompt, lalu jalankan perintah berikut:

1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal dependensi PHP:
   ```bash
   composer install
   ```
3. Salin file konfigurasi *environment*:
   ```bash
   cp .env.example .env
   ```
   *(Buka file `.env` dan atur konfigurasi database `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, serta kredensial Midtrans `MIDTRANS_SERVER_KEY`, dll)*
4. Buat kunci aplikasi Laravel:
   ```bash
   php artisan key:generate
   ```
5. Jalankan migrasi dan *seeder* untuk mengisi database awal:
   ```bash
   php artisan migrate --seed
   ```
6. Hubungkan folder *storage* untuk akses gambar menu:
   ```bash
   php artisan storage:link
   ```
7. Jalankan server lokal backend:
   ```bash
   php artisan serve
   ```
   *(Backend akan berjalan di `http://127.0.0.1:8000`)*

### 2. Menjalankan Frontend (React.js)
Buka terminal **baru** (biarkan terminal backend tetap menyala), lalu jalankan perintah berikut:

1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Instal dependensi JavaScript/Node:
   ```bash
   npm install
   ```
3. Jika terdapat file `.env.example`, salin menjadi `.env` dan pastikan konfigurasi menunjuk ke API backend yang benar (contoh: `VITE_API_URL=http://127.0.0.1:8000/api`).
4. Jalankan server lokal frontend:
   ```bash
   npm run dev
   ```
   *(Frontend akan berjalan di port yang disediakan Vite, umumnya `http://localhost:5173`)*

---

## 🤝 Akun Uji Coba (Admin)
Setelah menjalankan seeder, Anda dapat masuk ke halaman Admin Dashboard melalui URL **`http://localhost:5173/admin/login`** (atau sesuaikan dengan URL aplikasi Anda) menggunakan kredensial default yang telah diatur di dalam `DatabaseSeeder.php`.

---
*Dibuat untuk dokumentasi Proyek Pengembangan Web mahaasyik.*
