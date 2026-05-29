<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MenuCategorySeeder::class,
            MenuSeeder::class,
            GallerySeeder::class,
            FaqSeeder::class,
            ReviewSeeder::class,
            PromoSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
