<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    public function validate(Request $request)
    {
        $request->validate([
            'code'     => 'required|string',
            'subtotal' => 'required|numeric|min:0',
        ]);

        $promo = Promo::where('code', strtoupper($request->code))
            ->where('is_active', true)
            ->where(function ($q) { $q->whereNull('expired_at')->orWhere('expired_at', '>', now()); })
            ->where(function ($q) { $q->whereNull('max_uses')->orWhereColumn('used_count', '<', 'max_uses'); })
            ->where('min_order', '<=', $request->subtotal)
            ->first();

        if (!$promo) {
            return response()->json(['success' => false, 'message' => 'Kode promo tidak valid atau sudah habis.'], 422);
        }

        $discountAmount = $promo->discount_type === 'percentage'
            ? round($request->subtotal * $promo->discount_value / 100)
            : min($promo->discount_value, $request->subtotal);

        return response()->json([
            'success'         => true,
            'message'         => 'Promo berhasil digunakan!',
            'data'            => $promo,
            'discount_amount' => $discountAmount,
        ]);
    }
}
