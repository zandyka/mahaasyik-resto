<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Nasi & Lauk',      'slug' => 'nasi-lauk',       'icon' => '🍚', 'sort_order' => 1],
            ['name' => 'Sayuran',           'slug' => 'sayuran',          'icon' => '🥬', 'sort_order' => 2],
            ['name' => 'Lalapan & Sambal',  'slug' => 'lalapan-sambal',   'icon' => '🌶️', 'sort_order' => 3],
            ['name' => 'Gorengan',          'slug' => 'gorengan',         'icon' => '🍟', 'sort_order' => 4],
            ['name' => 'Minuman',           'slug' => 'minuman',          'icon' => '🥤', 'sort_order' => 5],
            ['name' => 'Dessert',           'slug' => 'dessert',          'icon' => '🍮', 'sort_order' => 6],
        ];

        foreach ($categories as $cat) {
            DB::table('menu_categories')->insert(array_merge($cat, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
