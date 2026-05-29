<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Midtrans\Config as MidtransConfig;
use Midtrans\Notification;

class MidtransController extends Controller
{
    public function __construct()
    {
        MidtransConfig::$serverKey = config('midtrans.server_key');
        MidtransConfig::$isProduction = config('midtrans.is_production');
    }

    public function notification(Request $request)
    {
        try {
            $notification = new Notification();

            $orderId           = $notification->order_id;
            $transactionStatus = $notification->transaction_status;
            $fraudStatus       = $notification->fraud_status;
            $paymentType       = $notification->payment_type;
            $grossAmount       = $notification->gross_amount;

            $payment = Payment::where('midtrans_order_id', $orderId)->first();

            if (!$payment) {
                return response()->json(['message' => 'Payment not found'], 404);
            }

            $paymentStatus = 'pending';

            if ($transactionStatus === 'capture') {
                $paymentStatus = $fraudStatus === 'accept' ? 'success' : 'failed';
            } elseif ($transactionStatus === 'settlement') {
                $paymentStatus = 'success';
            } elseif (in_array($transactionStatus, ['cancel', 'deny', 'expire'])) {
                $paymentStatus = match($transactionStatus) { 'cancel' => 'cancelled', 'expire' => 'expired', default => 'failed' };
            } elseif ($transactionStatus === 'pending') {
                $paymentStatus = 'pending';
            }

            $payment->update([
                'midtrans_transaction_id' => $notification->transaction_id ?? null,
                'payment_method'          => $paymentType,
                'status'                  => $paymentStatus,
                'paid_at'                 => $paymentStatus === 'success' ? now() : null,
                'midtrans_response'       => $request->all(),
            ]);

            // Update parent record
            if ($paymentStatus === 'success') {
                if ($payment->payable_type === Reservation::class || str_contains($payment->payable_type, 'Reservation')) {
                    $res = Reservation::find($payment->payable_id);
                    if ($res) {
                        $res->update(['payment_status' => 'paid', 'status' => 'confirmed']);
                        try {
                            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.ticket', ['reservation' => $res]);
                            $pdfPath = storage_path('app/public/ticket_' . $res->reservation_code . '.pdf');
                            $pdf->save($pdfPath);
                            \Illuminate\Support\Facades\Mail::to($res->email)->send(new \App\Mail\ReservationTicketMail($res, $pdfPath));
                        } catch (\Exception $e) {
                            \Log::error('Mail Error (Midtrans): ' . $e->getMessage());
                        }
                    }
                } elseif ($payment->payable_type === Delivery::class || str_contains($payment->payable_type, 'Delivery')) {
                    Delivery::find($payment->payable_id)?->update(['payment_status' => 'paid', 'status' => 'processing']);
                }
            }

            return response()->json(['message' => 'OK']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}
