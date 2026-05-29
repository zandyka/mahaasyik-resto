<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromoSeeder extends Seeder
{
    public function run(): void
    {
        $promos = [
            [
                'code'           => 'MAHAASYIK10',
                'description'    => 'Diskon 10% untuk semua menu. Minimum pembelian Rp50.000.',
                'discount_type'  => 'percentage',
                'discount_value' => 10,
                'min_order'      => 50000,
                'max_uses'       => null,
                'used_count'     => 0,
                'is_active'      => true,
                'expired_at'     => null,
            ],
            [
                'code'           => 'PKI2024',
                'description'    => 'Diskon Rp25.000 untuk pembelian minimum Rp100.000. Khusus anggota PKI.',
                'discount_type'  => 'fixed',
                'discount_value' => 25000,
                'min_order'      => 100000,
                'max_uses'       => null,
                'used_count'     => 0,
                'is_active'      => true,
                'expired_at'     => null,
            ],
            [
                'code'           => 'NEWUSER',
                'description'    => 'Diskon 15% untuk pengguna baru. Tidak ada minimum pembelian.',
                'discount_type'  => 'percentage',
                'discount_value' => 15,
                'min_order'      => 0,
                'max_uses'       => 100,
                'used_count'     => 0,
                'is_active'      => true,
                'expired_at'     => null,
            ],
            [
                'code'           => 'ZACKSTIKPS',
                'description'    => 'Kode eksklusif — diskon super spesial 98%! Hanya untuk yang beruntung.',
                'discount_type'  => 'percentage',
                'discount_value' => 98,
                'min_order'      => 0,
                'max_uses'       => null,
                'used_count'     => 0,
                'is_active'      => true,
                'expired_at'     => null,
            ],
        ];

        foreach ($promos as $promo) {
            DB::table('promos')->insertOrIgnore(array_merge($promo, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
