<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Delivery;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $email = $request->query('email');
        
        $reservationsQuery = Reservation::with('items.menu')->orderBy('created_at', 'desc');
        $deliveriesQuery = Delivery::with('items.menu')->orderBy('created_at', 'desc');

        if ($email) {
            $reservationsQuery->where('email', $email);
            $deliveriesQuery->where('email', $email);
        } else {
            // For demo without email, limit to 20 recent
            $reservationsQuery->limit(20);
            $deliveriesQuery->limit(20);
        }

        $reservations = $reservationsQuery->get()->map(function ($r) {
            $r->type = 'reservation';
            return $r;
        });

        $deliveries = $deliveriesQuery->get()->map(function ($d) {
            $d->type = 'delivery';
            return $d;
        });

        // Merge and sort
        $history = $reservations->concat($deliveries)->sortByDesc('created_at')->values();

        return response()->json([
            'success' => true,
            'data'    => $history
        ]);
    }
}
