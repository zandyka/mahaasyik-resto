<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tiket Reservasi - {{ $reservation->reservation_code }}</title>
    <style>
        body { font-family: sans-serif; margin: 0; padding: 20px; color: #333; }
        .ticket { border: 2px dashed #E8521A; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; }
        .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { margin: 0; color: #E8521A; font-size: 24px; }
        .header p { margin: 5px 0 0; font-size: 14px; color: #777; }
        .row { margin-bottom: 10px; }
        .label { font-weight: bold; width: 150px; display: inline-block; }
        .value { display: inline-block; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background: #f9f9f9; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #777; }
        .badge { background: #E8521A; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="header">
            <h1>Mahaasyik Restaurant</h1>
            <p>Tiket Reservasi Resmi</p>
        </div>
        
        <div class="row">
            <span class="label">Kode Reservasi:</span>
            <span class="value" style="font-size:18px;font-weight:bold;color:#1A3A5C;">{{ $reservation->reservation_code }}</span>
        </div>
        <div class="row">
            <span class="label">Nama Pemesan:</span>
            <span class="value">{{ $reservation->name }}</span>
        </div>
        <div class="row">
            <span class="label">Tanggal & Jam:</span>
            <span class="value">{{ \Carbon\Carbon::parse($reservation->date)->format('d F Y') }} pukul {{ $reservation->time }}</span>
        </div>
        <div class="row">
            <span class="label">Area Tempat Duduk:</span>
            <span class="value">{{ $reservation->seating_area_label }}</span>
        </div>
        <div class="row">
            <span class="label">Jumlah Tamu:</span>
            <span class="value">{{ $reservation->adults }} Dewasa, {{ $reservation->children }} Anak</span>
        </div>
        <div class="row">
            <span class="label">Status:</span>
            <span class="value"><span class="badge">{{ ucfirst($reservation->status) }}</span></span>
        </div>

        @if($reservation->has_order && $reservation->items->count() > 0)
        <table class="table">
            <thead>
                <tr>
                    <th>Menu</th>
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reservation->items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>Rp {{ number_format($item->price, 0, ',', '.') }}</td>
                    <td>Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                </tr>
                @endforeach
                <tr>
                    <th colspan="3" style="text-align:right">Total</th>
                    <th>Rp {{ number_format($reservation->total_price, 0, ',', '.') }}</th>
                </tr>
            </tbody>
        </table>
        @endif

        <div class="footer">
            Harap tunjukkan tiket ini kepada staf kami saat Anda tiba.<br>
            Dicetak pada {{ now()->format('d M Y H:i') }}
        </div>
    </div>
</body>
</html>
