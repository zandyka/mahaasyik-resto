<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\ReservationItem;
use App\Models\Delivery;
use App\Models\DeliveryItem;
use App\Models\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $menus = Menu::where('is_available', true)->get();

        if ($menus->isEmpty()) {
            $this->command->warn('Tidak ada menu. Jalankan MenuSeeder terlebih dahulu.');
            return;
        }

        // ─── RESERVATIONS ────────────────────────────────────────
        $reservationData = [
            ['name' => 'Budi Santoso',    'phone' => '08123456001', 'email' => 'budi@gmail.com',    'date' => now()->subDays(2)->toDateString(), 'time' => '12:00', 'adults' => 4, 'children' => 2, 'seating_area' => 'indoor_lt1',            'status' => 'confirmed', 'payment_status' => 'paid',    'message' => 'Tolong siapkan kursi tinggi untuk anak-anak.'],
            ['name' => 'Siti Rahayu',     'phone' => '08123456002', 'email' => 'siti@gmail.com',    'date' => now()->subDays(1)->toDateString(), 'time' => '13:00', 'adults' => 2, 'children' => 0, 'seating_area' => 'outdoor_lt1',           'status' => 'confirmed', 'payment_status' => 'paid',    'message' => null],
            ['name' => 'Ahmad Fauzi',     'phone' => '08123456003', 'email' => 'ahmad@gmail.com',   'date' => now()->toDateString(),             'time' => '11:30', 'adults' => 6, 'children' => 1, 'seating_area' => 'indoor_lt1_nosmoking',  'status' => 'pending',   'payment_status' => 'pending', 'message' => 'Anniversary kami, tolong siapkan lilin.'],
            ['name' => 'Dewi Kusuma',     'phone' => '08123456004', 'email' => 'dewi@gmail.com',    'date' => now()->toDateString(),             'time' => '19:00', 'adults' => 3, 'children' => 0, 'seating_area' => 'lt2_ac',                'status' => 'pending',   'payment_status' => 'unpaid',  'message' => null],
            ['name' => 'Rizky Pratama',   'phone' => '08123456005', 'email' => 'rizky@gmail.com',   'date' => now()->addDays(1)->toDateString(), 'time' => '12:30', 'adults' => 5, 'children' => 3, 'seating_area' => 'indoor_lt1',            'status' => 'confirmed', 'payment_status' => 'paid',    'message' => 'Ulang tahun anak saya, perlu dekorasi.'],
            ['name' => 'Nurul Hidayah',   'phone' => '08123456006', 'email' => 'nurul@gmail.com',   'date' => now()->addDays(1)->toDateString(), 'time' => '18:00', 'adults' => 2, 'children' => 0, 'seating_area' => 'outdoor_lt1',           'status' => 'pending',   'payment_status' => 'pending', 'message' => null],
            ['name' => 'Hendra Wijaya',   'phone' => '08123456007', 'email' => 'hendra@gmail.com',  'date' => now()->addDays(2)->toDateString(), 'time' => '13:00', 'adults' => 8, 'children' => 2, 'seating_area' => 'lt2_ac',                'status' => 'pending',   'payment_status' => 'unpaid',  'message' => 'Meeting keluarga besar.'],
            ['name' => 'Maya Anggraini',  'phone' => '08123456008', 'email' => 'maya@gmail.com',    'date' => now()->addDays(3)->toDateString(), 'time' => '12:00', 'adults' => 4, 'children' => 0, 'seating_area' => 'indoor_lt1_nosmoking',  'status' => 'pending',   'payment_status' => 'unpaid',  'message' => null],
            ['name' => 'Dani Supriyadi',  'phone' => '08123456009', 'email' => 'dani@gmail.com',    'date' => now()->addDays(5)->toDateString(), 'time' => '11:00', 'adults' => 3, 'children' => 1, 'seating_area' => 'outdoor_lt1',           'status' => 'confirmed', 'payment_status' => 'paid',    'message' => null],
            ['name' => 'Yanti Kusuma',    'phone' => '08123456010', 'email' => 'yanti@gmail.com',   'date' => now()->addDays(7)->toDateString(), 'time' => '19:30', 'adults' => 2, 'children' => 0, 'seating_area' => 'lt2_ac',                'status' => 'cancelled', 'payment_status' => 'unpaid',  'message' => 'Batalkan saja.'],
        ];

        foreach ($reservationData as $data) {
            $selectedMenus = $menus->random(rand(1, 3));
            $subtotal = 0;
            $items = [];
            foreach ($selectedMenus as $menu) {
                $qty = rand(1, 3);
                $price = (int) $menu->price;
                $sub = $price * $qty;
                $subtotal += $sub;
                $items[] = ['menu_id' => $menu->id, 'name' => $menu->name, 'price' => $price, 'quantity' => $qty, 'subtotal' => $sub];
            }
            $dp = (int) ($subtotal * 0.3);
            $reservation = Reservation::create([
                'reservation_code' => 'RSV-' . strtoupper(Str::random(6)),
                'name'             => $data['name'],
                'phone'            => $data['phone'],
                'email'            => $data['email'],
                'date'             => $data['date'],
                'time'             => $data['time'],
                'adults'           => $data['adults'],
                'children'         => $data['children'],
                'seating_area'     => $data['seating_area'],
                'message'          => $data['message'],
                'subtotal'         => $subtotal,
                'discount_amount'  => 0,
                'total_price'      => $subtotal,
                'dp_amount'        => $dp,
                'has_order'        => count($items) > 0,
                'status'           => $data['status'],
                'payment_status'   => $data['payment_status'],
            ]);
            foreach ($items as $item) {
                ReservationItem::create(array_merge($item, ['reservation_id' => $reservation->id]));
            }
        }

        // ─── DELIVERIES ───────────────────────────────────────────
        $deliveryData = [
            ['name' => 'Fajar Maulana',   'phone' => '08129000001', 'email' => 'fajar@gmail.com',   'address' => 'Jl. Melati No.5, Tj. Morawa',      'delivery_method' => 'gojek',       'payment_method' => 'gopay',      'status' => 'delivered',   'payment_status' => 'paid'],
            ['name' => 'Lestari Putri',   'phone' => '08129000002', 'email' => 'lestari@gmail.com', 'address' => 'Jl. Mawar No.12, Tj. Morawa',      'delivery_method' => 'grab',        'payment_method' => 'qris',       'status' => 'delivered',   'payment_status' => 'paid'],
            ['name' => 'Agus Setiawan',   'phone' => '08129000003', 'email' => 'agus@gmail.com',    'address' => 'Jl. Dahlia No.7, Deli Serdang',     'delivery_method' => 'delivery_boy','payment_method' => 'cod',        'status' => 'delivering', 'payment_status' => 'pending'],
            ['name' => 'Fitri Hasanah',   'phone' => '08129000004', 'email' => 'fitri@gmail.com',   'address' => 'Komplek Griya No.3, Tj. Morawa',    'delivery_method' => 'gojek',       'payment_method' => 'dana',       'status' => 'processing', 'payment_status' => 'paid'],
            ['name' => 'Rudi Hartono',    'phone' => '08129000005', 'email' => 'rudi@gmail.com',    'address' => 'Jl. Anggrek No.22, Tj. Morawa',     'delivery_method' => 'grab',        'payment_method' => 'shopeepay',  'status' => 'pending',    'payment_status' => 'pending'],
            ['name' => 'Nita Sari',       'phone' => '08129000006', 'email' => 'nita@gmail.com',    'address' => 'Jl. Kenanga No.1, Deli Serdang',    'delivery_method' => 'delivery_boy','payment_method' => 'qris',       'status' => 'delivered',  'payment_status' => 'paid'],
            ['name' => 'Bagas Pramana',   'phone' => '08129000007', 'email' => 'bagas@gmail.com',   'address' => 'Jl. Merpati No.8, Tj. Morawa',      'delivery_method' => 'gojek',       'payment_method' => 'google_pay', 'status' => 'cancelled',  'payment_status' => 'unpaid'],
            ['name' => 'Wulandari',       'phone' => '08129000008', 'email' => 'wulan@gmail.com',   'address' => 'Perum Baru Blok C No.4, Tj. Morawa','delivery_method' => 'grab',        'payment_method' => 'debit',      'status' => 'pending',    'payment_status' => 'unpaid'],
        ];

        foreach ($deliveryData as $data) {
            $selectedMenus = $menus->random(rand(1, 4));
            $subtotal = 0;
            $items = [];
            foreach ($selectedMenus as $menu) {
                $qty = rand(1, 2);
                $price = (int) $menu->price;
                $sub = $price * $qty;
                $subtotal += $sub;
                $items[] = ['menu_id' => $menu->id, 'name' => $menu->name, 'price' => $price, 'quantity' => $qty, 'subtotal' => $sub];
            }
            $deliveryFee = 8000;
            $total = $subtotal + $deliveryFee;
            $delivery = Delivery::create([
                'delivery_code'   => 'DLV-' . strtoupper(Str::random(6)),
                'name'            => $data['name'],
                'phone'           => $data['phone'],
                'email'           => $data['email'],
                'address'         => $data['address'],
                'notes'           => null,
                'delivery_method' => $data['delivery_method'],
                'payment_method'  => $data['payment_method'],
                'subtotal'        => $subtotal,
                'discount_amount' => 0,
                'delivery_fee'    => $deliveryFee,
                'total_price'     => $total,
                'status'          => $data['status'],
                'payment_status'  => $data['payment_status'],
            ]);
            foreach ($items as $item) {
                DeliveryItem::create(array_merge($item, ['delivery_id' => $delivery->id]));
            }
        }

        $this->command->info('✅ OrderSeeder: ' . count($reservationData) . ' reservasi + ' . count($deliveryData) . ' delivery berhasil dibuat.');
    }
}
