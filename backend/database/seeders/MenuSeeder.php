<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // [category_id, name, description, price, is_recommended]
        $menus = [

            // ── Category 1: Nasi & Lauk ──────────────────────────────────────────
            [1, 'Nasi Putih',           'Nasi putih pulen yang dimasak dengan beras pilihan berkualitas tinggi, cocok sebagai pendamping berbagai lauk Sunda.',                              5000,  false],
            [1, 'Nasi Timbel',          'Nasi hangat yang dibungkus daun pisang sehingga beraroma harum khas, disajikan dengan lauk-pauk pilihan khas Sunda.',                             15000, true],
            [1, 'Ayam Goreng Kampung',  'Ayam kampung pilihan yang digoreng hingga renyah keemasan dengan bumbu rempah tradisional Sunda yang meresap hingga ke tulang.',                  35000, true],
            [1, 'Ayam Bakar Kecap',     'Ayam kampung dimarinasi bumbu kecap manis dan rempah pilihan lalu dibakar di atas bara api hingga harum dan matang sempurna.',                    38000, true],
            [1, 'Ikan Gurame Goreng',   'Gurame segar ukuran besar digoreng garing hingga kecokelatan, renyah di luar namun tetap lembut dan gurih di dalam.',                             65000, true],
            [1, 'Ikan Gurame Bakar',    'Gurame segar dipanggang di atas arang dengan olesan bumbu rempah spesial, menghasilkan cita rasa smoky yang lezat dan menggugah selera.',         70000, false],
            [1, 'Bebek Goreng Crispy',  'Bebek pilihan yang diungkep dengan rempah lengkap lalu digoreng deep-fry hingga kulit luar super crispy namun daging dalam tetap juicy dan empuk.',45000, true],
            [1, 'Empal Gentong',        'Daging sapi pilihan dimasak perlahan dalam kuah santan gurih dengan rempah khas Cirebon, menghasilkan tekstur empuk dan kuah yang kaya rasa.',    40000, false],
            [1, 'Sate Maranggi',        'Sate daging sapi khas Purwakarta yang dimarinasi dengan kecap, ketumbar, dan rempah pilihan lalu dibakar hingga sempurna, disajikan dengan sambal tomat segar.', 45000, true],
            [1, 'Pepes Ikan',           'Ikan mas atau ikan nila segar yang dibumbui kunyit, kemangi, dan rempah pilihan, dibungkus daun pisang lalu dipanggang hingga harum dan matang.',  30000, false],

            // ── Category 2: Sayuran ──────────────────────────────────────────────
            [2, 'Sayur Asem',           'Kuah bening segar dari asam jawa dengan isian kacang tanah, melinjo, labu siam, kacang panjang, dan jagung—hidangan sayur Sunda yang ikonik.',    20000, true],
            [2, 'Tumis Kangkung',       'Kangkung segar ditumis dengan bawang merah, bawang putih, cabai, dan sedikit terasi, menghasilkan cita rasa gurih dan sedikit pedas yang menggugah selera.', 18000, false],
            [2, 'Karedok',              'Sayuran segar mentah—kacang panjang, taoge, terong, dan mentimun—disiram bumbu kacang pedas khas Sunda yang kaya rempah dan segar.',              15000, true],
            [2, 'Lotek',               'Sayuran rebus seperti bayam, taoge, dan kacang panjang yang disiram bumbu kacang manis legit khas Sunda, dilengkapi kerupuk renyah.',              15000, false],
            [2, 'Gado-Gado',            'Aneka sayuran rebus dan tahu goreng disiram saus kacang kental yang kaya rasa, dilengkapi telur rebus dan kerupuk renyah.',                       20000, false],
            [2, 'Capcay Goreng',        'Aneka sayuran segar seperti wortel, brokoli, kembang kol, dan bakso dimasak tumis dengan saus tiram dan kaldu ayam yang gurih.',                   22000, false],

            // ── Category 3: Lalapan & Sambal ────────────────────────────────────
            [3, 'Lalapan Komplit',      'Aneka sayuran segar—daun kemangi, timun, tomat, terong mentah, dan daun singkong—disajikan sebagai pelengkap makan khas Sunda.',                  15000, false],
            [3, 'Sambal Terasi',        'Sambal segar yang diulek dari cabai merah, cabai rawit, bawang, tomat, dan terasi bakar—pedas, harum, dan kaya cita rasa umami.',                  5000,  false],
            [3, 'Sambal Oncom',         'Sambal khas Sunda berbahan dasar oncom fermentasi yang dimasak dengan cabai, bawang, dan kencur, menghadirkan rasa gurih dan unik yang otentik.',   8000,  true],
            [3, 'Kerupuk',              'Kerupuk udang atau kerupuk putih renyah sebagai pelengkap hidangan, menambah sensasi kriuk yang menyenangkan di setiap suapan.',                    5000,  false],

            // ── Category 4: Gorengan ─────────────────────────────────────────────
            [4, 'Tahu Goreng',          'Tahu putih segar yang digoreng hingga kecokelatan dengan kulit luar renyah dan bagian dalam yang lembut, cocok disantap dengan sambal terasi.',    10000, false],
            [4, 'Tempe Goreng',         'Tempe tipis berbumbu yang digoreng garing keemasan, menghasilkan perpaduan sempurna antara renyah di luar dan gurih beraroma di dalam.',             8000,  false],
            [4, 'Bakwan Jagung',        'Perkedel jagung manis yang digoreng hingga renyah keemasan, dibuat dari jagung pipil segar dicampur daun bawang dan tepung bumbu.',               12000, false],
            [4, 'Combro',               'Gorengan khas Sunda berbahan singkong parut yang diisi oncom pedas, digoreng hingga renyah luar dan gurih di dalam—camilan favorit Sunda.',         8000,  false],
            [4, 'Misro',                'Gorengan singkong parut isi gula merah khas Sunda—renyah di luar, manis lumer di dalam, sempurna sebagai camilan atau pendamping teh hangat.',       8000,  false],

            // ── Category 5: Minuman ───────────────────────────────────────────────
            [5, 'Es Teh Manis',         'Teh hitam pilihan diseduh panas lalu didinginkan dengan es batu, dipadukan gula pasir asli menghasilkan minuman segar yang menyegarkan.',           8000,  false],
            [5, 'Es Jeruk',             'Perasan jeruk segar dicampur air dingin dan sedikit gula, menghadirkan kesegaran alami buah jeruk yang menyegarkan tenggorokan.',                  10000, false],
            [5, 'Jus Alpukat',          'Alpukat matang pilihan diblender halus dengan susu kental manis dan es batu, menghasilkan minuman creamy, kental, dan kaya nutrisi.',             20000, true],
            [5, 'Jus Mangga',           'Mangga harum manis pilihan diblender segar dengan sedikit air dan es batu, menghadirkan kesegaran tropis yang asam-manis dan menyegarkan.',        18000, false],
            [5, 'Es Cincau Hijau',      'Cincau hijau alami berbahan daun cincau segar disajikan dengan santan gurih, gula merah cair, dan es batu—minuman herbal tradisional yang menyegarkan.', 12000, true],
            [5, 'Es Kelapa Muda',       'Air kelapa muda asli langsung dari buahnya, disajikan dingin bersama daging kelapa muda yang lembut—menyegarkan dan kaya elektrolit alami.',       15000, false],
            [5, 'Wedang Jahe',          'Minuman jahe segar yang dimasak dengan gula merah dan serai, menghadirkan kehangatan rempah tradisional yang menyehatkan dan merelaksasi tubuh.',   12000, false],
            [5, 'Kopi Tubruk',          'Kopi arabika/robusta pilihan yang diseduh tubruk tradisional dengan air panas mendidih, menghadirkan cita rasa kopi otentik yang kuat dan harum.',  10000, false],

            // ── Category 6: Dessert ───────────────────────────────────────────────
            [6, 'Dawet Ayu',            'Minuman dessert khas Banjarnegara berisi cendol hijau kenyal dari tepung beras, disiram santan gurih dan gula merah cair yang legit.',             12000, false],
            [6, 'Klepon',               'Kue bola ketan kenyal berwarna hijau dari pandan, berisi gula merah cair yang meledak di mulut, dibalut kelapa parut segar yang gurih.',           10000, true],
            [6, 'Cendol',               'Minuman dessert segar khas Sunda berisi cendol pandan kenyal, santan kelapa murni, gula merah cair, dan es serut—manis, gurih, dan menyegarkan.',  12000, false],
            [6, 'Kolak Pisang',         'Pisang kepok matang dimasak dalam kuah santan gurih bercampur gula merah dan daun pandan, menghasilkan dessert hangat manis legit khas Nusantara.', 12000, false],
        ];

        foreach ($menus as $menu) {
            DB::table('menus')->insert([
                'category_id'    => $menu[0],
                'name'           => $menu[1],
                'slug'           => Str::slug($menu[1]),
                'description'    => $menu[2],
                'price'          => $menu[3],
                'image_ratio'    => '4:3',
                'is_available'   => true,
                'is_recommended' => $menu[4],
                'sort_order'     => 0,
                'created_at'     => now(),
                'updated_at'     => now(),
            ]);
        }
    }
}
