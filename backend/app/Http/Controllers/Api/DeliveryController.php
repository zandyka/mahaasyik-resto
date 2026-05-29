<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Models\DeliveryItem;
use App\Models\Menu;
use App\Models\Promo;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Midtrans\Config as MidtransConfig;
use Midtrans\Snap;

class DeliveryController extends Controller
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
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'email'           => 'required|email',
            'address'         => 'required|string',
            'notes'           => 'nullable|string',
            'delivery_method' => 'required|in:gojek,grab,delivery_boy',
            'payment_method'  => 'required|in:qris,gopay,dana,shopeepay,google_pay,debit,cod',
            'promo_code'      => 'nullable|string',
            'items'           => 'required|array|min:1',
            'items.*.menu_id'  => 'required|exists:menus,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated) {
            $subtotal = 0;
            $discountAmount = 0;
            $deliveryFee = $validated['delivery_method'] === 'delivery_boy' ? 10000 : 0;
            $itemDetails = [];
            $items = [];

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
                $itemDetails[] = [
                    'id'       => 'menu-' . $menu->id,
                    'price'    => $menu->price,
                    'quantity' => $item['quantity'],
                    'name'     => $menu->name,
                ];
            }

            if (!empty($validated['promo_code'])) {
                $promo = Promo::where('code', $validated['promo_code'])
                    ->where('is_active', true)
                    ->where(function ($q) { $q->whereNull('expired_at')->orWhere('expired_at', '>', now()); })
                    ->where('min_order', '<=', $subtotal)
                    ->first();

                if ($promo) {
                    $discountAmount = $promo->discount_type === 'percentage'
                        ? round($subtotal * $promo->discount_value / 100)
                        : min($promo->discount_value, $subtotal);
                    $promo->increment('used_count');
                }
            }

            $totalPrice = max(0, $subtotal - $discountAmount) + $deliveryFee;

            $delivery = Delivery::create([
                'delivery_code'   => 'DLV-' . strtoupper(Str::random(8)),
                'name'            => $validated['name'],
                'phone'           => $validated['phone'],
                'email'           => $validated['email'],
                'address'         => $validated['address'],
                'notes'           => $validated['notes'] ?? null,
                'delivery_method' => $validated['delivery_method'],
                'payment_method'  => $validated['payment_method'],
                'promo_code'      => $validated['promo_code'] ?? null,
                'subtotal'        => $subtotal,
                'discount_amount' => $discountAmount,
                'delivery_fee'    => $deliveryFee,
                'total_price'     => $totalPrice,
                'status'          => 'pending',
                'payment_status'  => $validated['payment_method'] === 'cod' ? 'paid' : 'unpaid',
            ]);

            foreach ($items as $item) {
                $item['delivery_id'] = $delivery->id;
                DeliveryItem::create($item);
            }

            // COD: no payment gateway needed
            if ($validated['payment_method'] === 'cod') {
                $delivery->update(['status' => 'processing']);
                return response()->json([
                    'success'         => true,
                    'message'         => 'Pesanan berhasil dibuat! Bayar saat diantar.',
                    'data'            => $delivery->load('items'),
                    'requires_payment'=> false,
                ], 201);
            }

            // Create Midtrans token
            $midtransOrderId = 'DLV-PAY-' . $delivery->id . '-' . time();
            $snapToken = null;

            // Map payment method to Midtrans enabled payment
            $enabledPayments = match($validated['payment_method']) {
                'qris'       => ['other_qris'],
                'gopay'      => ['gopay'],
                'dana'       => ['akulaku'], // DANA via wallet
                'shopeepay'  => ['shopeepay'],
                'google_pay' => ['gopay'],
                'debit'      => ['bca_va', 'bni_va', 'bri_va', 'permata_va'],
                default      => null,
            };

            try {
                if ($deliveryFee > 0) {
                    $itemDetails[] = ['id' => 'delivery-fee', 'price' => $deliveryFee, 'quantity' => 1, 'name' => 'Biaya Pengiriman'];
                }
                if ($discountAmount > 0) {
                    $itemDetails[] = ['id' => 'discount', 'price' => -$discountAmount, 'quantity' => 1, 'name' => 'Diskon Promo'];
                }

                $params = [
                    'transaction_details' => ['order_id' => $midtransOrderId, 'gross_amount' => $totalPrice],
                    'customer_details'    => ['first_name' => $validated['name'], 'email' => $validated['email'], 'phone' => $validated['phone']],
                    'item_details'        => $itemDetails,
                ];

                if ($enabledPayments) {
                    $params['enabled_payments'] = $enabledPayments;
                }

                $snapToken = Snap::getSnapToken($params);
                $delivery->update(['midtrans_order_id' => $midtransOrderId, 'midtrans_token' => $snapToken]);

                Payment::create([
                    'payable_type'      => Delivery::class,
                    'payable_id'        => $delivery->id,
                    'midtrans_order_id' => $midtransOrderId,
                    'status'            => 'pending',
                    'gross_amount'      => $totalPrice,
                ]);
            } catch (\Exception $e) {
                // continue
            }

            return response()->json([
                'success'             => true,
                'message'             => 'Pesanan berhasil dibuat! Silakan lakukan pembayaran.',
                'data'                => $delivery->load('items'),
                'snap_token'          => $snapToken,
                'midtrans_client_key' => config('midtrans.client_key'),
                'requires_payment'    => true,
            ], 201);
        });
    }

    public function show($code)
    {
        $delivery = Delivery::with('items.menu')->where('delivery_code', $code)->firstOrFail();
        return response()->json(['success' => true, 'data' => $delivery]);
    }
}
