# Project Context: Restoran Mahaasyik

Dokumen ini berisi rangkuman komprehensif mengenai arsitektur, teknologi, dan fitur-fitur yang telah dibangun pada proyek Restoran Mahaasyik. Dokumen ini dapat digunakan sebagai acuan untuk pembuatan laporan akhir atau dokumentasi pengembangan.

## 1. Informasi Umum Proyek
* **Nama Proyek:** Aplikasi Web Restoran Mahaasyik (Restoran Ayam Pecak Autentik)
* **Tujuan Proyek:** Mendigitalisasi proses pemesanan (Delivery) dan pemesanan tempat (Reservasi) restoran, serta memberikan halaman administrasi untuk mengelola seluruh aspek bisnis restoran.
* **Arsitektur:** Monorepo (Frontend dan Backend terpisah namun berada dalam satu *repository/project root*).

## 2. Tech Stack (Teknologi yang Digunakan)
* **Frontend:**
  * **Framework:** React.js (menggunakan Vite build tool).
  * **Bahasa:** TypeScript / JavaScript (TSX/JSX).
  * **Styling:** Vanilla CSS (`index.css` & `theme.css`) dengan desain antarmuka modern, warna berani (Primary `#D30F25`, Secondary `#FFEC01`), serta animasi *micro-interactions*.
* **Backend:**
  * **Framework:** Laravel 11.x (PHP 8.2+).
  * **Database:** MySQL.
  * **Pattern:** MVC (Model-View-Controller) untuk Admin Panel dan RESTful API untuk melayani aplikasi Frontend.
* **Integrasi Pihak Ketiga:**
  * **Payment Gateway:** Midtrans (Snap API) untuk pembayaran *online* yang aman.
  * **Visualisasi Data:** Chart.js (untuk analitik pesanan dan metode pembayaran).
  * **Kalender:** FullCalendar v6 (untuk pemetaan jadwal reservasi).

## 3. Fitur Frontend (User-Facing Application)
Aplikasi *Single Page Application* (SPA) yang diakses oleh pelanggan:
* **Landing Page:**
  * **Hero Section:** Pengantar restoran dengan Call-to-Action (CTA).
  * **About Us / Members:** Profil restoran dan daftar anggota tim proyek.
  * **Menu Section:** Menampilkan menu makanan dan minuman restoran secara dinamis.
  * **Gallery & Review:** Menampilkan foto-foto dan *carousel* ulasan/rating pelanggan.
  * **FAQ & Maps:** Pertanyaan umum dan embed peta lokasi Google Maps.
* **Sistem Reservasi:**
  * Pelanggan dapat memesan tempat (memilih tanggal, jam, area duduk, dan jumlah tamu).
  * Memiliki 2 opsi: Reservasi tanpa pesanan makanan, atau Reservasi dengan memesan makanan (DP).
  * Validasi ketersediaan promo (Promo Code).
  * Halaman Konfirmasi dan Cetak Tiket Reservasi / Bukti Pemesanan (PDF/Cetak).
* **Sistem Delivery:**
  * Pemesanan makanan dan minuman untuk diantar (Delivery).
  * Pemilihan metode pengiriman (Gojek, Grab, Kurir Restoran).
  * Kalkulasi total biaya, potongan diskon promo, dan integrasi *checkout* melalui Midtrans.
* **History Page (Riwayat):**
  * Fitur pencarian tiket reservasi dan pelacakan status pesanan secara *real-time*.

## 4. Fitur Backend (Admin Dashboard & API)
Backend melayani dua fungsi utama: API Endpoint untuk frontend, dan Admin Panel berbasis *Blade Templates* (Server-side rendering) untuk pemilik/staff restoran.
* **Admin Dashboard Utama (`/admin/dashboard`):**
  * Menampilkan metrik *real-time* (Total Reservasi, Total Delivery, Revenue, dan Menu Aktif).
  * **Grafik Analitik (Chart.js):** Statistik tren pemesanan (Reservasi vs Delivery) per hari dan diagram metode pembayaran.
  * **Kalender Interaktif (FullCalendar):** Kalender besar di *dashboard* yang memetakan seluruh reservasi dengan jam dan jumlah tamu secara visual pada tiap "kotak" hari. Menampilkan modal detail saat diklik.
* **Manajemen Konten (CMS):**
  * **Menu & Kategori:** Menambah, mengubah, mengatur kategori, ketersediaan, serta mengunggah foto menu (otomatis memisahkan kategori Makanan dan Minuman).
  * **Kode Promo:** Pengaturan kode diskon (Persentase atau Nominal Tetap), minimum order, dan tanggal kedaluwarsa.
* **Manajemen Transaksi:**
  * **Data Reservasi:** Validasi, konfirmasi, pembatalan, dan melihat detail pembayaran DP (melalui status Midtrans).
  * **Data Delivery:** Memantau pesanan yang masuk, mengubah status (Pending, Processing, Delivering, Delivered).
* **Ulasan (Review):**
  * Moderasi *rating* dan ulasan dari pelanggan yang diinput dari *landing page*.

## 5. Struktur Direktori Utama
* `/frontend`: Kode sumber SPA berbasis React dan Vite.
  * `src/components/`: Komponen *reusable* (Layouts, UI Buttons, Sections).
  * `src/pages/`: Halaman aplikasi (Menu, Reservasi, Delivery, History).
  * `src/api.js`: Konfigurasi Axios untuk pemanggilan ke *backend*.
* `/backend`: Berisi logika aplikasi sisi server (Laravel).
  * `app/Http/Controllers/Api/`: Controller RESTful untuk melayani Frontend.
  * `app/Http/Controllers/Admin/`: Controller untuk halaman Admin (Blade).
  * `database/migrations/`: Skema relasi database lengkap.
  * `resources/views/admin/`: File tampilan HTML/Blade untuk Dashboard Admin.
  * `storage/app/public/menus/`: Folder penyimpanan aman untuk gambar/foto menu yang telah diunggah.

## 6. Highlight & Milestone Perbaikan Terakhir
* **Integrasi Modal Kalender Dashboard:** Menyatukan fitur kalender *full-screen* dengan modal *pop-up* yang di-*render* secara sempurna di Dashboard menggunakan integrasi FullCalendar v6.
* **Midtrans Sandbox Workflow:** Alur logika pembayaran (DP / Lunas) yang sudah teruji, lengkap dengan kemampuan *bypass* otomatis jika diatur dalam mode tertentu untuk kelancaran presentasi laporan.
* **Code Cleanup:** Membersihkan _file_ sampah, konfigurasi Axios lama, logo React bawaan, dan komponen sisa dari transisi *JavaScript* ke *TypeScript*.

---
*Dokumen ini digenerate secara otomatis untuk mendampingi penyusunan laporan final dari sistem informasi Restoran Mahaasyik.*
