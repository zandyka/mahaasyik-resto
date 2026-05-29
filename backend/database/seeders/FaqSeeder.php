<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        // [question, answer, sort_order]
        $faqs = [
            [
                'Jam berapa restoran ini buka?',
                'Kami buka setiap hari dari pukul 10.00 hingga 22.00 WIB, termasuk hari libur nasional dan akhir pekan. Terakhir order diterima pukul 21.30 WIB.',
            ],
            [
                'Apakah perlu reservasi meja sebelumnya?',
                'Reservasi tidak diwajibkan, namun sangat kami anjurkan terutama untuk kunjungan pada akhir pekan, hari libur, atau jika datang dalam rombongan lebih dari 10 orang. Reservasi dapat dilakukan melalui WhatsApp atau tombol pesan di halaman kami.',
            ],
            [
                'Metode pembayaran apa saja yang diterima?',
                'Kami menerima pembayaran tunai (cash), transfer bank (BCA, Mandiri, BRI, BNI), serta dompet digital seperti GoPay, OVO, Dana, ShopeePay, dan QRIS. Kartu debit dan kartu kredit juga diterima.',
            ],
            [
                'Apakah tersedia area parkir?',
                'Ya, kami menyediakan area parkir yang luas dan gratis untuk kendaraan roda dua maupun roda empat. Area parkir dijaga oleh petugas kami selama jam operasional restoran.',
            ],
            [
                'Apakah restoran ini ramah anak (family friendly)?',
                'Tentu saja! Kami sangat welcome untuk keluarga dengan anak-anak. Tersedia kursi khusus bayi (baby chair), area duduk yang nyaman, dan beberapa menu yang cocok untuk anak-anak. Kami juga menyediakan area bermain kecil di pojok restoran.',
            ],
            [
                'Apakah makanan di sini sudah bersertifikat halal?',
                'Ya, seluruh bahan baku dan proses memasak di restoran kami telah memenuhi standar halal. Kami berkomitmen untuk tidak menggunakan bahan-bahan yang tidak halal dalam setiap sajian kami. Sertifikasi halal sedang dalam proses pengajuan resmi ke MUI.',
            ],
            [
                'Apakah tersedia layanan pesan antar (delivery)?',
                'Ya, kami melayani pesan antar melalui GoFood dan GrabFood untuk area dalam radius 10 km dari restoran. Selain itu, Anda juga bisa menghubungi kami langsung via WhatsApp untuk pesanan dalam jumlah besar atau di luar jangkauan aplikasi.',
            ],
            [
                'Bagaimana jika tidak ada reservasi, apakah pasti dapat meja?',
                'Kami tidak bisa menjamin ketersediaan meja tanpa reservasi, terutama saat jam makan siang (11.00–13.00) dan makan malam (17.00–20.00) di akhir pekan. Untuk memastikan kenyamanan kunjungan Anda, kami sarankan untuk melakukan reservasi minimal 1 hari sebelumnya.',
            ],
        ];

        foreach ($faqs as $i => $faq) {
            DB::table('faqs')->insert([
                'question'   => $faq[0],
                'answer'     => $faq[1],
                'sort_order' => $i + 1,
                'is_active'  => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
