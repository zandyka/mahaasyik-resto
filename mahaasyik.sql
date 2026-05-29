-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2026 at 07:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mahaasyik`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `delivery_code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `notes` text DEFAULT NULL,
  `delivery_method` enum('gojek','grab','delivery_boy') NOT NULL,
  `payment_method` enum('qris','gopay','dana','shopeepay','google_pay','debit','cod') NOT NULL,
  `promo_code` varchar(255) DEFAULT NULL,
  `subtotal` decimal(12,0) NOT NULL DEFAULT 0,
  `discount_amount` decimal(12,0) NOT NULL DEFAULT 0,
  `delivery_fee` decimal(12,0) NOT NULL DEFAULT 0,
  `total_price` decimal(12,0) NOT NULL DEFAULT 0,
  `status` enum('pending','processing','delivering','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` enum('unpaid','pending','paid') NOT NULL DEFAULT 'unpaid',
  `midtrans_order_id` varchar(255) DEFAULT NULL,
  `midtrans_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`id`, `delivery_code`, `name`, `phone`, `email`, `address`, `notes`, `delivery_method`, `payment_method`, `promo_code`, `subtotal`, `discount_amount`, `delivery_fee`, `total_price`, `status`, `payment_status`, `midtrans_order_id`, `midtrans_token`, `created_at`, `updated_at`) VALUES
(1, 'DLV-ERHZDQKS', 'asdawdsada', '21r4212412', 'zackyandyka1@gmail.com', 'sthsrtbrshrstbs', NULL, 'delivery_boy', 'qris', 'ZACKSTIKPS', 64000, 62720, 10000, 11280, 'processing', 'unpaid', 'DLV-PAY-1-1780049361', '5ab08d42-154f-472c-a53c-7e26e92d1ba4', '2026-05-29 03:09:21', '2026-05-29 03:11:10'),
(2, 'DLV-WRIPES', 'Fajar Maulana', '08129000001', 'fajar@gmail.com', 'Jl. Melati No.5, Tj. Morawa', NULL, 'gojek', 'gopay', NULL, 72000, 0, 8000, 80000, 'delivered', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(3, 'DLV-R5DS2D', 'Lestari Putri', '08129000002', 'lestari@gmail.com', 'Jl. Mawar No.12, Tj. Morawa', NULL, 'grab', 'qris', NULL, 98000, 0, 8000, 106000, 'delivered', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(4, 'DLV-PT5NDB', 'Agus Setiawan', '08129000003', 'agus@gmail.com', 'Jl. Dahlia No.7, Deli Serdang', NULL, 'delivery_boy', 'cod', NULL, 112000, 0, 8000, 120000, 'delivering', 'pending', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(5, 'DLV-QRO7JI', 'Fitri Hasanah', '08129000004', 'fitri@gmail.com', 'Komplek Griya No.3, Tj. Morawa', NULL, 'gojek', 'dana', NULL, 83000, 0, 8000, 91000, 'processing', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(6, 'DLV-2N0P3K', 'Rudi Hartono', '08129000005', 'rudi@gmail.com', 'Jl. Anggrek No.22, Tj. Morawa', NULL, 'grab', 'shopeepay', NULL, 104000, 0, 8000, 112000, 'pending', 'pending', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(7, 'DLV-HFVWLV', 'Nita Sari', '08129000006', 'nita@gmail.com', 'Jl. Kenanga No.1, Deli Serdang', NULL, 'delivery_boy', 'qris', NULL, 111000, 0, 8000, 119000, 'delivered', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(8, 'DLV-SM808M', 'Bagas Pramana', '08129000007', 'bagas@gmail.com', 'Jl. Merpati No.8, Tj. Morawa', NULL, 'gojek', 'google_pay', NULL, 75000, 0, 8000, 83000, 'cancelled', 'unpaid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(9, 'DLV-QZ4KNE', 'Wulandari', '08129000008', 'wulan@gmail.com', 'Perum Baru Blok C No.4, Tj. Morawa', NULL, 'grab', 'debit', NULL, 112000, 0, 8000, 120000, 'pending', 'unpaid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(10, 'DLV-WCG1NNJO', 'yvkyyhu', '678', 'zackyandyka1@gmail.com', 'hnjk', NULL, 'delivery_boy', 'gopay', NULL, 32000, 0, 10000, 42000, 'pending', 'unpaid', 'DLV-PAY-10-1780069866', 'e4969e5d-de9c-41d3-be9a-5e5bca7a7bb3', '2026-05-29 08:51:06', '2026-05-29 08:51:07');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_items`
--

CREATE TABLE `delivery_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `delivery_id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(12,0) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `subtotal` decimal(12,0) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `delivery_items`
--

INSERT INTO `delivery_items` (`id`, `delivery_id`, `menu_id`, `name`, `price`, `quantity`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 1, 20, 'Ayam Bakar Biasa', 16000, 4, 64000, '2026-05-29 03:09:21', '2026-05-29 03:09:21'),
(2, 2, 14, 'Ikan Patin Pecak', 36000, 2, 72000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(3, 3, 84, 'Burung Rica Rica', 18000, 2, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(4, 3, 90, 'Ikan Nila Gulai', 26000, 1, 26000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(5, 3, 171, 'Jamur Seafood', 22000, 1, 22000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(6, 3, 236, 'Jus Semangka', 14000, 1, 14000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(7, 4, 23, 'Bebek Bakar', 29000, 1, 29000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(8, 4, 105, 'Ikan Lele Gulai Acar', 18000, 2, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(9, 4, 162, 'Udang Saus Padang', 31000, 1, 31000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(10, 4, 221, 'Espresso', 16000, 1, 16000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(11, 5, 39, 'Ayam Kampung Balado', 28000, 1, 28000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(12, 5, 168, 'Toge', 13000, 1, 13000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(13, 5, 226, 'Lemon Tea', 14000, 1, 14000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(14, 5, 236, 'Jus Semangka', 14000, 2, 28000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(15, 6, 57, 'Ikan Bawal Sambal Tuk-Tuk', 36000, 2, 72000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(16, 6, 79, 'Sup Ceker', 16000, 2, 32000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(17, 7, 10, 'Ikan Mas Pecak', 36000, 1, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(18, 7, 15, 'Ikan Pare Pecak', 26000, 1, 26000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(19, 7, 194, 'Dimsum Kepiting', 18000, 2, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(20, 7, 214, 'Cappucino', 13000, 1, 13000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(21, 8, 78, 'Sup Udang', 31000, 1, 31000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(22, 8, 92, 'Ikan Gembung Gulai', 23000, 1, 23000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(23, 8, 203, 'Es Logan', 21000, 1, 21000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(24, 9, 57, 'Ikan Bawal Sambal Tuk-Tuk', 36000, 1, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(25, 9, 68, 'Ikan Lele Cabe Iris', 18000, 2, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(26, 9, 213, 'Nutrisari Susu', 12000, 2, 24000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(27, 9, 245, 'Jus Mix', 16000, 1, 16000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(28, 10, 20, 'Ayam Bakar Biasa', 16000, 2, 32000, '2026-05-29 08:51:06', '2026-05-29 08:51:06');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Jam berapa restoran ini buka?', 'Kami buka setiap hari dari pukul 10.00 hingga 22.00 WIB, termasuk hari libur nasional dan akhir pekan. Terakhir order diterima pukul 21.30 WIB.', 1, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(2, 'Apakah perlu reservasi meja sebelumnya?', 'Reservasi tidak diwajibkan, namun sangat kami anjurkan terutama untuk kunjungan pada akhir pekan, hari libur, atau jika datang dalam rombongan lebih dari 10 orang. Reservasi dapat dilakukan melalui WhatsApp atau tombol pesan di halaman kami.', 2, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(3, 'Metode pembayaran apa saja yang diterima?', 'Kami menerima pembayaran tunai (cash), transfer bank (BCA, Mandiri, BRI, BNI), serta dompet digital seperti GoPay, OVO, Dana, ShopeePay, dan QRIS. Kartu debit dan kartu kredit juga diterima.', 3, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(4, 'Apakah tersedia area parkir?', 'Ya, kami menyediakan area parkir yang luas dan gratis untuk kendaraan roda dua maupun roda empat. Area parkir dijaga oleh petugas kami selama jam operasional restoran.', 4, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(5, 'Apakah restoran ini ramah anak (family friendly)?', 'Tentu saja! Kami sangat welcome untuk keluarga dengan anak-anak. Tersedia kursi khusus bayi (baby chair), area duduk yang nyaman, dan beberapa menu yang cocok untuk anak-anak. Kami juga menyediakan area bermain kecil di pojok restoran.', 5, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(6, 'Apakah makanan di sini sudah bersertifikat halal?', 'Ya, seluruh bahan baku dan proses memasak di restoran kami telah memenuhi standar halal. Kami berkomitmen untuk tidak menggunakan bahan-bahan yang tidak halal dalam setiap sajian kami. Sertifikasi halal sedang dalam proses pengajuan resmi ke MUI.', 6, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(7, 'Apakah tersedia layanan pesan antar (delivery)?', 'Ya, kami melayani pesan antar melalui GoFood dan GrabFood untuk area dalam radius 10 km dari restoran. Selain itu, Anda juga bisa menghubungi kami langsung via WhatsApp untuk pesanan dalam jumlah besar atau di luar jangkauan aplikasi.', 7, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(8, 'Bagaimana jika tidak ada reservasi, apakah pasti dapat meja?', 'Kami tidak bisa menjamin ketersediaan meja tanpa reservasi, terutama saat jam makan siang (11.00–13.00) dan makan malam (17.00–20.00) di akhir pekan. Untuk memastikan kenyamanan kunjungan Anda, kami sarankan untuk melakukan reservasi minimal 1 hari sebelumnya.', 8, 1, '2026-05-27 23:10:01', '2026-05-27 23:10:01'),
(9, 'Apakah parkir nya berbayar?', 'Tidak, parkir di Mahaasyik 100% gratis dan aman.', 0, 1, '2026-05-28 01:23:21', '2026-05-28 01:23:21');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title`, `image_path`, `caption`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Suasana Indoor Lt. 1', 'gallery/placeholder-1.jpg', 'Ruang makan indoor lantai 1 yang nyaman dengan AC', 1, 1, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(2, 'Area Outdoor Lt. 1', 'gallery/placeholder-2.jpg', 'Nikmati makan di udara segar area outdoor kami', 2, 1, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(3, 'Indoor No Smoking (AC)', 'gallery/placeholder-3.jpg', 'Area khusus non-rokok dengan AC sejuk', 3, 1, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(4, 'Lantai 2 Premium', 'gallery/placeholder-4.jpg', 'Area premium lantai 2 dengan AC dan pemandangan indah', 4, 1, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(5, 'Koleksi Menu Andalan', 'gallery/placeholder-5.jpg', 'Menu-menu andalan masakan Sunda autentik kami', 5, 1, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(6, 'Dapur Kami', 'gallery/placeholder-6.jpg', 'Dimasak langsung oleh chef berpengalaman', 6, 1, '2026-05-24 08:00:26', '2026-05-24 08:00:26');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `image_ratio` varchar(255) NOT NULL DEFAULT '4:3',
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `is_recommended` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `category_id`, `name`, `slug`, `description`, `image_path`, `price`, `image_ratio`, `is_available`, `is_recommended`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ayam Pecak Biasa', 'ayam-pecak-biasa', 'Sajian nikmat Ayam Pecak Biasa khas restoran kami.', 'menus/makanan ayampecak 1.png', 15000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(2, 1, 'ayam Pecak Jumbo', 'ayam-pecak-jumbo', 'Sajian nikmat ayam Pecak Jumbo khas restoran kami.', 'menus/makanan ayampecak 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(3, 1, 'Ayam Kampung Pecak', 'ayam-kampung-pecak', 'Sajian nikmat Ayam Kampung Pecak khas restoran kami.', 'menus/makanan ayampecak 1.png', 27000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(4, 1, 'Bebek Pecak', 'bebek-pecak', 'Sajian nikmat Bebek Pecak khas restoran kami.', 'menus/makanan supsapi 1.png', 29000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(5, 1, 'Burung Pecak', 'burung-pecak', 'Sajian nikmat Burung Pecak khas restoran kami.', 'menus/makanan ayamricarica 1.png', 18000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(6, 1, 'Belut Pecak', 'belut-pecak', 'Sajian nikmat Belut Pecak khas restoran kami.', 'menus/makanan ayampecak 1.png', 28000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(7, 1, 'Ikan Gurami Pecak', 'ikan-gurami-pecak', 'Sajian nikmat Ikan Gurami Pecak khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 56000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(8, 1, 'Ikan Gembung Pecak', 'ikan-gembung-pecak', 'Sajian nikmat Ikan Gembung Pecak khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 19000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(9, 1, 'Ikan Asin Pecak', 'ikan-asin-pecak', 'Sajian nikmat Ikan Asin Pecak khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 16000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(10, 1, 'Ikan Mas Pecak', 'ikan-mas-pecak', 'Sajian nikmat Ikan Mas Pecak khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 36000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(11, 1, 'Ikan Kakap Pecak', 'ikan-kakap-pecak', 'Sajian nikmat Ikan Kakap Pecak khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 41000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(12, 1, 'Ikan Lele Pecak', 'ikan-lele-pecak', 'Sajian nikmat Ikan Lele Pecak khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 16000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(13, 1, 'Ikan Nila Pecak', 'ikan-nila-pecak', 'Sajian nikmat Ikan Nila Pecak khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 0, 13, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(14, 1, 'Ikan Patin Pecak', 'ikan-patin-pecak', 'Sajian nikmat Ikan Patin Pecak khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 36000, '4:3', 1, 0, 14, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(15, 1, 'Ikan Pare Pecak', 'ikan-pare-pecak', 'Sajian nikmat Ikan Pare Pecak khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 26000, '4:3', 1, 0, 15, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(16, 1, 'Kol Goreng Pecak', 'kol-goreng-pecak', 'Sajian nikmat Kol Goreng Pecak khas restoran kami.', 'menus/makanan ayambakar 1.png', 11000, '4:3', 1, 0, 16, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(17, 1, 'Rempelo Pecak', 'rempelo-pecak', 'Sajian nikmat Rempelo Pecak khas restoran kami.', 'menus/makanan ayampecak 1.png', 11000, '4:3', 1, 0, 17, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(18, 1, 'Terong Pecak', 'terong-pecak', 'Sajian nikmat Terong Pecak khas restoran kami.', 'menus/makanan supsapi 1.png', 11000, '4:3', 1, 0, 18, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(19, 1, 'Nasi', 'nasi', 'Sajian nikmat Nasi khas restoran kami.', 'menus/makanan ayampecak 1.png', 6000, '4:3', 1, 0, 19, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(20, 2, 'Ayam Bakar Biasa', 'ayam-bakar-biasa', 'Sajian nikmat Ayam Bakar Biasa khas restoran kami.', 'menus/makanan ayamricarica 1.png', 16000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(21, 2, 'Ayam Bakar Jumbo', 'ayam-bakar-jumbo', 'Sajian nikmat Ayam Bakar Jumbo khas restoran kami.', 'menus/makanan ayambalado 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(22, 2, 'Ayam Kampung Bakar', 'ayam-kampung-bakar', 'Sajian nikmat Ayam Kampung Bakar khas restoran kami.', 'menus/makanan ayambakar 1.png', 27000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(23, 2, 'Bebek Bakar', 'bebek-bakar', 'Sajian nikmat Bebek Bakar khas restoran kami.', 'menus/makanan ayambakar 1.png', 29000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(24, 2, 'Burung Bakar', 'burung-bakar', 'Sajian nikmat Burung Bakar khas restoran kami.', 'menus/makanan ayambakar 1.png', 18000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(25, 2, 'Ikan Nila Bakar', 'ikan-nila-bakar', 'Sajian nikmat Ikan Nila Bakar khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(26, 2, 'Ikan Gembung Bakar', 'ikan-gembung-bakar', 'Sajian nikmat Ikan Gembung Bakar khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 21000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(27, 2, 'Ikan Mas Bakar', 'ikan-mas-bakar', 'Sajian nikmat Ikan Mas Bakar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 36000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(28, 2, 'Ikan Gurami Bakar', 'ikan-gurami-bakar', 'Sajian nikmat Ikan Gurami Bakar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 56000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(29, 2, 'Ikan Lele Bakar', 'ikan-lele-bakar', 'Sajian nikmat Ikan Lele Bakar khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 16000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(30, 2, 'Ikan Pare Bakar', 'ikan-pare-bakar', 'Sajian nikmat Ikan Pare Bakar khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 26000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(31, 2, 'Ikan Kakap Bakar', 'ikan-kakap-bakar', 'Sajian nikmat Ikan Kakap Bakar khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 41000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(32, 2, 'Ikan Patin Bakar', 'ikan-patin-bakar', 'Sajian nikmat Ikan Patin Bakar khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 36000, '4:3', 1, 0, 13, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(33, 2, 'Ikan Gembung Pepes', 'ikan-gembung-pepes', 'Sajian nikmat Ikan Gembung Pepes khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 24000, '4:3', 1, 0, 14, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(34, 2, 'Ikan Nila Pepes', 'ikan-nila-pepes', 'Sajian nikmat Ikan Nila Pepes khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 26000, '4:3', 1, 0, 15, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(35, 2, 'Petai Bakar', 'petai-bakar', 'Sajian nikmat Petai Bakar khas restoran kami.', 'menus/makanan ayamricarica 1.png', 11000, '4:3', 1, 0, 16, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(36, 2, 'Terong Bakar', 'terong-bakar', 'Sajian nikmat Terong Bakar khas restoran kami.', 'menus/makanan ayampecak 1.png', 11000, '4:3', 1, 0, 17, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(37, 3, 'Ayam Balado Biasa', 'ayam-balado-biasa', 'Sajian nikmat Ayam Balado Biasa khas restoran kami.', 'menus/makanan ayambalado 1.png', 16000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(38, 3, 'Ayam Balado Jumbo', 'ayam-balado-jumbo', 'Sajian nikmat Ayam Balado Jumbo khas restoran kami.', 'menus/makanan ayampecak 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(39, 3, 'Ayam Kampung Balado', 'ayam-kampung-balado', 'Sajian nikmat Ayam Kampung Balado khas restoran kami.', 'menus/makanan ayambakar 1.png', 28000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(40, 3, 'Bebek Balado', 'bebek-balado', 'Sajian nikmat Bebek Balado khas restoran kami.', 'menus/makanan supsapi 1.png', 29000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(41, 3, 'Burung Balado', 'burung-balado', 'Sajian nikmat Burung Balado khas restoran kami.', 'menus/makanan supsapi 1.png', 18000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(42, 3, 'Ikan Bawal Balado', 'ikan-bawal-balado', 'Sajian nikmat Ikan Bawal Balado khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 31000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(43, 3, 'Ikan Gembung Balado', 'ikan-gembung-balado', 'Sajian nikmat Ikan Gembung Balado khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 21000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(44, 3, 'Ikan Gurami Balado', 'ikan-gurami-balado', 'Sajian nikmat Ikan Gurami Balado khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 56000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(45, 3, 'Ikan Mas Balado', 'ikan-mas-balado', 'Sajian nikmat Ikan Mas Balado khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(46, 3, 'Ikan Kakap Balado', 'ikan-kakap-balado', 'Sajian nikmat Ikan Kakap Balado khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 41000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(47, 3, 'Ikan Lele Balado', 'ikan-lele-balado', 'Sajian nikmat Ikan Lele Balado khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 16000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(48, 3, 'Ikan Patin Balado', 'ikan-patin-balado', 'Sajian nikmat Ikan Patin Balado khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 36000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(49, 3, 'Ikan Pare Balado', 'ikan-pare-balado', 'Sajian nikmat Ikan Pare Balado khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 28000, '4:3', 1, 0, 13, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(50, 3, 'Sapi Balado', 'sapi-balado', 'Sajian nikmat Sapi Balado khas restoran kami.', 'menus/makanan ayamricarica 1.png', 31000, '4:3', 1, 0, 14, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(51, 3, 'Kambing Balado', 'kambing-balado', 'Sajian nikmat Kambing Balado khas restoran kami.', 'menus/makanan ayambalado 1.png', 28000, '4:3', 1, 0, 15, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(52, 3, 'Belut Balado', 'belut-balado', 'Sajian nikmat Belut Balado khas restoran kami.', 'menus/makanan ayamricarica 1.png', 28000, '4:3', 1, 0, 16, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(53, 3, 'Udang Balado', 'udang-balado', 'Sajian nikmat Udang Balado khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 31000, '4:3', 1, 0, 17, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(54, 4, 'Ikan Gurami Sambal Tuk-Tuk', 'ikan-gurami-sambal-tuk-tuk', 'Sajian nikmat Ikan Gurami Sambal Tuk-Tuk khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 56000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(55, 4, 'Ikan Nila Sambal Tuk-Tuk', 'ikan-nila-sambal-tuk-tuk', 'Sajian nikmat Ikan Nila Sambal Tuk-Tuk khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(56, 4, 'Ikan Lele Sambal Tuk-Tuk', 'ikan-lele-sambal-tuk-tuk', 'Sajian nikmat Ikan Lele Sambal Tuk-Tuk khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 16000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(57, 4, 'Ikan Bawal Sambal Tuk-Tuk', 'ikan-bawal-sambal-tuk-tuk', 'Sajian nikmat Ikan Bawal Sambal Tuk-Tuk khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 36000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(58, 4, 'Ikan Kakap Sambal Tuk-Tuk', 'ikan-kakap-sambal-tuk-tuk', 'Sajian nikmat Ikan Kakap Sambal Tuk-Tuk khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 41000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(59, 4, 'Belut Sambal Tuk-Tuk', 'belut-sambal-tuk-tuk', 'Sajian nikmat Belut Sambal Tuk-Tuk khas restoran kami.', 'menus/makanan supsapi 1.png', 28000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(60, 5, 'Burung Cabe Iris', 'burung-cabe-iris', 'Sajian nikmat Burung Cabe Iris khas restoran kami.', 'menus/makanan ayamricarica 1.png', 18000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(61, 5, 'Belut Cabe Iris', 'belut-cabe-iris', 'Sajian nikmat Belut Cabe Iris khas restoran kami.', 'menus/makanan ayambalado 1.png', 28000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(62, 5, 'Ikan Asin Cabe Iris', 'ikan-asin-cabe-iris', 'Sajian nikmat Ikan Asin Cabe Iris khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 17000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(63, 5, 'Ikan Gembung Cabe Iris', 'ikan-gembung-cabe-iris', 'Sajian nikmat Ikan Gembung Cabe Iris khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 21000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(64, 5, 'Ikan Nila Cabe Iris', 'ikan-nila-cabe-iris', 'Sajian nikmat Ikan Nila Cabe Iris khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(65, 5, 'Ikan Gurami Cabe Iris', 'ikan-gurami-cabe-iris', 'Sajian nikmat Ikan Gurami Cabe Iris khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 56000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(66, 5, 'Ikan Bawal Cabe Iris', 'ikan-bawal-cabe-iris', 'Sajian nikmat Ikan Bawal Cabe Iris khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 31000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(67, 5, 'Ikan Kakap Cabe Iris', 'ikan-kakap-cabe-iris', 'Sajian nikmat Ikan Kakap Cabe Iris khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 41000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(68, 5, 'Ikan Lele Cabe Iris', 'ikan-lele-cabe-iris', 'Sajian nikmat Ikan Lele Cabe Iris khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 18000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(69, 5, 'Ikan Patin Cabe Iris', 'ikan-patin-cabe-iris', 'Sajian nikmat Ikan Patin Cabe Iris khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(70, 5, 'Ikan Pare Cabe Iris', 'ikan-pare-cabe-iris', 'Sajian nikmat Ikan Pare Cabe Iris khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 28000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(71, 5, 'Teri Sambal Jos', 'teri-sambal-jos', 'Sajian nikmat Teri Sambal Jos khas restoran kami.', 'menus/makanan ayambakar 1.png', 21000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(72, 6, 'Sup Ayam Eropa', 'sup-ayam-eropa', 'Sajian nikmat Sup Ayam Eropa khas restoran kami.', 'menus/makanan ayampecak 1.png', 23000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(73, 6, 'Sup Ayam Kampung', 'sup-ayam-kampung', 'Sajian nikmat Sup Ayam Kampung khas restoran kami.', 'menus/makanan ayambakar 1.png', 28000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(74, 6, 'Sup Bebek', 'sup-bebek', 'Sajian nikmat Sup Bebek khas restoran kami.', 'menus/makanan supsapi 1.png', 31000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(75, 6, 'Sup Kambing', 'sup-kambing', 'Sajian nikmat Sup Kambing khas restoran kami.', 'menus/makanan ayambalado 1.png', 28000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(76, 6, 'Sup Sapi', 'sup-sapi', 'Sajian nikmat Sup Sapi khas restoran kami.', 'menus/makanan supsapi 1.png', 31000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(77, 6, 'Sup Kepiting', 'sup-kepiting', 'Sajian nikmat Sup Kepiting khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 36000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(78, 6, 'Sup Udang', 'sup-udang', 'Sajian nikmat Sup Udang khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 31000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(79, 6, 'Sup Ceker', 'sup-ceker', 'Sajian nikmat Sup Ceker khas restoran kami.', 'menus/makanan supsapi 1.png', 16000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(80, 7, 'Ayam Rica Rica Biasa', 'ayam-rica-rica-biasa', 'Sajian nikmat Ayam Rica Rica Biasa khas restoran kami.', 'menus/makanan ayamricarica 1.png', 16000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(81, 7, 'Ayam Rica Rica Jumbo', 'ayam-rica-rica-jumbo', 'Sajian nikmat Ayam Rica Rica Jumbo khas restoran kami.', 'menus/makanan ayambalado 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(82, 7, 'Ayam Kampung Rica Rica', 'ayam-kampung-rica-rica', 'Sajian nikmat Ayam Kampung Rica Rica khas restoran kami.', 'menus/makanan supsapi 1.png', 28000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(83, 7, 'Bebek Rica Rica', 'bebek-rica-rica', 'Sajian nikmat Bebek Rica Rica khas restoran kami.', 'menus/makanan ayambalado 1.png', 29000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(84, 7, 'Burung Rica Rica', 'burung-rica-rica', 'Sajian nikmat Burung Rica Rica khas restoran kami.', 'menus/makanan ayamricarica 1.png', 18000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(85, 7, 'Ceker Rica Rica', 'ceker-rica-rica', 'Sajian nikmat Ceker Rica Rica khas restoran kami.', 'menus/makanan ayambalado 1.png', 16000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(86, 7, 'Ikan Bawal Rica Rica', 'ikan-bawal-rica-rica', 'Sajian nikmat Ikan Bawal Rica Rica khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 31000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(87, 7, 'Belut Rica Rica', 'belut-rica-rica', 'Sajian nikmat Belut Rica Rica khas restoran kami.', 'menus/makanan ayambalado 1.png', 28000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(88, 7, 'Sapi Rica Rica', 'sapi-rica-rica', 'Sajian nikmat Sapi Rica Rica khas restoran kami.', 'menus/makanan ayambakar 1.png', 31000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(89, 7, 'Kambing Rica Rica', 'kambing-rica-rica', 'Sajian nikmat Kambing Rica Rica khas restoran kami.', 'menus/makanan ayampecak 1.png', 28000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(90, 8, 'Ikan Nila Gulai', 'ikan-nila-gulai', 'Sajian nikmat Ikan Nila Gulai khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 26000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(91, 8, 'Ikan Gurami Gulai', 'ikan-gurami-gulai', 'Sajian nikmat Ikan Gurami Gulai khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 61000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(92, 8, 'Ikan Gembung Gulai', 'ikan-gembung-gulai', 'Sajian nikmat Ikan Gembung Gulai khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(93, 8, 'Ikan Bawal Gulai', 'ikan-bawal-gulai', 'Sajian nikmat Ikan Bawal Gulai khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 31000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(94, 8, 'Ikan Kakap Gulai', 'ikan-kakap-gulai', 'Sajian nikmat Ikan Kakap Gulai khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 41000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(95, 8, 'Ikan Patin Gulai', 'ikan-patin-gulai', 'Sajian nikmat Ikan Patin Gulai khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(96, 8, 'Ikan Pare Gulai', 'ikan-pare-gulai', 'Sajian nikmat Ikan Pare Gulai khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 28000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(97, 8, 'Telur Gulai', 'telur-gulai', 'Sajian nikmat Telur Gulai khas restoran kami.', 'menus/makanan supsapi 1.png', 16000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(98, 9, 'Ikan Bawal Gulai Acar', 'ikan-bawal-gulai-acar', 'Sajian nikmat Ikan Bawal Gulai Acar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 31000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(99, 9, 'Ikan Gembung Gulai Acar', 'ikan-gembung-gulai-acar', 'Sajian nikmat Ikan Gembung Gulai Acar khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 21000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(100, 9, 'Ikan Mas Gulai Acar', 'ikan-mas-gulai-acar', 'Sajian nikmat Ikan Mas Gulai Acar khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(101, 9, 'Ikan Kakap Gulai Acar', 'ikan-kakap-gulai-acar', 'Sajian nikmat Ikan Kakap Gulai Acar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 41000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(102, 9, 'Ikan Nila Gulai Acar', 'ikan-nila-gulai-acar', 'Sajian nikmat Ikan Nila Gulai Acar khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(103, 9, 'Ikan Patin Gulai Acar', 'ikan-patin-gulai-acar', 'Sajian nikmat Ikan Patin Gulai Acar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 36000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(104, 9, 'Ikan Gurami Gulai Acar', 'ikan-gurami-gulai-acar', 'Sajian nikmat Ikan Gurami Gulai Acar khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 56000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(105, 9, 'Ikan Lele Gulai Acar', 'ikan-lele-gulai-acar', 'Sajian nikmat Ikan Lele Gulai Acar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 18000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(106, 9, 'Ikan Pare Gulai Acar', 'ikan-pare-gulai-acar', 'Sajian nikmat Ikan Pare Gulai Acar khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 26000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(107, 9, 'Belut Gulai Acar', 'belut-gulai-acar', 'Sajian nikmat Belut Gulai Acar khas restoran kami.', 'menus/makanan ayampecak 1.png', 28000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(108, 10, 'Ikan Nila Asam Padeh', 'ikan-nila-asam-padeh', 'Sajian nikmat Ikan Nila Asam Padeh khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 24000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(109, 10, 'Ikan Bawal Asam Padeh', 'ikan-bawal-asam-padeh', 'Sajian nikmat Ikan Bawal Asam Padeh khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 31000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(110, 10, 'Ikan Gembung Asam Padeh', 'ikan-gembung-asam-padeh', 'Sajian nikmat Ikan Gembung Asam Padeh khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 23000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(111, 10, 'Ikan Kakap Asam Padeh', 'ikan-kakap-asam-padeh', 'Sajian nikmat Ikan Kakap Asam Padeh khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 41000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(112, 10, 'Ikan Pare Asam Padeh', 'ikan-pare-asam-padeh', 'Sajian nikmat Ikan Pare Asam Padeh khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 26000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(113, 11, 'Ikan Gembung Tauco', 'ikan-gembung-tauco', 'Sajian nikmat Ikan Gembung Tauco khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 23000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(114, 11, 'Ikan Bawal Tauco', 'ikan-bawal-tauco', 'Sajian nikmat Ikan Bawal Tauco khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 31000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(115, 11, 'Ikan Nila Tauco', 'ikan-nila-tauco', 'Sajian nikmat Ikan Nila Tauco khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 25000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(116, 11, 'Ikan Gurami Tauco', 'ikan-gurami-tauco', 'Sajian nikmat Ikan Gurami Tauco khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 56000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(117, 11, 'Ikan Kakap Tauco', 'ikan-kakap-tauco', 'Sajian nikmat Ikan Kakap Tauco khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 41000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(118, 11, 'Ikan Lele Tauco', 'ikan-lele-tauco', 'Sajian nikmat Ikan Lele Tauco khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 18000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(119, 11, 'Ikan Patin Tauco', 'ikan-patin-tauco', 'Sajian nikmat Ikan Patin Tauco khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(120, 11, 'Ikan Pare Tauco', 'ikan-pare-tauco', 'Sajian nikmat Ikan Pare Tauco khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 26000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(121, 11, 'Belut Tauco', 'belut-tauco', 'Sajian nikmat Belut Tauco khas restoran kami.', 'menus/makanan ayambakar 1.png', 28000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(122, 12, 'Ikan Gembung Steam', 'ikan-gembung-steam', 'Sajian nikmat Ikan Gembung Steam khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 21000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(123, 12, 'Ikan Nila Steam', 'ikan-nila-steam', 'Sajian nikmat Ikan Nila Steam khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(124, 12, 'Ikan Bawal Steam', 'ikan-bawal-steam', 'Sajian nikmat Ikan Bawal Steam khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 31000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(125, 12, 'Ikan Kakap Steam', 'ikan-kakap-steam', 'Sajian nikmat Ikan Kakap Steam khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 41000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(126, 12, 'Ikan Pare Steam', 'ikan-pare-steam', 'Sajian nikmat Ikan Pare Steam khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 26000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(127, 13, 'Ikan Nila Asam Manis', 'ikan-nila-asam-manis', 'Sajian nikmat Ikan Nila Asam Manis khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 26000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(128, 13, 'Ikan Gembung Asam Manis', 'ikan-gembung-asam-manis', 'Sajian nikmat Ikan Gembung Asam Manis khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(129, 13, 'Ikan Gurami Asam Manis', 'ikan-gurami-asam-manis', 'Sajian nikmat Ikan Gurami Asam Manis khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 56000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(130, 13, 'Ikan Bawal Asam Manis', 'ikan-bawal-asam-manis', 'Sajian nikmat Ikan Bawal Asam Manis khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 33000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(131, 13, 'Ikan Pare Asam Manis', 'ikan-pare-asam-manis', 'Sajian nikmat Ikan Pare Asam Manis khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 28000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(132, 13, 'Ikan Kakap Asam Manis', 'ikan-kakap-asam-manis', 'Sajian nikmat Ikan Kakap Asam Manis khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 43000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(133, 13, 'Ikan Lele Asam Manis', 'ikan-lele-asam-manis', 'Sajian nikmat Ikan Lele Asam Manis khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 18000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(134, 13, 'Ikan Patin Asam Manis', 'ikan-patin-asam-manis', 'Sajian nikmat Ikan Patin Asam Manis khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(135, 13, 'Belut Asam Manis', 'belut-asam-manis', 'Sajian nikmat Belut Asam Manis khas restoran kami.', 'menus/makanan ayambakar 1.png', 29000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(136, 13, 'Udang Asam Manis', 'udang-asam-manis', 'Sajian nikmat Udang Asam Manis khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 31000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(137, 13, 'Kepiting Asam Manis', 'kepiting-asam-manis', 'Sajian nikmat Kepiting Asam Manis khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 36000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(138, 14, 'Ikan Mas Arsik', 'ikan-mas-arsik', 'Sajian nikmat Ikan Mas Arsik khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 36000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(139, 14, 'Ikan Nila Arsik', 'ikan-nila-arsik', 'Sajian nikmat Ikan Nila Arsik khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 26000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(140, 14, 'Ikan Gembung Arsik', 'ikan-gembung-arsik', 'Sajian nikmat Ikan Gembung Arsik khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 23000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(141, 14, 'Ikan Gurami Arsik', 'ikan-gurami-arsik', 'Sajian nikmat Ikan Gurami Arsik khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 61000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(142, 14, 'Ikan Kakap Arsik', 'ikan-kakap-arsik', 'Sajian nikmat Ikan Kakap Arsik khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 48000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(143, 14, 'Ikan Bawal Arsik', 'ikan-bawal-arsik', 'Sajian nikmat Ikan Bawal Arsik khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 31000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(144, 14, 'Ikan Patin Arsik', 'ikan-patin-arsik', 'Sajian nikmat Ikan Patin Arsik khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 33000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(145, 15, 'Ayam Lada Hitam', 'ayam-lada-hitam', 'Sajian nikmat Ayam Lada Hitam khas restoran kami.', 'menus/makanan ayambalado 1.png', 23000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(146, 15, 'Ayam Kampung Lada Hitam', 'ayam-kampung-lada-hitam', 'Sajian nikmat Ayam Kampung Lada Hitam khas restoran kami.', 'menus/makanan ayamricarica 1.png', 27000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(147, 15, 'Bebek Lada Hitam', 'bebek-lada-hitam', 'Sajian nikmat Bebek Lada Hitam khas restoran kami.', 'menus/makanan ayambakar 1.png', 29000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(148, 15, 'Burung Lada Hitam', 'burung-lada-hitam', 'Sajian nikmat Burung Lada Hitam khas restoran kami.', 'menus/makanan ayamricarica 1.png', 18000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(149, 15, 'Kambing Lada Hitam', 'kambing-lada-hitam', 'Sajian nikmat Kambing Lada Hitam khas restoran kami.', 'menus/makanan supsapi 1.png', 28000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(150, 15, 'Sapi Lada Hitam', 'sapi-lada-hitam', 'Sajian nikmat Sapi Lada Hitam khas restoran kami.', 'menus/makanan ayambakar 1.png', 31000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(151, 15, 'Ikan Bawal Lada Hitam', 'ikan-bawal-lada-hitam', 'Sajian nikmat Ikan Bawal Lada Hitam khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 31000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(152, 15, 'Ikan Gembung Lada Hitam', 'ikan-gembung-lada-hitam', 'Sajian nikmat Ikan Gembung Lada Hitam khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 21000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(153, 15, 'Ikan Kakap Lada Hitam', 'ikan-kakap-lada-hitam', 'Sajian nikmat Ikan Kakap Lada Hitam khas restoran kami.', 'menus/makanan ikanguramesambaltuktuk 1.png', 41000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(154, 15, 'Ikan Nila Lada Hitam', 'ikan-nila-lada-hitam', 'Sajian nikmat Ikan Nila Lada Hitam khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 23000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(155, 15, 'Ikan Patin Lada Hitam', 'ikan-patin-lada-hitam', 'Sajian nikmat Ikan Patin Lada Hitam khas restoran kami.', 'menus/makanan ikangembunggulaiacar 1.png', 36000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(156, 15, 'Ikan Lele Lada Hitam', 'ikan-lele-lada-hitam', 'Sajian nikmat Ikan Lele Lada Hitam khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 17000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(157, 15, 'Ikan Gurame Lada Hitam', 'ikan-gurame-lada-hitam', 'Sajian nikmat Ikan Gurame Lada Hitam khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 56000, '4:3', 1, 0, 13, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(158, 15, 'Belut Lada Hitam', 'belut-lada-hitam', 'Sajian nikmat Belut Lada Hitam khas restoran kami.', 'menus/makanan ayambalado 1.png', 28000, '4:3', 1, 0, 14, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(159, 15, 'Cumi Lada Hitam', 'cumi-lada-hitam', 'Sajian nikmat Cumi Lada Hitam khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 24000, '4:3', 1, 0, 15, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(160, 15, 'Udang Lada Hitam', 'udang-lada-hitam', 'Sajian nikmat Udang Lada Hitam khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 34000, '4:3', 1, 0, 16, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(161, 15, 'Kepiting Lada Hitam', 'kepiting-lada-hitam', 'Sajian nikmat Kepiting Lada Hitam khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 39000, '4:3', 1, 0, 17, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(162, 16, 'Udang Saus Padang', 'udang-saus-padang', 'Sajian nikmat Udang Saus Padang khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 31000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(163, 16, 'Kepiting Saus Padang', 'kepiting-saus-padang', 'Sajian nikmat Kepiting Saus Padang khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 36000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(164, 17, 'Capcai', 'capcai', 'Sajian nikmat Capcai khas restoran kami.', 'menus/makanan ayambalado 1.png', 13000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(165, 17, 'Capcai Seafood', 'capcai-seafood', 'Sajian nikmat Capcai Seafood khas restoran kami.', 'menus/makanan supsapi 1.png', 22000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(166, 17, 'Kangkung', 'kangkung', 'Sajian nikmat Kangkung khas restoran kami.', 'menus/makanan ayambalado 1.png', 13000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(167, 17, 'Kangkung Seafood', 'kangkung-seafood', 'Sajian nikmat Kangkung Seafood khas restoran kami.', 'menus/makanan supsapi 1.png', 22000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(168, 17, 'Toge', 'toge', 'Sajian nikmat Toge khas restoran kami.', 'menus/makanan supsapi 1.png', 13000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(169, 17, 'Toge Seafood', 'toge-seafood', 'Sajian nikmat Toge Seafood khas restoran kami.', 'menus/makanan ayambakar 1.png', 22000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(170, 17, 'Tumis Jamur', 'tumis-jamur', 'Sajian nikmat Tumis Jamur khas restoran kami.', 'menus/makanan ayambakar 1.png', 14000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(171, 17, 'Jamur Seafood', 'jamur-seafood', 'Sajian nikmat Jamur Seafood khas restoran kami.', 'menus/makanan ayambakar 1.png', 22000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(172, 17, 'Genjer', 'genjer', 'Sajian nikmat Genjer khas restoran kami.', 'menus/makanan supsapi 1.png', 13000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(173, 17, 'Ikan Sarden', 'ikan-sarden', 'Sajian nikmat Ikan Sarden khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 17000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(174, 18, 'Cumi Goreng Tepung', 'cumi-goreng-tepung', 'Sajian nikmat Cumi Goreng Tepung khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 23000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(175, 18, 'Jamur Crispy', 'jamur-crispy', 'Sajian nikmat Jamur Crispy khas restoran kami.', 'menus/makanan ayambakar 1.png', 16000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(176, 18, 'Tahu Mendoan', 'tahu-mendoan', 'Sajian nikmat Tahu Mendoan khas restoran kami.', 'menus/makanan ayampecak 1.png', 11000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(177, 18, 'Tempe Mendoan', 'tempe-mendoan', 'Sajian nikmat Tempe Mendoan khas restoran kami.', 'menus/makanan supsapi 1.png', 11000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(178, 18, 'Terong Goreng Tepung', 'terong-goreng-tepung', 'Sajian nikmat Terong Goreng Tepung khas restoran kami.', 'menus/makanan ayampecak 1.png', 11000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(179, 18, 'Telur Dadar Goreng', 'telur-dadar-goreng', 'Sajian nikmat Telur Dadar Goreng khas restoran kami.', 'menus/makanan ayambalado 1.png', 11000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(180, 18, 'Pete Goreng', 'pete-goreng', 'Sajian nikmat Pete Goreng khas restoran kami.', 'menus/makanan ayambakar 1.png', 11000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(181, 19, 'Nugget', 'nugget', 'Sajian nikmat Nugget khas restoran kami.', 'menus/makanan ayampecak 1.png', 16000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(182, 19, 'Kentang Goreng', 'kentang-goreng', 'Sajian nikmat Kentang Goreng khas restoran kami.', 'menus/makanan ayambakar 1.png', 16000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(183, 19, 'Sosis', 'sosis', 'Sajian nikmat Sosis khas restoran kami.', 'menus/makanan ayambalado 1.png', 16000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(184, 19, 'Gohyong Ayam', 'gohyong-ayam', 'Sajian nikmat Gohyong Ayam khas restoran kami.', 'menus/makanan ayampecak 1.png', 20000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(185, 19, 'Cireng', 'cireng', 'Sajian nikmat Cireng khas restoran kami.', 'menus/makanan ayambalado 1.png', 18000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(186, 19, 'Churos', 'churos', 'Sajian nikmat Churos khas restoran kami.', 'menus/makanan supsapi 1.png', 18000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(187, 19, 'Mini Wonton', 'mini-wonton', 'Sajian nikmat Mini Wonton khas restoran kami.', 'menus/makanan ayambakar 1.png', 20000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(188, 19, 'Samosa Chicken Curry', 'samosa-chicken-curry', 'Sajian nikmat Samosa Chicken Curry khas restoran kami.', 'menus/makanan ayambalado 1.png', 18000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(189, 19, 'Union Crispy', 'union-crispy', 'Sajian nikmat Union Crispy khas restoran kami.', 'menus/makanan ayampecak 1.png', 17000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(190, 19, 'Udang Crispy', 'udang-crispy', 'Sajian nikmat Udang Crispy khas restoran kami.', 'menus/makanan ikanasincabeiris 1.png', 24000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(191, 19, 'Kulit Crispy', 'kulit-crispy', 'Sajian nikmat Kulit Crispy khas restoran kami.', 'menus/makanan ayambalado 1.png', 17000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(192, 20, 'Dimsum Ayam', 'dimsum-ayam', 'Sajian nikmat Dimsum Ayam khas restoran kami.', 'menus/makanan supsapi 1.png', 18000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(193, 20, 'Dimsum Udang', 'dimsum-udang', 'Sajian nikmat Dimsum Udang khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 18000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(194, 20, 'Dimsum Kepiting', 'dimsum-kepiting', 'Sajian nikmat Dimsum Kepiting khas restoran kami.', 'menus/makanan ikangembungasampadeh 1.png', 18000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(195, 20, 'Dimsum Rumput Laut', 'dimsum-rumput-laut', 'Sajian nikmat Dimsum Rumput Laut khas restoran kami.', 'menus/makanan ayambalado 1.png', 18000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(196, 20, 'Dimsum Lumpia Kulit Tahu', 'dimsum-lumpia-kulit-tahu', 'Sajian nikmat Dimsum Lumpia Kulit Tahu khas restoran kami.', 'menus/makanan ayambakar 1.png', 20000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(197, 20, 'Dimsum Bola Udang', 'dimsum-bola-udang', 'Sajian nikmat Dimsum Bola Udang khas restoran kami.', 'menus/makanan ikannilagulai 1.png', 22000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(198, 20, 'Dimsum Kumis Naga', 'dimsum-kumis-naga', 'Sajian nikmat Dimsum Kumis Naga khas restoran kami.', 'menus/makanan ayamricarica 1.png', 22000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(199, 20, 'Dimsum Ekado', 'dimsum-ekado', 'Sajian nikmat Dimsum Ekado khas restoran kami.', 'menus/makanan ayambalado 1.png', 22000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(200, 20, 'Dimsum Mix Isi 4', 'dimsum-mix-isi-4', 'Sajian nikmat Dimsum Mix Isi 4 khas restoran kami.', 'menus/makanan ayambakar 1.png', 22000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(201, 20, 'Dimsum Mix Isi 18', 'dimsum-mix-isi-18', 'Sajian nikmat Dimsum Mix Isi 18 khas restoran kami.', 'menus/makanan ayambakar 1.png', 87000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(202, 21, 'Blue Ocean', 'blue-ocean', 'Sajian nikmat Blue Ocean khas restoran kami.', 'menus/minuman blue ocean.png', 21000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(203, 21, 'Es Logan', 'es-logan', 'Sajian nikmat Es Logan khas restoran kami.', 'menus/minuman blue ocean.png', 21000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(204, 21, 'Es Jeruk Kasturi', 'es-jeruk-kasturi', 'Sajian nikmat Es Jeruk Kasturi khas restoran kami.', 'menus/minuman blue ocean.png', 11000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(205, 21, 'Teh Manis Dingin', 'teh-manis-dingin', 'Sajian nikmat Teh Manis Dingin khas restoran kami.', 'menus/minuman blue ocean.png', 8000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(206, 21, 'Es Badak', 'es-badak', 'Sajian nikmat Es Badak khas restoran kami.', 'menus/minuman blue ocean.png', 11000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(207, 21, 'Es Badak Susu', 'es-badak-susu', 'Sajian nikmat Es Badak Susu khas restoran kami.', 'menus/minuman blue ocean.png', 15000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(208, 21, 'Es Kosong', 'es-kosong', 'Sajian nikmat Es Kosong khas restoran kami.', 'menus/minuman blue ocean.png', 2000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(209, 21, 'Es Cincau', 'es-cincau', 'Sajian nikmat Es Cincau khas restoran kami.', 'menus/minuman blue ocean.png', 11000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(210, 21, 'Es Timun Serut', 'es-timun-serut', 'Sajian nikmat Es Timun Serut khas restoran kami.', 'menus/minuman blue ocean.png', 11000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(211, 21, 'Es Kelapa Muda', 'es-kelapa-muda', 'Sajian nikmat Es Kelapa Muda khas restoran kami.', 'menus/minuman blue ocean.png', 18000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(212, 21, 'Nutrisari', 'nutrisari', 'Sajian nikmat Nutrisari khas restoran kami.', 'menus/minuman blue ocean.png', 9000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(213, 21, 'Nutrisari Susu', 'nutrisari-susu', 'Sajian nikmat Nutrisari Susu khas restoran kami.', 'menus/minuman blue ocean.png', 12000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(214, 21, 'Cappucino', 'cappucino', 'Sajian nikmat Cappucino khas restoran kami.', 'menus/minuman blue ocean.png', 13000, '4:3', 1, 0, 13, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(215, 21, 'Cappucino Cincau', 'cappucino-cincau', 'Sajian nikmat Cappucino Cincau khas restoran kami.', 'menus/minuman blue ocean.png', 14000, '4:3', 1, 0, 14, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(216, 21, 'Wedang Jahe', 'wedang-jahe', 'Sajian nikmat Wedang Jahe khas restoran kami.', 'menus/minuman blue ocean.png', 9000, '4:3', 1, 0, 15, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(217, 21, 'Beng Beng Dingin', 'beng-beng-dingin', 'Sajian nikmat Beng Beng Dingin khas restoran kami.', 'menus/minuman blue ocean.png', 11000, '4:3', 1, 0, 16, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(218, 21, 'Milo Double Shake', 'milo-double-shake', 'Sajian nikmat Milo Double Shake khas restoran kami.', 'menus/minuman blue ocean.png', 22000, '4:3', 1, 0, 17, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(219, 21, 'White Coffee', 'white-coffee', 'Sajian nikmat White Coffee khas restoran kami.', 'menus/minuman blue ocean.png', 11000, '4:3', 1, 0, 18, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(220, 21, 'Americano', 'americano', 'Sajian nikmat Americano khas restoran kami.', 'menus/minuman blue ocean.png', 17000, '4:3', 1, 0, 19, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(221, 21, 'Espresso', 'espresso', 'Sajian nikmat Espresso khas restoran kami.', 'menus/minuman blue ocean.png', 16000, '4:3', 1, 0, 20, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(222, 21, 'Kopi Sanger', 'kopi-sanger', 'Sajian nikmat Kopi Sanger khas restoran kami.', 'menus/minuman blue ocean.png', 19000, '4:3', 1, 0, 21, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(223, 21, 'Kopi Lemon', 'kopi-lemon', 'Sajian nikmat Kopi Lemon khas restoran kami.', 'menus/minuman blue ocean.png', 21000, '4:3', 1, 0, 22, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(224, 21, 'Kopi Gula Aren', 'kopi-gula-aren', 'Sajian nikmat Kopi Gula Aren khas restoran kami.', 'menus/minuman blue ocean.png', 16000, '4:3', 1, 0, 23, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(225, 21, 'Teh Tong', 'teh-tong', 'Sajian nikmat Teh Tong khas restoran kami.', 'menus/minuman blue ocean.png', 5000, '4:3', 1, 0, 24, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(226, 21, 'Lemon Tea', 'lemon-tea', 'Sajian nikmat Lemon Tea khas restoran kami.', 'menus/minuman blue ocean.png', 14000, '4:3', 1, 0, 25, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(227, 22, 'Jus Mangga', 'jus-mangga', 'Sajian nikmat Jus Mangga khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 1, 1, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(228, 22, 'Jus Kweni', 'jus-kweni', 'Sajian nikmat Jus Kweni khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 1, 2, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(229, 22, 'Jus Alpukat', 'jus-alpukat', 'Sajian nikmat Jus Alpukat khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 3, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(230, 22, 'Jus Naga', 'jus-naga', 'Sajian nikmat Jus Naga khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 4, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(231, 22, 'Jus Jeruk', 'jus-jeruk', 'Sajian nikmat Jus Jeruk khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 0, 5, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(232, 22, 'Jus Terong Belanda', 'jus-terong-belanda', 'Sajian nikmat Jus Terong Belanda khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 6, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(233, 22, 'Jus Apel', 'jus-apel', 'Sajian nikmat Jus Apel khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 7, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(234, 22, 'Jus Pir', 'jus-pir', 'Sajian nikmat Jus Pir khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 8, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(235, 22, 'Jus Belimbing', 'jus-belimbing', 'Sajian nikmat Jus Belimbing khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 0, 9, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(236, 22, 'Jus Semangka', 'jus-semangka', 'Sajian nikmat Jus Semangka khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 0, 10, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(237, 22, 'Jus Jambu', 'jus-jambu', 'Sajian nikmat Jus Jambu khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 0, 11, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(238, 22, 'Jus Sawi Nanas', 'jus-sawi-nanas', 'Sajian nikmat Jus Sawi Nanas khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 12, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(239, 22, 'Jus Tomat', 'jus-tomat', 'Sajian nikmat Jus Tomat khas restoran kami.', 'menus/minuman jus alpukat.png', 13000, '4:3', 1, 0, 13, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(240, 22, 'Jus Sirsak', 'jus-sirsak', 'Sajian nikmat Jus Sirsak khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 0, 14, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(241, 22, 'Jus Wortel Jeruk', 'jus-wortel-jeruk', 'Sajian nikmat Jus Wortel Jeruk khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 15, '2026-05-28 04:38:30', '2026-05-29 07:48:04');
INSERT INTO `menus` (`id`, `category_id`, `name`, `slug`, `description`, `image_path`, `price`, `image_ratio`, `is_available`, `is_recommended`, `sort_order`, `created_at`, `updated_at`) VALUES
(242, 22, 'Jus Wortel', 'jus-wortel', 'Sajian nikmat Jus Wortel khas restoran kami.', 'menus/minuman jus alpukat.png', 13000, '4:3', 1, 0, 16, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(243, 22, 'Jus Nanas', 'jus-nanas', 'Sajian nikmat Jus Nanas khas restoran kami.', 'menus/minuman jus alpukat.png', 14000, '4:3', 1, 0, 17, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(244, 22, 'Jus Kemangi', 'jus-kemangi', 'Sajian nikmat Jus Kemangi khas restoran kami.', 'menus/minuman jus alpukat.png', 13000, '4:3', 1, 0, 18, '2026-05-28 04:38:30', '2026-05-29 07:48:04'),
(245, 22, 'Jus Mix', 'jus-mix', 'Sajian nikmat Jus Mix khas restoran kami.', 'menus/minuman jus alpukat.png', 16000, '4:3', 1, 0, 19, '2026-05-28 04:38:30', '2026-05-29 07:48:04');

-- --------------------------------------------------------

--
-- Table structure for table `menu_categories`
--

CREATE TABLE `menu_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_categories`
--

INSERT INTO `menu_categories` (`id`, `name`, `slug`, `icon`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Pecak', 'pecak', '🍽️', 1, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(2, 'Bakaran', 'bakaran', '🍽️', 2, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(3, 'Balado', 'balado', '🍽️', 3, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(4, 'Sambal Tuk-Tuk', 'sambal-tuk-tuk', '🍽️', 4, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(5, 'Cabe Iris', 'cabe-iris', '🍽️', 5, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(6, 'Sup', 'sup', '🍲', 6, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(7, 'Rica-Rica', 'rica-rica', '🍽️', 7, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(8, 'Gulai', 'gulai', '🍽️', 8, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(9, 'Gulai Acar', 'gulai-acar', '🍽️', 9, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(10, 'Asam Padeh', 'asam-padeh', '🍽️', 10, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(11, 'Tauco', 'tauco', '🍽️', 11, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(12, 'Steam', 'steam', '🍽️', 12, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(13, 'Asam Manis', 'asam-manis', '🍽️', 13, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(14, 'Arsik', 'arsik', '🍽️', 14, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(15, 'Lada Hitam', 'lada-hitam', '🍽️', 15, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(16, 'Saus Padang', 'saus-padang', '🍽️', 16, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(17, 'Sayuran', 'sayuran', '🥬', 17, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(18, 'Gorengan', 'gorengan', '🥟', 18, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(19, 'Cemilan', 'cemilan', '🥟', 19, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(20, 'Dimsum', 'dimsum', '🥟', 20, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(21, 'Minuman', 'minuman', '🍹', 21, '2026-05-28 04:38:30', '2026-05-28 04:38:30'),
(22, 'Jus', 'jus', '🍹', 22, '2026-05-28 04:38:30', '2026-05-28 04:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_24_092551_create_menu_categories_table', 1),
(5, '2026_05_24_092551_create_menus_table', 1),
(6, '2026_05_24_092552_create_faqs_table', 1),
(7, '2026_05_24_092552_create_gallery_table', 1),
(8, '2026_05_24_092552_create_reviews_table', 1),
(9, '2026_05_24_092553_create_promos_table', 1),
(10, '2026_05_24_092553_create_reservations_table', 1),
(11, '2026_05_24_092554_create_deliveries_table', 1),
(12, '2026_05_24_092554_create_delivery_items_table', 1),
(13, '2026_05_24_092554_create_reservation_items_table', 1),
(14, '2026_05_24_092555_create_members_table', 1),
(15, '2026_05_24_092555_create_payments_table', 1),
(16, '2026_05_24_092912_create_personal_access_tokens_table', 1),
(17, '2026_05_28_082738_add_image_path_to_menus_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payable_type` varchar(255) NOT NULL,
  `payable_id` bigint(20) UNSIGNED NOT NULL,
  `midtrans_order_id` varchar(255) NOT NULL,
  `midtrans_transaction_id` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` enum('pending','success','failed','expired','cancelled') NOT NULL DEFAULT 'pending',
  `gross_amount` decimal(12,0) NOT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `midtrans_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`midtrans_response`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `payable_type`, `payable_id`, `midtrans_order_id`, `midtrans_transaction_id`, `payment_method`, `status`, `gross_amount`, `paid_at`, `midtrans_response`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Reservation', 2, 'RSV-PAY-2-1780043565', NULL, NULL, 'pending', 25800, NULL, NULL, '2026-05-29 01:32:45', '2026-05-29 01:32:45'),
(2, 'App\\Models\\Reservation', 3, 'RSV-PAY-3-1780043576', NULL, NULL, 'pending', 25800, NULL, NULL, '2026-05-29 01:32:57', '2026-05-29 01:32:57'),
(3, 'App\\Models\\Reservation', 4, 'RSV-PAY-4-1780043589', NULL, NULL, 'pending', 25800, NULL, NULL, '2026-05-29 01:33:09', '2026-05-29 01:33:09'),
(4, 'App\\Models\\Reservation', 5, 'RSV-PAY-5-1780043596', NULL, NULL, 'pending', 25800, NULL, NULL, '2026-05-29 01:33:16', '2026-05-29 01:33:16'),
(5, 'App\\Models\\Reservation', 6, 'RSV-PAY-6-1780043600', NULL, NULL, 'pending', 25800, NULL, NULL, '2026-05-29 01:33:20', '2026-05-29 01:33:20'),
(6, 'App\\Models\\Reservation', 7, 'RSV-PAY-7-1780043604', NULL, NULL, 'pending', 25800, NULL, NULL, '2026-05-29 01:33:24', '2026-05-29 01:33:24'),
(7, 'App\\Models\\Delivery', 1, 'DLV-PAY-1-1780049361', NULL, NULL, 'pending', 11280, NULL, NULL, '2026-05-29 03:09:22', '2026-05-29 03:09:22'),
(8, 'App\\Models\\Reservation', 18, 'RSV-PAY-18-1780069053', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:37:33', '2026-05-29 08:37:33'),
(9, 'App\\Models\\Reservation', 19, 'RSV-PAY-19-1780069179', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:39:39', '2026-05-29 08:39:39'),
(10, 'App\\Models\\Reservation', 20, 'RSV-PAY-20-1780069198', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:39:58', '2026-05-29 08:39:58'),
(11, 'App\\Models\\Reservation', 21, 'RSV-PAY-21-1780069204', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:40:05', '2026-05-29 08:40:05'),
(12, 'App\\Models\\Reservation', 22, 'RSV-PAY-22-1780069214', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:40:14', '2026-05-29 08:40:14'),
(13, 'App\\Models\\Reservation', 23, 'RSV-PAY-23-1780069316', NULL, NULL, 'pending', 14400, NULL, NULL, '2026-05-29 08:41:56', '2026-05-29 08:41:56'),
(14, 'App\\Models\\Reservation', 24, 'RSV-PAY-24-1780069324', NULL, NULL, 'pending', 14400, NULL, NULL, '2026-05-29 08:42:04', '2026-05-29 08:42:04'),
(15, 'App\\Models\\Reservation', 25, 'RSV-PAY-25-1780069394', NULL, NULL, 'pending', 14400, NULL, NULL, '2026-05-29 08:43:14', '2026-05-29 08:43:14'),
(16, 'App\\Models\\Reservation', 26, 'RSV-PAY-26-1780069411', NULL, NULL, 'pending', 14400, NULL, NULL, '2026-05-29 08:43:32', '2026-05-29 08:43:32'),
(17, 'App\\Models\\Reservation', 27, 'RSV-PAY-27-1780069426', NULL, NULL, 'pending', 14400, NULL, NULL, '2026-05-29 08:43:47', '2026-05-29 08:43:47'),
(18, 'App\\Models\\Delivery', 10, 'DLV-PAY-10-1780069866', NULL, NULL, 'pending', 42000, NULL, NULL, '2026-05-29 08:51:07', '2026-05-29 08:51:07'),
(19, 'App\\Models\\Reservation', 28, 'RSV-PAY-28-1780069925', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:52:05', '2026-05-29 08:52:05'),
(20, 'App\\Models\\Reservation', 29, 'RSV-PAY-29-1780069937', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:52:17', '2026-05-29 08:52:17'),
(21, 'App\\Models\\Reservation', 30, 'RSV-PAY-30-1780069953', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:52:33', '2026-05-29 08:52:33'),
(22, 'App\\Models\\Reservation', 31, 'RSV-PAY-31-1780069967', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:52:48', '2026-05-29 08:52:48'),
(23, 'App\\Models\\Reservation', 32, 'RSV-PAY-32-1780070036', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:53:56', '2026-05-29 08:53:56'),
(24, 'App\\Models\\Reservation', 33, 'RSV-PAY-33-1780070176', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:56:17', '2026-05-29 08:56:17'),
(25, 'App\\Models\\Reservation', 34, 'RSV-PAY-34-1780070360', NULL, NULL, 'pending', 288, NULL, NULL, '2026-05-29 08:59:21', '2026-05-29 08:59:21'),
(26, 'App\\Models\\Reservation', 35, 'RSV-PAY-35-1780071056', NULL, NULL, 'pending', 24000, NULL, NULL, '2026-05-29 09:10:56', '2026-05-29 09:10:56'),
(27, 'App\\Models\\Reservation', 36, 'RSV-PAY-36-1780071359', NULL, NULL, 'pending', 14400, NULL, NULL, '2026-05-29 09:15:59', '2026-05-29 09:15:59'),
(28, 'App\\Models\\Reservation', 37, 'RSV-PAY-37-1780072385', NULL, NULL, 'pending', 19200, NULL, NULL, '2026-05-29 09:33:05', '2026-05-29 09:33:05');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promos`
--

CREATE TABLE `promos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,0) NOT NULL,
  `min_order` decimal(10,0) NOT NULL DEFAULT 0,
  `max_uses` int(11) DEFAULT NULL,
  `used_count` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `expired_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promos`
--

INSERT INTO `promos` (`id`, `code`, `description`, `discount_type`, `discount_value`, `min_order`, `max_uses`, `used_count`, `is_active`, `expired_at`, `created_at`, `updated_at`) VALUES
(1, 'MAHAASYIK10', 'Diskon 10% untuk semua menu. Minimum pembelian Rp50.000.', 'percentage', 10, 50000, NULL, 0, 1, NULL, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(2, 'PKI2024', 'Diskon Rp25.000 untuk pembelian minimum Rp100.000. Khusus anggota PKI.', 'fixed', 25000, 100000, NULL, 0, 1, NULL, '2026-05-24 08:00:26', '2026-05-24 08:00:26'),
(3, 'NEWUSER', 'Diskon 15% untuk pengguna baru. Tidak ada minimum pembelian.', 'percentage', 15, 0, 1, 0, 1, NULL, '2026-05-24 08:00:26', '2026-05-29 03:10:20'),
(7, 'ZACKSTIKPS', 'Kode eksklusif — diskon super spesial 98%! Hanya untuk yang beruntung.', 'percentage', 98, 0, NULL, 14, 1, NULL, '2026-05-27 23:08:47', '2026-05-29 08:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservation_code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `adults` tinyint(4) NOT NULL DEFAULT 1,
  `children` tinyint(4) NOT NULL DEFAULT 0,
  `seating_area` enum('outdoor_lt1','indoor_lt1','indoor_lt1_nosmoking','lt2_ac') NOT NULL,
  `message` text DEFAULT NULL,
  `promo_code` varchar(255) DEFAULT NULL,
  `subtotal` decimal(12,0) NOT NULL DEFAULT 0,
  `discount_amount` decimal(12,0) NOT NULL DEFAULT 0,
  `total_price` decimal(12,0) NOT NULL DEFAULT 0,
  `dp_amount` decimal(12,0) NOT NULL DEFAULT 0,
  `has_order` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` enum('unpaid','pending','paid') NOT NULL DEFAULT 'unpaid',
  `midtrans_order_id` varchar(255) DEFAULT NULL,
  `midtrans_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `reservation_code`, `name`, `phone`, `email`, `date`, `time`, `adults`, `children`, `seating_area`, `message`, `promo_code`, `subtotal`, `discount_amount`, `total_price`, `dp_amount`, `has_order`, `status`, `payment_status`, `midtrans_order_id`, `midtrans_token`, `created_at`, `updated_at`) VALUES
(1, 'RSV-RHWNTF6S', '072_zacky andyka', '9589597', 'zackyandyka1@gmail.com', '2026-05-30', '15:28:00', 3, 3, 'lt2_ac', 'tujxjtrfxsu', NULL, 0, 0, 0, 0, 0, 'confirmed', 'paid', NULL, NULL, '2026-05-29 01:27:35', '2026-05-29 01:27:35'),
(2, 'RSV-5KGL076L', '072_zacky andyka', '965965956', 'zackyandyka1@gmail.com', '2026-05-31', '15:38:00', 3, 1, 'indoor_lt1', 'khvkuyvj', NULL, 86000, 0, 86000, 25800, 1, 'pending', 'unpaid', 'RSV-PAY-2-1780043565', 'b3de9ba5-5201-4c07-bcdc-99ecd7e83396', '2026-05-29 01:32:45', '2026-05-29 01:32:45'),
(3, 'RSV-IVTRTQAK', '072_zacky andyka', '965965956', 'zackyandyka1@gmail.com', '2026-05-31', '15:38:00', 3, 1, 'indoor_lt1', 'khvkuyvj', NULL, 86000, 0, 86000, 25800, 1, 'pending', 'unpaid', 'RSV-PAY-3-1780043576', '497af6cc-bb5f-42dc-87f2-a87c267bc7b2', '2026-05-29 01:32:56', '2026-05-29 01:32:57'),
(4, 'RSV-BZAN3PLJ', '072_zacky andyka', '965965956', 'zackyandyka1@gmail.com', '2026-05-31', '15:38:00', 3, 1, 'indoor_lt1', 'khvkuyvj', NULL, 86000, 0, 86000, 25800, 1, 'pending', 'unpaid', 'RSV-PAY-4-1780043589', '98a94487-a660-4f39-bc60-19957f614a3b', '2026-05-29 01:33:09', '2026-05-29 01:33:09'),
(5, 'RSV-U2WHPCT5', '072_zacky andyka', '965965956', 'zackyandyka1@gmail.com', '2026-05-31', '15:38:00', 3, 1, 'indoor_lt1', 'khvkuyvj', NULL, 86000, 0, 86000, 25800, 1, 'pending', 'unpaid', 'RSV-PAY-5-1780043596', 'e747fabb-c3dc-433a-9276-21a07296210b', '2026-05-29 01:33:15', '2026-05-29 01:33:16'),
(6, 'RSV-2R75YM1Y', '072_zacky andyka', '965965956', 'zackyandyka1@gmail.com', '2026-05-31', '15:38:00', 3, 1, 'indoor_lt1', 'khvkuyvj', NULL, 86000, 0, 86000, 25800, 1, 'pending', 'unpaid', 'RSV-PAY-6-1780043600', '27de7ba2-0366-4eda-bc9b-3e56d677b734', '2026-05-29 01:33:20', '2026-05-29 01:33:20'),
(7, 'RSV-E22KJUD7', '072_zacky andyka', '965965956', 'zackyandyka1@gmail.com', '2026-05-31', '15:38:00', 3, 1, 'indoor_lt1', 'khvkuyvj', NULL, 86000, 0, 86000, 25800, 1, 'pending', 'unpaid', 'RSV-PAY-7-1780043604', '7ab589db-7314-4d27-9088-7a5f25667c8f', '2026-05-29 01:33:23', '2026-05-29 01:33:24'),
(8, 'RSV-YV2YL4', 'Budi Santoso', '08123456001', 'budi@gmail.com', '2026-05-27', '12:00:00', 4, 2, 'indoor_lt1', 'Tolong siapkan kursi tinggi untuk anak-anak.', NULL, 132000, 0, 132000, 39600, 1, 'confirmed', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(9, 'RSV-ID5BDX', 'Siti Rahayu', '08123456002', 'siti@gmail.com', '2026-05-28', '13:00:00', 2, 0, 'outdoor_lt1', NULL, NULL, 72000, 0, 72000, 21600, 1, 'confirmed', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(10, 'RSV-FRYR9M', 'Ahmad Fauzi', '08123456003', 'ahmad@gmail.com', '2026-05-29', '11:30:00', 6, 1, 'indoor_lt1_nosmoking', 'Anniversary kami, tolong siapkan lilin.', NULL, 235000, 0, 235000, 70500, 1, 'confirmed', 'pending', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 09:08:57'),
(11, 'RSV-S1ITJM', 'Dewi Kusuma', '08123456004', 'dewi@gmail.com', '2026-05-29', '19:00:00', 3, 0, 'lt2_ac', NULL, NULL, 72000, 0, 72000, 21600, 1, 'pending', 'unpaid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(12, 'RSV-2TEVCR', 'Rizky Pratama', '08123456005', 'rizky@gmail.com', '2026-05-30', '12:30:00', 5, 3, 'indoor_lt1', 'Ulang tahun anak saya, perlu dekorasi.', NULL, 172000, 0, 172000, 51600, 1, 'confirmed', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(13, 'RSV-O5VMGQ', 'Nurul Hidayah', '08123456006', 'nurul@gmail.com', '2026-05-30', '18:00:00', 2, 0, 'outdoor_lt1', NULL, NULL, 98000, 0, 98000, 29400, 1, 'pending', 'pending', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(14, 'RSV-KNNWXB', 'Hendra Wijaya', '08123456007', 'hendra@gmail.com', '2026-05-31', '13:00:00', 8, 2, 'lt2_ac', 'Meeting keluarga besar.', NULL, 87000, 0, 87000, 26100, 1, 'pending', 'unpaid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(15, 'RSV-F9CCAN', 'Maya Anggraini', '08123456008', 'maya@gmail.com', '2026-06-01', '12:00:00', 4, 0, 'indoor_lt1_nosmoking', NULL, NULL, 136000, 0, 136000, 40800, 1, 'pending', 'unpaid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(16, 'RSV-WXVVMH', 'Dani Supriyadi', '08123456009', 'dani@gmail.com', '2026-06-03', '11:00:00', 3, 1, 'outdoor_lt1', NULL, NULL, 322000, 0, 322000, 96600, 1, 'confirmed', 'paid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(17, 'RSV-AUD3NA', 'Yanti Kusuma', '08123456010', 'yanti@gmail.com', '2026-06-05', '19:30:00', 2, 0, 'lt2_ac', 'Batalkan saja.', NULL, 36000, 0, 36000, 10800, 1, 'cancelled', 'unpaid', NULL, NULL, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(18, 'RSV-BUS56Q7O', '072_zacky andyka', '46242', 'zackyandyka1@gmail.com', '2026-06-03', '22:42:00', 4, 2, 'indoor_lt1_nosmoking', 'drewre', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-18-1780069053', '87429c59-294e-4905-afd6-31d6905d6b37', '2026-05-29 08:37:33', '2026-05-29 08:37:33'),
(19, 'RSV-P98XNJ3H', '072_zacky andyka', '46242', 'zackyandyka1@gmail.com', '2026-06-03', '22:42:00', 4, 2, 'indoor_lt1_nosmoking', 'drewre', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-19-1780069179', 'd1db599b-774a-47e1-bca7-6307f4688031', '2026-05-29 08:39:39', '2026-05-29 08:39:39'),
(20, 'RSV-WHGRI9NX', '072_zacky andyka', '46242', 'zackyandyka1@gmail.com', '2026-06-03', '22:42:00', 4, 2, 'indoor_lt1_nosmoking', 'drewre', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-20-1780069198', 'ba5adc83-f0e9-47ad-9e78-e96c280e69ad', '2026-05-29 08:39:58', '2026-05-29 08:39:58'),
(21, 'RSV-E8TRNCZP', '072_zacky andyka', '46242', 'zackyandyka1@gmail.com', '2026-06-03', '22:42:00', 4, 2, 'indoor_lt1_nosmoking', 'drewre', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-21-1780069204', 'bc9d81cb-9605-4d30-857b-89a6a3cbdbc5', '2026-05-29 08:40:04', '2026-05-29 08:40:05'),
(22, 'RSV-YGA3WEMO', '072_zacky andyka', '46242', 'zackyandyka1@gmail.com', '2026-06-03', '22:42:00', 4, 2, 'indoor_lt1_nosmoking', 'drewre', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-22-1780069214', 'a59f900b-79f4-48ae-b919-9c61461a00a1', '2026-05-29 08:40:14', '2026-05-29 08:40:14'),
(23, 'RSV-QMYZ91RP', '072_zacky andyka', '3521153', 'zackyandyka1@gmail.com', '2026-05-31', '22:44:00', 4, 1, 'outdoor_lt1', 'dfbzdfbrhfdrf', NULL, 48000, 0, 48000, 14400, 1, 'pending', 'unpaid', 'RSV-PAY-23-1780069316', '3f8679fc-67f7-46cf-b32f-a37394d4e5f3', '2026-05-29 08:41:56', '2026-05-29 08:41:56'),
(24, 'RSV-AIF97QXK', '072_zacky andyka', '3521153', 'zackyandyka1@gmail.com', '2026-05-31', '22:44:00', 4, 1, 'outdoor_lt1', 'dfbzdfbrhfdrf', NULL, 48000, 0, 48000, 14400, 1, 'pending', 'unpaid', 'RSV-PAY-24-1780069324', '3dee3aac-b314-45e3-9a5b-2f71877c75ad', '2026-05-29 08:42:04', '2026-05-29 08:42:04'),
(25, 'RSV-0BGZARFY', '072_zacky andyka', '325252', 'zackyandyka1@gmail.com', '2026-05-31', '14:46:00', 2, 2, 'indoor_lt1_nosmoking', 'dnfdrhnfrd', NULL, 48000, 0, 48000, 14400, 1, 'pending', 'unpaid', 'RSV-PAY-25-1780069394', 'bbfafb4e-bc64-4501-9a61-5d518d12c92f', '2026-05-29 08:43:14', '2026-05-29 08:43:14'),
(26, 'RSV-KFHS8NEK', '072_zacky andyka', '325252', 'zackyandyka1@gmail.com', '2026-05-31', '14:46:00', 2, 2, 'indoor_lt1_nosmoking', 'dnfdrhnfrd', NULL, 48000, 0, 48000, 14400, 1, 'pending', 'unpaid', 'RSV-PAY-26-1780069411', '888ffdb9-7c73-474e-9ac3-15278c8a738d', '2026-05-29 08:43:31', '2026-05-29 08:43:32'),
(27, 'RSV-JSKROCLC', '072_zacky andyka', '325252', 'zackyandyka1@gmail.com', '2026-05-31', '14:46:00', 2, 2, 'indoor_lt1_nosmoking', 'dnfdrhnfrd', NULL, 48000, 0, 48000, 14400, 1, 'pending', 'unpaid', 'RSV-PAY-27-1780069426', '2a5d1b0f-721d-49ee-8de0-b19764a34cf1', '2026-05-29 08:43:46', '2026-05-29 08:43:47'),
(28, 'RSV-YWFVGHR0', '072_zacky andyka', '351315', 'zackyandyka1@gmail.com', '2026-06-01', '22:57:00', 4, 4, 'indoor_lt1_nosmoking', 'drfbdref', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-28-1780069925', '6760eda2-fa5f-45a2-a52b-04ae07e6d341', '2026-05-29 08:52:05', '2026-05-29 08:52:05'),
(29, 'RSV-BOJDFBUJ', '072_zacky andyka', '351315', 'zackyandyka1@gmail.com', '2026-06-01', '22:57:00', 4, 4, 'indoor_lt1_nosmoking', 'drfbdref', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-29-1780069937', '21cd04e5-51bb-4c98-a6be-1c4acdd5d56b', '2026-05-29 08:52:17', '2026-05-29 08:52:17'),
(30, 'RSV-EFUZOFGK', '072_zacky andyka', '351315', 'zackyandyka1@gmail.com', '2026-06-01', '22:57:00', 4, 4, 'indoor_lt1_nosmoking', 'drfbdref', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-30-1780069953', 'f668eda4-314f-4bc8-b2fe-8337c5bed072', '2026-05-29 08:52:33', '2026-05-29 08:52:33'),
(31, 'RSV-K4QIKRA1', '072_zacky andyka', '351315', 'zackyandyka1@gmail.com', '2026-06-01', '22:57:00', 4, 4, 'indoor_lt1_nosmoking', 'drfbdref', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-31-1780069967', 'f426e589-6e0e-4502-b39d-4cac12d4f120', '2026-05-29 08:52:47', '2026-05-29 08:52:48'),
(32, 'RSV-WPME93BY', '072_zacky andyka', '351315', 'zackyandyka1@gmail.com', '2026-06-01', '22:57:00', 4, 4, 'indoor_lt1_nosmoking', 'drfbdref', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-32-1780070036', 'b52140e9-42ca-499f-8698-35046f46bb4d', '2026-05-29 08:53:56', '2026-05-29 08:53:56'),
(33, 'RSV-JWPQ6HXA', '072_zacky andyka', '32432', 'zackyandyka1@gmail.com', '2026-06-06', '22:59:00', 4, 0, 'indoor_lt1', 'tnfgrg', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-33-1780070176', 'fc3c9bfd-bdd1-4b9b-a98f-e3ca155af9f7', '2026-05-29 08:56:16', '2026-05-29 08:56:17'),
(34, 'RSV-KQ0FRHYM', '072_zacky andyka', '32432', 'zackyandyka1@gmail.com', '2026-06-06', '22:59:00', 4, 0, 'indoor_lt1', 'tnfgrg', 'ZACKSTIKPS', 48000, 47040, 960, 288, 1, 'pending', 'unpaid', 'RSV-PAY-34-1780070360', '309057f8-9eed-4bcd-aeca-5c7143f6fdc6', '2026-05-29 08:59:20', '2026-05-29 08:59:21'),
(35, 'RSV-CPRYEH96', '072_zacky andyka', '1e3123e1', 'zackyandyka1@gmail.com', '2026-05-30', '11:14:00', 4, 0, 'indoor_lt1_nosmoking', 'dcsce', NULL, 80000, 0, 80000, 24000, 1, 'pending', 'unpaid', 'RSV-PAY-35-1780071056', 'e7791a04-66a7-4cfc-84e2-781ff8f90aa9', '2026-05-29 09:10:56', '2026-05-29 09:10:56'),
(36, 'RSV-LM0MK9TQ', '072_zacky andyka', '2342342', 'zackyandyka1@gmail.com', '2026-05-31', '17:15:00', 5, 1, 'outdoor_lt1', 'svdesvds', NULL, 48000, 0, 48000, 14400, 1, 'pending', 'unpaid', 'RSV-PAY-36-1780071359', '35f564dd-4332-48cb-b5b0-84907f118202', '2026-05-29 09:15:59', '2026-05-29 09:15:59'),
(37, 'RSV-DLZOGDAC', '072_zacky andyka', '122222', 'zackyandyka1@gmail.com', '2026-06-03', '11:35:00', 3, 3, 'indoor_lt1_nosmoking', 'dddddddddddddwwwwwww', NULL, 64000, 0, 64000, 19200, 1, 'confirmed', 'unpaid', 'RSV-PAY-37-1780072385', '355f5051-46d0-4265-9f69-888379e5d8fa', '2026-05-29 09:33:05', '2026-05-29 09:36:42');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_items`
--

CREATE TABLE `reservation_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservation_id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(12,0) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `subtotal` decimal(12,0) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservation_items`
--

INSERT INTO `reservation_items` (`id`, `reservation_id`, `menu_id`, `name`, `price`, `quantity`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Ayam Pecak Biasa', 15000, 2, 30000, '2026-05-29 01:32:45', '2026-05-29 01:32:45'),
(2, 2, 7, 'Ikan Gurami Pecak', 56000, 1, 56000, '2026-05-29 01:32:45', '2026-05-29 01:32:45'),
(3, 3, 1, 'Ayam Pecak Biasa', 15000, 2, 30000, '2026-05-29 01:32:56', '2026-05-29 01:32:56'),
(4, 3, 7, 'Ikan Gurami Pecak', 56000, 1, 56000, '2026-05-29 01:32:56', '2026-05-29 01:32:56'),
(5, 4, 1, 'Ayam Pecak Biasa', 15000, 2, 30000, '2026-05-29 01:33:09', '2026-05-29 01:33:09'),
(6, 4, 7, 'Ikan Gurami Pecak', 56000, 1, 56000, '2026-05-29 01:33:09', '2026-05-29 01:33:09'),
(7, 5, 1, 'Ayam Pecak Biasa', 15000, 2, 30000, '2026-05-29 01:33:16', '2026-05-29 01:33:16'),
(8, 5, 7, 'Ikan Gurami Pecak', 56000, 1, 56000, '2026-05-29 01:33:16', '2026-05-29 01:33:16'),
(9, 6, 1, 'Ayam Pecak Biasa', 15000, 2, 30000, '2026-05-29 01:33:20', '2026-05-29 01:33:20'),
(10, 6, 7, 'Ikan Gurami Pecak', 56000, 1, 56000, '2026-05-29 01:33:20', '2026-05-29 01:33:20'),
(11, 7, 1, 'Ayam Pecak Biasa', 15000, 2, 30000, '2026-05-29 01:33:24', '2026-05-29 01:33:24'),
(12, 7, 7, 'Ikan Gurami Pecak', 56000, 1, 56000, '2026-05-29 01:33:24', '2026-05-29 01:33:24'),
(13, 8, 15, 'Ikan Pare Pecak', 26000, 3, 78000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(14, 8, 218, 'Milo Double Shake', 22000, 2, 44000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(15, 8, 225, 'Teh Tong', 5000, 2, 10000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(16, 9, 48, 'Ikan Patin Balado', 36000, 2, 72000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(17, 10, 1, 'Ayam Pecak Biasa', 15000, 1, 15000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(18, 10, 7, 'Ikan Gurami Pecak', 56000, 2, 112000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(19, 10, 95, 'Ikan Patin Gulai', 36000, 3, 108000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(20, 11, 57, 'Ikan Bawal Sambal Tuk-Tuk', 36000, 2, 72000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(21, 12, 127, 'Ikan Nila Asam Manis', 26000, 2, 52000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(22, 12, 143, 'Ikan Bawal Arsik', 31000, 3, 93000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(23, 12, 212, 'Nutrisari', 9000, 3, 27000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(24, 13, 72, 'Sup Ayam Eropa', 23000, 1, 23000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(25, 13, 179, 'Telur Dadar Goreng', 11000, 3, 33000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(26, 13, 223, 'Kopi Lemon', 21000, 2, 42000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(27, 14, 147, 'Bebek Lada Hitam', 29000, 3, 87000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(28, 15, 24, 'Burung Bakar', 18000, 3, 54000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(29, 15, 154, 'Ikan Nila Lada Hitam', 23000, 3, 69000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(30, 15, 168, 'Toge', 13000, 1, 13000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(31, 16, 44, 'Ikan Gurami Balado', 56000, 3, 168000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(32, 16, 92, 'Ikan Gembung Gulai', 23000, 2, 46000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(33, 16, 138, 'Ikan Mas Arsik', 36000, 3, 108000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(34, 17, 103, 'Ikan Patin Gulai Acar', 36000, 1, 36000, '2026-05-29 03:28:48', '2026-05-29 03:28:48'),
(35, 18, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:37:33', '2026-05-29 08:37:33'),
(36, 19, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:39:39', '2026-05-29 08:39:39'),
(37, 20, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:39:58', '2026-05-29 08:39:58'),
(38, 21, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:40:04', '2026-05-29 08:40:04'),
(39, 22, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:40:14', '2026-05-29 08:40:14'),
(40, 23, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:41:56', '2026-05-29 08:41:56'),
(41, 24, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:42:04', '2026-05-29 08:42:04'),
(42, 25, 37, 'Ayam Balado Biasa', 16000, 3, 48000, '2026-05-29 08:43:14', '2026-05-29 08:43:14'),
(43, 26, 37, 'Ayam Balado Biasa', 16000, 3, 48000, '2026-05-29 08:43:31', '2026-05-29 08:43:31'),
(44, 27, 37, 'Ayam Balado Biasa', 16000, 3, 48000, '2026-05-29 08:43:46', '2026-05-29 08:43:46'),
(45, 28, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:52:05', '2026-05-29 08:52:05'),
(46, 29, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:52:17', '2026-05-29 08:52:17'),
(47, 30, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:52:33', '2026-05-29 08:52:33'),
(48, 31, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:52:47', '2026-05-29 08:52:47'),
(49, 32, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:53:56', '2026-05-29 08:53:56'),
(50, 33, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:56:16', '2026-05-29 08:56:16'),
(51, 34, 20, 'Ayam Bakar Biasa', 16000, 3, 48000, '2026-05-29 08:59:20', '2026-05-29 08:59:20'),
(52, 35, 20, 'Ayam Bakar Biasa', 16000, 5, 80000, '2026-05-29 09:10:56', '2026-05-29 09:10:56'),
(53, 36, 37, 'Ayam Balado Biasa', 16000, 3, 48000, '2026-05-29 09:15:59', '2026-05-29 09:15:59'),
(54, 37, 20, 'Ayam Bakar Biasa', 16000, 4, 64000, '2026-05-29 09:33:05', '2026-05-29 09:33:05');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL COMMENT '1 to 5',
  `comment` text NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `name`, `rating`, `comment`, `is_approved`, `created_at`, `updated_at`) VALUES
(2, 'Siti Nurhaliza', 5, 'Nasi timbel di sini beda dari yang lain, aromanya harum daun pisang dan nasinya pulen banget. Sayur asemnya segar, kuahnya bening dan gurih alami. Porsi besar, harga terjangkau. Recommended banget buat makan siang!', 1, '2026-04-09 08:00:26', '2026-05-24 08:00:26'),
(3, 'Dimas Prasetyo', 4, 'Sate Marangginyaaaa enak banget, bumbu meresap dan dagingnya empuk. Agak sedikit nunggu karena ramai, tapi worth it! Pelayanannya ramah dan tempatnya bersih. Minuman es teh manisnya juga segar.', 1, '2026-04-02 08:00:26', '2026-05-24 08:00:26'),
(4, 'Anita Wijayanti', 5, 'Karedok dan lotek di sini benar-benar autentik khas Sunda. Bumbu kacangnya pas, tidak terlalu manis dan tidak terlalu pedas. Lalapannya segar-segar. Cocok banget buat yang suka makanan sehat tapi tetap lezat.', 1, '2026-04-07 08:00:26', '2026-05-24 08:00:26'),
(5, 'Budi Santoso', 4, 'Gurame gorengnya garing dan besar, dagingnya tidak amis sama sekali. Porsinya cocok untuk 2-3 orang. Tempatnya nyaman ada AC, parkir luas. Hanya saja agak susah dapat meja saat weekend, sebaiknya reservasi dulu.', 1, '2026-04-25 08:00:26', '2026-05-24 08:00:26'),
(7, 'Fajar Nugroho', 4, 'Datang kesini bersama keluarga, anak-anak juga senang karena tempatnya family friendly. Klepon dessertnya enak banget, gula merahnya lumer di mulut. Cendolnya juga segar. Pelayanan cepat dan ramah. Akan balik lagi!', 1, '2026-05-07 08:00:26', '2026-05-24 08:00:26'),
(8, 'Hesti Kumalasari', 5, 'Pepes ikan di sini bikin kangen rumah, rasanya persis masakan nenek. Bumbunya meresap, ikannya lembut, aroma kemangi dan daun pisangnya harum sekali. Sayur asemnya juga segar dan bening. Sungguh makanan yang menyentuh hati!', 1, '2026-05-13 08:00:26', '2026-05-24 08:00:26'),
(9, 'Irwan Setiawan', 4, 'Harga sangat terjangkau untuk kualitas makanan yang disajikan. Nasi timbel komplit dengan ayam bakar, lalapan, dan sambal sudah sangat mengenyangkan. Tempatnya bersih dan nyaman. Recommended untuk makan siang bersama rekan kerja.', 1, '2026-04-09 08:00:26', '2026-05-24 08:00:26'),
(10, 'Lestari Handayani', 5, 'Es cincau hijau dan jus alpukat di sini juara! Cincaunya lembut dan santannya gurih, manisnya pas. Jus alpukatnya kental dan creamy. Makanan Sundanya juga tidak perlu diragukan lagi. Suasana outdoor-nya bikin makin nikmat makan.', 1, '2026-03-28 08:00:26', '2026-05-24 08:00:26'),
(11, 'Muhammad Rizki', 4, 'Tumis kangkungnya mantap, bumbunya meresap dan sayurnya tidak terlalu layu. Combro dan misronya juga enak sebagai camilan menunggu makanan utama. Tempatnya cukup strategis dan mudah ditemukan. Overall pengalaman makan yang sangat menyenangkan.', 1, '2026-03-29 08:00:26', '2026-05-24 08:00:26'),
(12, 'Nanda Permata', 5, 'Restoran Sunda yang sungguh autentik! Dari segi rasa, suasana, hingga pelayanan semuanya memuaskan. Kolak pisangnya manis legit dan hangatnya pas. Dawet ayunya juga segar sekali. Pokoknya kalau kangen masakan Sunda, tempat ini jawabannya!', 1, '2026-04-29 08:00:26', '2026-05-24 08:00:26'),
(13, 'aing', 3, 'afcsafawasca', 1, '2026-05-29 08:29:56', '2026-05-29 08:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `deliveries_delivery_code_unique` (`delivery_code`);

--
-- Indexes for table `delivery_items`
--
ALTER TABLE `delivery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delivery_items_delivery_id_foreign` (`delivery_id`),
  ADD KEY `delivery_items_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_slug_unique` (`slug`),
  ADD KEY `menus_category_id_foreign` (`category_id`);

--
-- Indexes for table `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menu_categories_slug_unique` (`slug`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_midtrans_order_id_unique` (`midtrans_order_id`),
  ADD KEY `payments_payable_type_payable_id_index` (`payable_type`,`payable_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `promos`
--
ALTER TABLE `promos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promos_code_unique` (`code`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reservations_reservation_code_unique` (`reservation_code`);

--
-- Indexes for table `reservation_items`
--
ALTER TABLE `reservation_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_items_reservation_id_foreign` (`reservation_id`),
  ADD KEY `reservation_items_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `delivery_items`
--
ALTER TABLE `delivery_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT for table `menu_categories`
--
ALTER TABLE `menu_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promos`
--
ALTER TABLE `promos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `reservation_items`
--
ALTER TABLE `reservation_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `delivery_items`
--
ALTER TABLE `delivery_items`
  ADD CONSTRAINT `delivery_items_delivery_id_foreign` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `delivery_items_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`);

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `menu_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservation_items`
--
ALTER TABLE `reservation_items`
  ADD CONSTRAINT `reservation_items_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`),
  ADD CONSTRAINT `reservation_items_reservation_id_foreign` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
