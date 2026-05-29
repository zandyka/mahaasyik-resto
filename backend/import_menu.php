<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

$file = 'C:/xampp/htdocs/pojekpw2/menu.txt';
$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

DB::statement('SET FOREIGN_KEY_CHECKS=0;');
DB::table('menus')->truncate();
DB::table('menu_categories')->truncate();
DB::statement('SET FOREIGN_KEY_CHECKS=1;');

$currentCategoryId = null;
$sortOrderCat = 1;
$sortOrderMenu = 1;

foreach ($lines as $line) {
    $line = trim($line);
    if (empty($line) || $line === '---') continue;

    if (str_starts_with($line, '##')) {
        // New Category
        $catName = trim(str_replace('##', '', $line));
        $slug = Str::slug($catName);
        
        // Define some simple icons based on category name
        $icon = '???';
        if (stripos($catName, 'minuman') !== false || stripos($catName, 'jus') !== false) $icon = '??';
        if (stripos($catName, 'gorengan') !== false || stripos($catName, 'cemilan') !== false) $icon = '??';
        if (stripos($catName, 'sup') !== false) $icon = '??';
        
        $currentCategoryId = DB::table('menu_categories')->insertGetId([
            'name' => $catName,
            'slug' => $slug,
            'icon' => $icon,
            'sort_order' => $sortOrderCat++,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $sortOrderMenu = 1;
    } elseif (str_starts_with($line, '-')) {
        // Menu item
        // e.g. "- Ayam Pecak Biasa - 15k" or "- Ayam Pecak Jumbo – 23k"
        // remove leading dash
        $line = ltrim(substr($line, 1));
        
        // Split by '-' or '–' (en dash)
        $parts = preg_split('/[-–]/', $line);
        if (count($parts) >= 2) {
            $priceStr = trim(array_pop($parts));
            $name = trim(implode('-', $parts)); // Rejoin if name had dashes
            
            // Extract numeric part from '15k'
            $priceNum = floatval(str_replace('k', '', strtolower($priceStr))) * 1000;
            
            DB::table('menus')->insert([
                'category_id' => $currentCategoryId,
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => 'Menu lezat pilihan ' . $name . '.',
                'price' => $priceNum,
                'image_ratio' => '4:3',
                'is_available' => true,
                'is_recommended' => ($sortOrderMenu <= 2), // First 2 items in cat recommended
                'sort_order' => $sortOrderMenu++,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

echo "Menu successfully imported!\n";
