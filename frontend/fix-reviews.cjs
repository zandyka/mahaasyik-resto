const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'constants', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

const newReviews = export const REVIEWS = [
  { name: "Asep Kurniawan",  date: "12 Jan 2025", stars: 5, quote: "Ayam pecaknya benar-benar mantap! Sambalnya pedas nendang, daging ayamnya empuk banget. Wajib balik lagi!" },
  { name: "Dewi Rahayu",     date: "8 Jan 2025",  stars: 5, quote: "Suasana restoran nyaman, cocok untuk makan siang keluarga. Bumbu pecaknya meresap sampai ke tulang." },
  { name: "Budi Santoso",    date: "2 Jan 2025",  stars: 5, quote: "Ayam bakar kecapnya juara! Bumbunya legit, sambalnya nampol. Porsi nasinya juga memuaskan." },
  { name: "Siti Aminah",     date: "28 Des 2024", stars: 5, quote: "Bumbu pecak di sini beda dari yang lain. Asam, pedas, segarnya pas banget di lidah!" },
  { name: "Rizky Pratama",   date: "20 Des 2024", stars: 4, quote: "Harga terjangkau, porsi kenyang. Pelayanan sangat cepat walaupun restoran sedang ramai." },
  { name: "Nurul Hidayah",   date: "15 Des 2024", stars: 5, quote: "Jus alpukatnya kental dan manisnya pas. Sangat cocok jadi penawar pedas setelah makan ayam pecak." },
  { name: "Hendra Wijaya",   date: "10 Des 2024", stars: 5, quote: "Selain ayam, ikan bakarnya juga recommended! Bumbu lada hitamnya kerasa banget." },
  { name: "Rina Suhartini",  date: "5 Des 2024",  stars: 5, quote: "Tempat bersih, masakan lezat, harga bersahabat. Rekomendasi banget buat warga Medan dan sekitarnya." },
  { name: "Fajar Maulana",   date: "1 Des 2024",  stars: 4, quote: "Sambal tuk-tuknya autentik banget. Bikin nambah nasi terus-terusan!" },
  { name: "Yanti Kusuma",    date: "25 Nov 2024", stars: 5, quote: "Menu dimsumnya juga enak buat cemilan sambil nunggu pesanan utama datang. Mantap pokoknya!" },
  { name: "Dani Supriyadi",  date: "18 Nov 2024", stars: 5, quote: "Pecinta pedas wajib kesini. Sambal ayam pecaknya juara satu di Tanjung Morawa!" },
  { name: "Mega Wulandari",  date: "12 Nov 2024", stars: 5, quote: "Pelayanan sangat ramah dan tempatnya gampang dicari. Sudah jadi langganan setiap akhir pekan." },
];;

content = content.replace(/export const REVIEWS = \[[\s\S]*?\];/g, newReviews);

fs.writeFileSync(filePath, content);
