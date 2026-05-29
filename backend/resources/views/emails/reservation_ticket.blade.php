<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="text-align: center; border-bottom: 2px solid #E8521A; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #E8521A; margin: 0;">Mahaasyik Restaurant</h1>
    </div>

    <p>Halo <strong>{{ $reservation->name }}</strong>,</p>
    
    <p>Terima kasih telah melakukan reservasi di Mahaasyik Restaurant. Reservasi Anda telah kami terima dengan detail berikut:</p>

    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <table style="width: 100%;">
            <tr>
                <td style="padding: 5px 0;"><strong>Kode Reservasi:</strong></td>
                <td style="padding: 5px 0; color: #E8521A; font-weight: bold;">{{ $reservation->reservation_code }}</td>
            </tr>
            <tr>
                <td style="padding: 5px 0;"><strong>Waktu:</strong></td>
                <td style="padding: 5px 0;">{{ \Carbon\Carbon::parse($reservation->date)->format('d F Y') }} - {{ $reservation->time }}</td>
            </tr>
            <tr>
                <td style="padding: 5px 0;"><strong>Tamu:</strong></td>
                <td style="padding: 5px 0;">{{ $reservation->adults }} Dewasa, {{ $reservation->children }} Anak</td>
            </tr>
            <tr>
                <td style="padding: 5px 0;"><strong>Area:</strong></td>
                <td style="padding: 5px 0;">{{ $reservation->seating_area_label }}</td>
            </tr>
        </table>
    </div>

    <p>Tiket reservasi Anda terlampir pada email ini dalam format PDF. Mohon tunjukkan tiket tersebut kepada staf kami saat Anda tiba di restoran.</p>

    <p>Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk membalas email ini atau menghubungi kami via WhatsApp.</p>

    <p>Salam hangat,<br>
    <strong>Tim Mahaasyik</strong></p>

    <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
        Email ini dibuat secara otomatis. Harap jangan ragu membalas jika butuh bantuan.
    </div>

</body>
</html>
