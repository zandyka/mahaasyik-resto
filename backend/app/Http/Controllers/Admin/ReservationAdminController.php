<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with('items.menu')->latest();
        if ($request->status) $query->where('status', $request->status);
        if ($request->date)   $query->whereDate('date', $request->date);
        if ($request->search) {
            $q = $request->search;
            $query->where(fn($x) => $x->where('name','like',"%$q%")->orWhere('reservation_code','like',"%$q%")->orWhere('phone','like',"%$q%"));
        }
        $reservations = $query->paginate(15);
        return view('admin.reservations.index', compact('reservations'));
    }

    public function show(Reservation $reservation)
    {
        $reservation->load('items.menu');
        return view('admin.reservations.show', compact('reservation'));
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $request->validate(['status' => 'required|in:pending,confirmed,cancelled']);
        $reservation->update(['status' => $request->status]);
        return back()->with('success', 'Status reservasi diperbarui!');
    }

    public function calendar()
    {
        return view('admin.reservations.calendar');
    }

    public function calendarData()
    {
        $reservations = Reservation::select('id','reservation_code','name','date','time','status','adults','children','seating_area')
            ->whereIn('status',['pending','confirmed','cancelled'])
            ->get()
            ->map(function($r) {
                if ($r->status === 'confirmed') $color = '#2D6A4F';
                elseif ($r->status === 'cancelled') $color = '#dc2626';
                else $color = '#d97706';
                return [
                    'id'    => $r->id,
                    'title' => $r->name,
                    'start' => $r->date->format('Y-m-d').'T'.($r->time ?? '00:00').':00',
                    'color' => $color,
                    'extendedProps' => [
                        'code'    => $r->reservation_code,
                        'status'  => $r->status,
                        'seating' => $r->seating_area,
                        'time'    => $r->time,
                        'guests'  => $r->adults + $r->children,
                    ],
                    'url' => route('admin.reservations.show', $r->id),
                ];
            });
        return response()->json($reservations);
    }
}
