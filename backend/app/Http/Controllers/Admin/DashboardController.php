<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Reservation;
use App\Models\Delivery;
use App\Models\Review;
use App\Models\Promo;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalReservations = Reservation::count();
        $totalDeliveries   = Delivery::count();
        $totalRevenue      = Reservation::where('payment_status','paid')->sum('total_price')
                           + Delivery::where('payment_status','paid')->sum('total_price');
        $activeMenus       = Menu::where('is_available', true)->count();

        // Chart: orders last 7 days
        $days = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $label = now()->subDays($i)->format('d M');
            $days->push([
                'label'        => $label,
                'reservations' => Reservation::whereDate('created_at', $date)->count(),
                'deliveries'   => Delivery::whereDate('created_at', $date)->count(),
            ]);
        }

        // Chart: payment methods from deliveries
        $paymentMethods = Delivery::select('payment_method', DB::raw('count(*) as total'))
            ->groupBy('payment_method')->get();

        // Chart: top 5 menu
        $topMenus = DB::table('delivery_items')
            ->select('name', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('name')
            ->orderByDesc('total_qty')
            ->limit(5)
            ->get();

        // Today's reservations
        $todayReservations = Reservation::whereDate('date', today())
            ->orderBy('time')
            ->get();

        // Recent activity
        $recentDeliveries = Delivery::latest()->limit(5)->get();
        $pendingReservations = Reservation::where('status','pending')->count();
        $pendingDeliveries   = Delivery::where('status','pending')->count();

        return view('admin.dashboard', compact(
            'totalReservations','totalDeliveries','totalRevenue','activeMenus',
            'days','paymentMethods','topMenus','todayReservations',
            'recentDeliveries','pendingReservations','pendingDeliveries'
        ));
    }
}
