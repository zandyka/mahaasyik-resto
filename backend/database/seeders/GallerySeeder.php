<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $gallery = [
            [
                'title'      => 'Suasana Indoor Lt. 1',
                'image_path' => 'gallery/placeholder-1.jpg',
                'caption'    => 'Ruang makan indoor lantai 1 yang nyaman dengan AC',
                'sort_order' => 1,
            ],
            [
                'title'      => 'Area Outdoor Lt. 1',
                'image_path' => 'gallery/placeholder-2.jpg',
                'caption'    => 'Nikmati makan di udara segar area outdoor kami',
                'sort_order' => 2,
            ],
            [
                'title'      => 'Indoor No Smoking (AC)',
                'image_path' => 'gallery/placeholder-3.jpg',
                'caption'    => 'Area khusus non-rokok dengan AC sejuk',
                'sort_order' => 3,
            ],
            [
                'title'      => 'Lantai 2 Premium',
                'image_path' => 'gallery/placeholder-4.jpg',
                'caption'    => 'Area premium lantai 2 dengan AC dan pemandangan indah',
                'sort_order' => 4,
            ],
            [
                'title'      => 'Koleksi Menu Andalan',
                'image_path' => 'gallery/placeholder-5.jpg',
                'caption'    => 'Menu-menu andalan masakan Sunda autentik kami',
                'sort_order' => 5,
            ],
            [
                'title'      => 'Dapur Kami',
                'image_path' => 'gallery/placeholder-6.jpg',
                'caption'    => 'Dimasak langsung oleh chef berpengalaman',
                'sort_order' => 6,
            ],
        ];

        foreach ($gallery as $item) {
            DB::table('gallery')->insert(array_merge($item, [
                'is_active'  => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
