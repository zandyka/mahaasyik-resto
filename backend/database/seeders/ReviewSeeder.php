<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // [name, rating, comment]
        $reviews = [
            [
                'Reza Firmansyah',
                5,
                'Makanan Sundanya autentik banget! Ayam goreng kampungnya renyah di luar, empuk di dalam, dan bumbunya meresap sempurna. Sambal terasinya juara, pedas gurih. Suasana restorannya juga nyaman dan bersih. Pasti balik lagi!',
            ],
            [
                'Siti Nurhaliza',
                5,
                'Nasi timbel di sini beda dari yang lain, aromanya harum daun pisang dan nasinya pulen banget. Sayur asemnya segar, kuahnya bening dan gurih alami. Porsi besar, harga terjangkau. Recommended banget buat makan siang!',
            ],
            [
                'Dimas Prasetyo',
                4,
                'Sate Marangginyaaaa enak banget, bumbu meresap dan dagingnya empuk. Agak sedikit nunggu karena ramai, tapi worth it! Pelayanannya ramah dan tempatnya bersih. Minuman es teh manisnya juga segar.',
            ],
            [
                'Anita Wijayanti',
                5,
                'Karedok dan lotek di sini benar-benar autentik khas Sunda. Bumbu kacangnya pas, tidak terlalu manis dan tidak terlalu pedas. Lalapannya segar-segar. Cocok banget buat yang suka makanan sehat tapi tetap lezat.',
            ],
            [
                'Budi Santoso',
                4,
                'Gurame gorengnya garing dan besar, dagingnya tidak amis sama sekali. Porsinya cocok untuk 2-3 orang. Tempatnya nyaman ada AC, parkir luas. Hanya saja agak susah dapat meja saat weekend, sebaiknya reservasi dulu.',
            ],
            [
                'Dewi Rahayu',
                5,
                'Bebek goreng crispynya LUAR BIASA! Kulitnya super garing tapi dagingnya tetap juicy dan empuk. Sambal oncomnya juga unik dan enak, pertama kali coba langsung suka. Ini restoran Sunda terbaik yang pernah saya coba!',
            ],
            [
                'Fajar Nugroho',
                4,
                'Datang kesini bersama keluarga, anak-anak juga senang karena tempatnya family friendly. Klepon dessertnya enak banget, gula merahnya lumer di mulut. Cendolnya juga segar. Pelayanan cepat dan ramah. Akan balik lagi!',
            ],
            [
                'Hesti Kumalasari',
                5,
                'Pepes ikan di sini bikin kangen rumah, rasanya persis masakan nenek. Bumbunya meresap, ikannya lembut, aroma kemangi dan daun pisangnya harum sekali. Sayur asemnya juga segar dan bening. Sungguh makanan yang menyentuh hati!',
            ],
            [
                'Irwan Setiawan',
                4,
                'Harga sangat terjangkau untuk kualitas makanan yang disajikan. Nasi timbel komplit dengan ayam bakar, lalapan, dan sambal sudah sangat mengenyangkan. Tempatnya bersih dan nyaman. Recommended untuk makan siang bersama rekan kerja.',
            ],
            [
                'Lestari Handayani',
                5,
                'Es cincau hijau dan jus alpukat di sini juara! Cincaunya lembut dan santannya gurih, manisnya pas. Jus alpukatnya kental dan creamy. Makanan Sundanya juga tidak perlu diragukan lagi. Suasana outdoor-nya bikin makin nikmat makan.',
            ],
            [
                'Muhammad Rizki',
                4,
                'Tumis kangkungnya mantap, bumbunya meresap dan sayurnya tidak terlalu layu. Combro dan misronya juga enak sebagai camilan menunggu makanan utama. Tempatnya cukup strategis dan mudah ditemukan. Overall pengalaman makan yang sangat menyenangkan.',
            ],
            [
                'Nanda Permata',
                5,
                'Restoran Sunda yang sungguh autentik! Dari segi rasa, suasana, hingga pelayanan semuanya memuaskan. Kolak pisangnya manis legit dan hangatnya pas. Dawet ayunya juga segar sekali. Pokoknya kalau kangen masakan Sunda, tempat ini jawabannya!',
            ],
        ];

        foreach ($reviews as $review) {
            DB::table('reviews')->insert([
                'name'        => $review[0],
                'rating'      => $review[1],
                'comment'     => $review[2],
                'is_approved' => true,
                'created_at'  => now()->subDays(rand(1, 60)),
                'updated_at'  => now(),
            ]);
        }
    }
}
