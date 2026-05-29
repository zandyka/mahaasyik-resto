<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\ReservationItem;
use App\Models\Menu;
use App\Models\Promo;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Midtrans\Config as MidtransConfig;
use Midtrans\Snap;

class ReservationController extends Controller
{
    public function __construct()
    {
        MidtransConfig::$serverKey = config('midtrans.server_key');
        MidtransConfig::$isProduction = config('midtrans.is_production');
        MidtransConfig::$isSanitized = config('midtrans.is_sanitized');
        MidtransConfig::$is3ds = config('midtrans.is_3ds');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'phone'        => 'required|string|max:20',
            'email'        => 'required|email',
            'date'         => 'required|date|after_or_equal:today',
            'time'         => 'required',
            'adults'       => 'required|integer|min:1',
            'children'     => 'required|integer|min:0',
            'seating_area' => 'required|in:outdoor_lt1,indoor_lt1,indoor_lt1_nosmoking,lt2_ac',
            'message'      => 'nullable|string',
            'promo_code'   => 'nullable|string',
            'has_order'    => 'boolean',
            'items'        => 'required_if:has_order,true|array',
            'items.*.menu_id'  => 'required_if:has_order,true|exists:menus,id',
            'items.*.quantity' => 'required_if:has_order,true|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $subtotal = 0;
            $discountAmount = 0;
            $items = [];

            if (!empty($validated['has_order']) && !empty($validated['items'])) {
                foreach ($validated['items'] as $item) {
                    $menu = Menu::findOrFail($item['menu_id']);
                    $itemSubtotal = $menu->price * $item['quantity'];
                    $subtotal += $itemSubtotal;
                    $items[] = [
                        'menu_id'  => $menu->id,
                        'name'     => $menu->name,
                        'price'    => $menu->price,
                        'quantity' => $item['quantity'],
                        'subtotal' => $itemSubtotal,
                    ];
                }
            }

            // Apply promo
            if (!empty($validated['promo_code'])) {
                $promo = Promo::where('code', $validated['promo_code'])
                    ->where('is_active', true)
                    ->where(function ($q) { $q->whereNull('expired_at')->orWhere('expired_at', '>', now()); })
                    ->where(function ($q) use ($subtotal) { $q->whereNull('max_uses')->orWhereColumn('used_count', '<', 'max_uses'); })
                    ->where('min_order', '<=', $subtotal)
                    ->first();

                if ($promo) {
                    $discountAmount = $promo->discount_type === 'percentage'
                        ? round($subtotal * $promo->discount_value / 100)
                        : min($promo->discount_value, $subtotal);
                    $promo->increment('used_count');
                }
            }

            $totalPrice = max(0, $subtotal - $discountAmount);
            $dpAmount = !empty($validated['has_order']) ? round($totalPrice * 0.3) : 0;

            $reservation = Reservation::create([
                'reservation_code' => 'RSV-' . strtoupper(Str::random(8)),
                'name'             => $validated['name'],
                'phone'            => $validated['phone'],
                'email'            => $validated['email'],
                'date'             => $validated['date'],
                'time'             => $validated['time'],
                'adults'           => $validated['adults'],
                'children'         => $validated['children'],
                'seating_area'     => $validated['seating_area'],
                'message'          => $validated['message'] ?? null,
                'promo_code'       => $validated['promo_code'] ?? null,
                'subtotal'         => $subtotal,
                'discount_amount'  => $discountAmount,
                'total_price'      => $totalPrice,
                'dp_amount'        => $dpAmount,
                'has_order'        => $validated['has_order'] ?? false,
                'status'           => 'pending',
                'payment_status'   => (!empty($validated['has_order']) && $dpAmount > 0) ? 'unpaid' : 'paid',
            ]);

            if (!empty($items)) {
                foreach ($items as $item) {
                    $item['reservation_id'] = $reservation->id;
                    ReservationItem::create($item);
                }
            }

            // If no order needed, confirm immediately
            if (empty($validated['has_order'])) {
                $reservation->update(['status' => 'confirmed']);
                
                try {
                    $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.ticket', compact('reservation'));
                    $pdfPath = storage_path('app/public/ticket_' . $reservation->reservation_code . '.pdf');
                    $pdf->save($pdfPath);

                    Mail::to($reservation->email)->send(new \App\Mail\ReservationTicketMail($reservation, $pdfPath));
                } catch (\Exception $e) {
                    \Log::error('Mail Error: ' . $e->getMessage());
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Reservasi berhasil dibuat!',
                    'data'    => $reservation->load('items'),
                    'requires_payment' => false,
                ], 201);
            }

            // Create Midtrans payment token
            $midtransOrderId = 'RSV-PAY-' . $reservation->id . '-' . time();
            $snapToken = null;

            try {
                $params = [
                    'transaction_details' => [
                        'order_id'     => $midtransOrderId,
                        'gross_amount' => $dpAmount,
                    ],
                    'customer_details' => [
                        'first_name' => $validated['name'],
                        'email'      => $validated['email'],
                        'phone'      => $validated['phone'],
                    ],
                    'item_details' => [[
                        'id'       => 'dp-reservation',
                        'price'    => $dpAmount,
                        'quantity' => 1,
                        'name'     => 'DP 30% Reservasi ' . $reservation->reservation_code,
                    ]],
                ];
                $snapToken = Snap::getSnapToken($params);

                $reservation->update([
                    'midtrans_order_id' => $midtransOrderId,
                    'midtrans_token'    => $snapToken,
                ]);

                Payment::create([
                    'payable_type'      => Reservation::class,
                    'payable_id'        => $reservation->id,
                    'midtrans_order_id' => $midtransOrderId,
                    'status'            => 'pending',
                    'gross_amount'      => $dpAmount,
                ]);
            } catch (\Exception $e) {
                // token generation failed but reservation created
            }

            try {
                Mail::raw("Halo {$reservation->name},\n\nReservasi Anda dengan kode {$reservation->reservation_code} sedang menunggu pembayaran DP (Rp " . number_format($dpAmount, 0, ',', '.') . ").\n\nTanggal: {$reservation->date}\nJam: {$reservation->time}\nSilakan selesaikan pembayaran untuk mengkonfirmasi.\n\nTerima kasih!", function($msg) use ($reservation) {
                    $msg->to($reservation->email)->subject("Menunggu Pembayaran DP Reservasi - " . $reservation->reservation_code);
                });
            } catch (\Exception $e) {
                // Ignore mail error
            }

            return response()->json([
                'success'          => true,
                'message'          => 'Reservasi berhasil dibuat! Silakan lakukan pembayaran DP.',
                'data'             => $reservation->load('items'),
                'snap_token'       => $snapToken,
                'midtrans_client_key' => config('midtrans.client_key'),
                'requires_payment' => true,
                'dp_amount'        => $dpAmount,
            ], 201);
        });
    }

    public function show($code)
    {
        $reservation = Reservation::with('items.menu')
            ->where('reservation_code', $code)
            ->firstOrFail();

        return response()->json(['success' => true, 'data' => $reservation]);
    }

    public function cancel($code)
    {
        $reservation = Reservation::where('reservation_code', $code)->firstOrFail();

        if (in_array($reservation->status, ['confirmed', 'cancelled'])) {
            return response()->json(['success' => false, 'message' => 'Reservasi tidak dapat dibatalkan.'], 422);
        }

        $reservation->update(['status' => 'cancelled']);
        return response()->json(['success' => true, 'message' => 'Reservasi berhasil dibatalkan.']);
    }

    public function downloadTicket($code)
    {
        $reservation = Reservation::with('items')->where('reservation_code', $code)->firstOrFail();
        
        if ($reservation->status === 'cancelled') {
            return response()->json(['success' => false, 'message' => 'Tiket tidak tersedia untuk reservasi yang dibatalkan.'], 403);
        }

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.ticket', compact('reservation'));
        return $pdf->download('Tiket_Reservasi_' . $reservation->reservation_code . '.pdf');
    }
}
